import { Button, HStack, Icon, useColorMode } from "@chakra-ui/react";
import React from "react";
import { CgDarkMode } from "react-icons/cg";
import BrandLogo from "./../../svg/BrandLogo";
const Header = () => {
  const { toggleColorMode } = useColorMode();

  const themeToggleHandler = () => {
    toggleColorMode();
  };

  return (
    <HStack
      w="100%"
      py={4}
      justify="space-between"
      px={{ base: '1.5rem', md: "3rem" }}
      zIndex={2}
      position="absolute"
      top={0}
    >
      <BrandLogo width="80px" />
      <Button variant="ghost" onClick={themeToggleHandler}>
        <Icon as={CgDarkMode} w="1.3rem" h="1.3rem" />
      </Button>
    </HStack>
  );
};

export default Header;
