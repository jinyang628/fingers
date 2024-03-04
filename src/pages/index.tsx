import { Flex, Button, Text, Input } from '@chakra-ui/react';
import { useState } from 'react';

export default function Home() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    // API call logic here
    console.log(inputValue);
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
