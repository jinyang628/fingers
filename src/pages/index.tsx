import { createEntry } from "@/api/createEntry";
import { Flex, Button, Text, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from 'next/router';

export default function Home() {

  const router = useRouter()
  
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const { data, status } = await createEntry(inputValue);
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
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Drop URL here..."
        mt="2rem"
        width="50%"
      />
      <Button colorScheme="blue" onClick={handleSubmit} mt="2rem">
        Submit
      </Button>
    </Flex>
  );
}
