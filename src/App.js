import { Box, Flex, Heading, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import Header from "./components/header/Header";
import SideArt from "./components/side_art/SideArt";

function App() {
  return (
    <React.Fragment>
      <Header />
      <SideArt />
    </React.Fragment>
  );
}

export default App;
