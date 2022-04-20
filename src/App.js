import { HStack } from "@chakra-ui/react";
import React from "react";
import Header from "./components/header/Header";
import LoginForm from "./components/login/LoginForm";
import SideArt from "./components/side_art/SideArt";

function App() {
  return (
    <React.Fragment>
      <Header />
      <HStack spacing={0}>
        <SideArt />
        <LoginForm />
      </HStack>
    </React.Fragment>
  );
}

export default App;
