import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import FadeIn from "../common/FadeIn";

const LoginForm = () => {
  return (
    <Flex
      w="100%"
      h="100vh"
      pt={{ base: "8rem", md: "12rem" }}
      align="center"
      direction="column"
    >
      <VStack w="100%" maxW="450px" align="start" px={5}>
        <FadeIn delay={0.2}>
          <Heading
            fontSize="1.7rem"
            letterSpacing="-0.05rem"
            fontWeight="extrabold"
            color={useColorModeValue("whatsapp.500", "whatsapp.200")}
          >
            Sign &nbsp;in &nbsp;to &nbsp;MIC
          </Heading>

          <form style={{ width: "100%" }}>
            <FormControl pt="3rem">
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                id="email"
                type="email"
                variant="filled"
                placeholder="name@company.com"
                isRequired
                focusBorderColor="#68ba96"
              />
              <FormLabel htmlFor="password" pt={5}>
                Password
              </FormLabel>
              <Input
                id="password"
                type="password"
                variant="filled"
                placeholder="6+ Characters"
                isRequired
                focusBorderColor="#68ba96"
              />
            </FormControl>
            <Button variant="ghost" size="xs" mt={5} float="right">
              Forgot Password?
            </Button>
            <Button
              colorScheme="whatsapp"
              size="md"
              px="2rem"
              mt="3rem"
              type="submit"
            >
              Sign In
            </Button>
          </form>
        </FadeIn>
      </VStack>
    </Flex>
  );
};

export default LoginForm;
