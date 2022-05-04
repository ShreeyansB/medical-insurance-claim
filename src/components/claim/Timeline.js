import {
  Avatar,
  Heading,
  HStack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Timeline = ({ record }) => {
  const [signs, setSigns] = useState([]);
  const toast = useToast();

  const copyToClipboard = (data) => {
    let temp = document.createElement("textarea");
    temp.value = data;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
    toast({
      title: "Copied to Clipboard",
      status: "info",
    });
  };

  useEffect(() => {
    if (record) {
      let signs = Object.assign({}, record.signHistory);
      setSigns(signs);
    }
  }, [record]);

  return (
    <VStack pt={5} align="start">
      <Heading fontSize="1.1rem">Timeline</Heading>
      <VStack align="start">
        <HStack pt={3} spacing={3}>
          <Avatar
            size="xs"
            name="C"
            bg="yellow.400"
            color="yellow.900"
            fontWeight="black"
          />
          <Text
            fontFamily="Roboto Mono"
            fontSize="0.9rem"
            onClick={(e) => {
              console.log(e);
              e.preventDefault();
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              copyToClipboard(record.patientAddr);
            }}
            cursor="copy"
          >
            {record.patientAddr.substr(0, 8) +
              "..." +
              record.patientAddr.substr(record.patientAddr.length - 6, 6)}
          </Text>
          <Text fontSize="0.77rem" opacity={0.4}>
            •&nbsp;&nbsp;
            {new Date(record.block_timestamp.iso).toLocaleString("en-IN")}
          </Text>
        </HStack>

        <Text fontSize="0.86rem" pt={1} fontStyle="italic" opacity={0.5}>
          Claim raised by User.
        </Text>
      </VStack>

      {signs[0] && (
        <VStack align="start">
          <HStack pt={3} spacing={3}>
            <Avatar
              size="xs"
              name={signs[0].signer === signs[0].hospitalAddr ? "H" : "I"}
              bg={signs[0].status === "1" ? "whatsapp.400" : "red.400"}
              color={signs[0].status === "1" ? "whatsapp.900" : "red.900"}
              fontWeight="black"
            />
            <Text
              fontFamily="Roboto Mono"
              fontSize="0.9rem"
              onClick={(e) => {
                console.log(e);
                e.preventDefault();
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                copyToClipboard(signs[0].signer);
              }}
              cursor="copy"
            >
              {signs[0].signer.substr(0, 8) +
                "..." +
                signs[0].signer.substr(signs[0].signer.length - 6, 6)}
            </Text>
            <Text fontSize="0.77rem" opacity={0.4}>
              •&nbsp;&nbsp;
              {new Date(signs[0].block_timestamp.iso).toLocaleString("en-IN")}
            </Text>
          </HStack>

          <Text fontSize="0.86rem" pt={1} fontStyle="italic" opacity={0.5}>
            {signs[0].statusMsg}
          </Text>
        </VStack>
      )}

      {signs[1] && (
        <VStack align="start">
          <HStack pt={3} spacing={3}>
            <Avatar
              size="xs"
              name={signs[1].signer === signs[1].hospitalAddr ? "H" : "I"}
              bg={signs[1].status === "1" ? "whatsapp.400" : "red.400"}
              color={signs[1].status === "1" ? "whatsapp.900" : "red.900"}
              fontWeight="black"
            />
            <Text
              fontFamily="Roboto Mono"
              fontSize="0.9rem"
              onClick={(e) => {
                console.log(e);
                e.preventDefault();
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                copyToClipboard(signs[1].signer);
              }}
            >
              {signs[1].signer.substr(0, 8) +
                "..." +
                signs[1].signer.substr(signs[1].signer.length - 6, 6)}
            </Text>
            <Text fontSize="0.77rem" opacity={0.4}>
              •&nbsp;&nbsp;
              {new Date(signs[1].block_timestamp.iso).toLocaleString("en-IN")}
            </Text>
          </HStack>

          <Text fontSize="0.86rem" pt={1} fontStyle="italic" opacity={0.5}>
            {signs[1].statusMsg}
          </Text>
        </VStack>
      )}
    </VStack>
  );
};

export default Timeline;
