import { _post } from "@/api/entries/_post";
import { Flex, Button, Text, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from 'next/router';
import { validate } from "@/api/api_keys/validate";

export default function Home() {

  const router = useRouter()
  
  const [apiKeyInputValue, setApiKeyInputValue] = useState('');
  const [urlInputValue, setUrlInputValue] = useState('');

  const handleApiKeyInputChange = (e: any) => {
    setApiKeyInputValue(e.target.value);
  };

  const handleUrlInputChange = (e: any) => {
    setUrlInputValue(e.target.value);
  };

  const handleValidateApiKeys = async () => {
    try {
      const { status } = await validate(apiKeyInputValue);
      console.log(status)
      if ( status == 200 ) {
        console.log("API KEY RECEIVED SUCCESSFULLY");
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
      const { data, status } = await _post(urlInputValue);
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
      <Button colorScheme="blue" onClick={handleValidateApiKeys} mt="2rem">
        Submit API Key
      </Button>
      <Input
        value={urlInputValue}
        onChange={handleUrlInputChange}
        placeholder="Drop URL here..."
        mt="2rem"
        width="50%"
      />
      <Button colorScheme="blue" onClick={handlePostEntries} mt="2rem">
        Submit Url
      </Button>
    </Flex>
  );
}
