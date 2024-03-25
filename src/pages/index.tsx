import { _post } from "@/api/entries/_post";
import { Flex, Button, Text, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from 'next/router';
import { validate } from "@/api/api_keys/validate";
import Tasks from "@/components/ui/tasks";
import { _postInputSchema } from "@/types/api/entries/_post";
import { TaskEnum } from "@/types/components/ui/tasks";
import { useAppContext } from '../AppContext';


export default function Home() {

  const router = useRouter()
  const { setData } = useAppContext();

  const [apiKeyInputValue, setApiKeyInputValue] = useState('');
  const [validatedApiKey, setValidatedApiKey] = useState('');
  const [apiKeyValidationMessage, setApiKeyValidationMessage] = useState({ message: '', color: '' });
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
        setApiKeyValidationMessage({ message: 'API Key validated', color: 'green' });
      } else if (status == 401) {
        setValidatedApiKey('');
        setApiKeyValidationMessage({ message: 'API Key is not valid', color: 'red' });
      } else {
        setApiKeyValidationMessage({ message: 'Unknown error', color: 'red' });
      }
    } catch (error: any) {
      setApiKeyValidationMessage({ message: 'Error occurred', color: 'red' });
    }
  };

  const handlePostEntries = async () => {
    try {
      const parsedInput = _postInputSchema.parse({
        api_key: validatedApiKey,
        url: urlInputValue,
        tasks: checkedItems
      }); 
      const { status, summary, practice } = await _post(parsedInput);
      if ( status == 200 ) {
        setData({ summary: summary, practice: practice });
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
      <Text mt="1rem" color={apiKeyValidationMessage.color}>
        {apiKeyValidationMessage.message}
      </Text>
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
        isDisabled={validatedApiKey.length == 0 || checkedItems.length == 0}
      >
        Submit Url
      </Button>
    </Flex>
  );
}
