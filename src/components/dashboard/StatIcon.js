import { Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const StatIcon = ({ fontSize, icon, heading, value }) => {
  const iconFilter = useColorModeValue(
    "invert(17%) sepia(80%) saturate(396%) hue-rotate(110deg) brightness(97%) contrast(104%)",
    "invert(92%) sepia(2%) saturate(1958%) hue-rotate(105deg) brightness(101%) contrast(92%)"
  );
  return (
    <Flex direction="column" align="center">
      <span
        className="material-icons-two-tone"
        style={{
          fontSize: fontSize,
          filter: iconFilter,
          opacity: 0.88,
          userSelect: 'none'
        }}
      >
        {icon}
      </span>
      <Heading fontSize="0.9rem" mt={3} opacity={0.7}>
        {heading}
      </Heading>
      <Text mt={3} fontSize='2.1rem' fontFamily='Roboto Mono' fontWeight='bold'>{value}</Text>
    </Flex>
  );
};

export default StatIcon;
