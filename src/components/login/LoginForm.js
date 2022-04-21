import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Show,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import FadeIn from "../common/FadeIn";
import SideArt from "../common/SideArt";

const LoginForm = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { signIn } = useAuth();

  const [formIsLoading, setFormIsLoading] = useState(false);

  const switchToSignUpHandler = () => {
    navigate("/signup", { replace: true });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setFormIsLoading(true);
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    const { error } = await signIn({
      email: formData.email,
      password: formData.password,
    });

    await new Promise((resolve) => setTimeout(resolve, 800));

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 6000,
        isClosable: true,
        position: "top",
      });
      setFormIsLoading(false);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <HStack spacing={0}>
      <SideArt />
      <Show breakpoint="(min-width: 950px)">
        <Box w="680px" h="100vh" />
      </Show>
      <Flex
        w="100%"
        h="100vh"
        pt={{ base: "8rem", md: "12rem" }}
        align="center"
        direction="column"
      >
        <VStack w="100%" maxW="450px" align="start" px={5}>
          <FadeIn delay={0.3}>
            <Heading
              fontSize="1.7rem"
              letterSpacing="-0.05rem"
              fontWeight="extrabold"
              color={useColorModeValue("whatsapp.500", "whatsapp.200")}
            >
              Sign &nbsp;in &nbsp;to &nbsp;MIC
            </Heading>

            <form style={{ width: "100%" }} onSubmit={loginHandler}>
              <FormControl pt="3rem" isDisabled={formIsLoading}>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  id="email"
                  type="email"
                  variant="filled"
                  placeholder="name@company.com"
                  isRequired
                  focusBorderColor="#61f2c9"
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
                  focusBorderColor="#61f2c9"
                />
              </FormControl>
              <Button variant="ghost" size="xs" mt={5} float="right">
                Forgot Password
              </Button>
              <Button
                colorScheme="whatsapp"
                size="md"
                px="2rem"
                mt="3rem"
                type="submit"
                isLoading={formIsLoading}
              >
                Sign In
              </Button>
            </form>
            <Button
              fontSize="small"
              fontWeight="bold"
              color="green.200"
              float="right"
              mt={3}
              href="/signup"
              variant="link"
              onClick={switchToSignUpHandler}
            >
              Switch to Sign Up &nbsp;→
            </Button>
          </FadeIn>
        </VStack>
      </Flex>
    </HStack>
  );
};

export default LoginForm;
