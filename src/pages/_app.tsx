import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from '@chakra-ui/react'
import { AppWrapper } from '../AppContext';

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <AppWrapper>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AppWrapper>
  );
}
