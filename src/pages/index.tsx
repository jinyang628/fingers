import { sendUrl } from '@/api/sendUrl';
import { Flex, Button, Text, Input } from '@chakra-ui/react';
import { useState } from 'react';

export default function Home() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response: string = await sendUrl(inputValue);
      console.log(response);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <Flex 
      direction="column" 
      align="center" 
      justify="center" 
      height="100vh"
    >
      <Text fontSize='6xl'>Still Human</Text>
      <Input 
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Drop URL here..."
        mt="2rem" 
        width="50%"
      />
      <Button 
        colorScheme="blue"
        onClick={handleSubmit}
        mt="2rem" 
      >
        Submit
      </Button>
    </Flex>
  );
}
