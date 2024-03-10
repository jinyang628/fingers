import { create_entry } from "@/api/create_entry";
import { Flex, Button, Text, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from 'next/router';
import { submit_api_key } from "@/api/submit_api_key";

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

  const handleSubmitApiKey = async () => {
    try {
      const { status } = await submit_api_key(apiKeyInputValue);
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

  const handleSubmitUrl = async () => {
    try {
      const { data, status } = await create_entry(urlInputValue);
      console.log(data)
      console.log(status)
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
        placeholder="Drop URL here..."
        mt="2rem"
        width="50%"
      />
      <Button colorScheme="blue" onClick={handleSubmitApiKey} mt="2rem">
        Submit API Key
      </Button>
      <Input
        value={urlInputValue}
        onChange={handleUrlInputChange}
        placeholder="Drop URL here..."
        mt="2rem"
        width="50%"
      />
      <Button colorScheme="blue" onClick={handleSubmitUrl} mt="2rem">
        Submit Url
      </Button>
    </Flex>
  );
}
