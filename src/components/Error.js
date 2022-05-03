import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const Error = () => {
  return (
    <Flex
      height="100vh"
      width="100%"
      p={5}
      pt="35vh"
      align="center"
      direction="column"
    >
      <Heading fontSize="5xl" color="green.300">
        ERROR
      </Heading>
      <Heading fontFamily="Roboto Mono" fontSize="6rem">
        404
      </Heading>
      <Text
        fontWeight="bold"
        letterSpacing="0.21rem"
        fontSize="small"
        color="green.300"
      >
        PAGE&nbsp; NOT&nbsp; FOUND
      </Text>
    </Flex>
  );
};

export default Error;
