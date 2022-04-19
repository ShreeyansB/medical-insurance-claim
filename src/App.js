import { Box, Flex, Heading, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import Header from "./components/header/Header";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Box h="100vh" w="100%">
        <HStack h="100%">
          <Box bg="green.300" h="100%" w="540px"></Box>
        </HStack>
      </Box>
    </React.Fragment>
  );
}

export default App;
