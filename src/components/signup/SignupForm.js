import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Show,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import FadeIn from "../common/FadeIn";
import SideArt from "../common/SideArt";

const SignupForm = () => {
  const navigate = useNavigate();

  const switchToSignInHandler = () => {
    navigate("/signin");
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
        pt={{ base: "6rem", md: "5.2rem" }}
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
              Sign &nbsp;up &nbsp;for &nbsp;MIC
            </Heading>
            <form style={{ width: "100%" }}>
              <FormControl pt="3rem">
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  type="text"
                  variant="filled"
                  placeholder="Your Name"
                  isRequired
                  focusBorderColor="#61f2c9"
                />
                <FormLabel htmlFor="email" pt={5}>
                  Email address
                </FormLabel>
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
                <FormLabel htmlFor="account_type" pt={5}>
                  Account Type
                </FormLabel>
                <RadioGroup
                  name="form-name"
                  colorScheme="whatsapp"
                  defaultValue="insured"
                >
                  <HStack spacing={4}>
                    <Radio value="insured" name="insured" defaultChecked>
                      Insured
                    </Radio>
                    <Radio value="hospital" name="hospital">
                      Hospital
                    </Radio>
                    <Radio value="insurer" name="insurer">
                      Insurer
                    </Radio>
                  </HStack>
                </RadioGroup>
                <FormLabel
                  htmlFor="password"
                  pt={5}
                  title="A token must be entered to sign up on behalf of higher priviliged entities like Hospitals or the Insurance Provider."
                >
                  Type Token
                </FormLabel>
                <Input
                  id="type_token"
                  type="password"
                  variant="filled"
                  placeholder="Leave empty if insured"
                  focusBorderColor="#61f2c9"
                />
              </FormControl>
              <Button
                colorScheme="whatsapp"
                size="md"
                px="2rem"
                mt="3rem"
                type="submit"
              >
                Sign Up
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
              onClick={switchToSignInHandler}
            >
              Switch to Sign In &nbsp;→
            </Button>
          </FadeIn>
        </VStack>
      </Flex>
    </HStack>
  );
};

export default SignupForm;
