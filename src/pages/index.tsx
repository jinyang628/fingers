import { _post } from "@/api/entries/_post";
import { Flex, Button, Text, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from 'next/router';
import { validate } from "@/api/api_keys/validate";
import Tasks, { TaskEnum } from "@/components/ui/tasks";
import { _postInputSchema } from "@/types/api/entries/_post";

export default function Home() {

  const router = useRouter()
  
  const [apiKeyInputValue, setApiKeyInputValue] = useState('');
  const [validatedApiKey, setValidatedApiKey] = useState('');
  const [urlInputValue, setUrlInputValue] = useState('');
  const [checkedItems, setCheckedItems] = useState<TaskEnum[]>([]);

  const handleApiKeyInputChange = (e: any) => {
    setApiKeyInputValue(e.target.value);
  };

  const handleUrlInputChange = (e: any) => {
    setUrlInputValue(e.target.value);
  };

  const handleValidateApiKeys = async () => {
    try {
      const { status } = await validate(apiKeyInputValue);
      if ( status == 200 ) {
        setValidatedApiKey(apiKeyInputValue);
      } else if (status == 500) {
        console.error("Error pushing to database");
      } else {
        console.error("Unknown error", status);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handlePostEntries = async () => {
    try {
      const parsedInput = _postInputSchema.parse({
        apiKey: validatedApiKey,
        url: urlInputValue,
        tasks: checkedItems
      }); 
      const { message, status } = await _post(parsedInput);
      if ( status == 200 ) {
        router.push('/output');
      } else if (status == 500) {
        console.error("Error pushing to database");
      } else {
        console.error("Unknown error", status);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" height="100vh">
      <Text fontSize="6xl">Still Human</Text>
      
      <Input
        value={apiKeyInputValue}
        onChange={handleApiKeyInputChange}
        placeholder="Drop API Key here..."
        mt="2rem"
        width="50%"
      />
      <Button 
        colorScheme="blue" 
        onClick={handleValidateApiKeys} 
        mt="2rem"
      >
        Submit API Key
      </Button>
      <Tasks checkedItems={checkedItems} setCheckedItems={setCheckedItems}/>
      <Input
        value={urlInputValue}
        onChange={handleUrlInputChange}
        placeholder="Drop URL here..."
        mt="2rem"
        width="50%"
      />
      <Button 
        colorScheme="blue" 
        onClick={handlePostEntries} 
        mt="2rem"
        isDisabled={validatedApiKey.length == 0}
      >
        Submit Url
      </Button>
    </Flex>
  );
}
