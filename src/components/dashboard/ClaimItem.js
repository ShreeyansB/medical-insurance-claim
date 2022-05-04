import {
  Box,
  Flex,
  HStack,
  Link,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { ethers } from "ethers";
import { useAuth } from "../../contexts/Auth";

const ClaimItem = ({ record }) => {
  const [invert, setInvert] = useState(false);

  const { role } = useAuth();
  const toast = useToast();

  const getIndicator = (record) => {
    if (record.signHistory.length === 0) return 0;

    if (record.signHistory.length === 1) {
      if (record.signHistory[0].status === "1") return 0;
      else return 2;
    }

    if (record.signHistory.length === 2) {
      if (record.signHistory[0].status === "2") return 2;
      else {
        if (record.signHistory[1].status === "2") return 2;
        else return 1;
      }
    }
  };

  const date = new Date(record.block_timestamp.iso);

  const indicatorColors = {
    0: "yellow.400",
    1: "green.400",
    2: "red.400",
  };

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

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        background: useColorModeValue("#9bf7cf", "#0c2a1d"),
      }}
      whileTap={{
        borderRadius: "1.6rem",
      }}
      style={{
        width: "100%",
        borderRadius: "0.7rem",
        background: "rgba(0,0,0,0)",
        cursor: "pointer",
      }}
      onHoverStart={() => setInvert(true)}
      onHoverEnd={() => setInvert(false)}
    >
      <Link
        href={"/claim/" + record.patientAddr + "/" + record.recordId}
        _hover={{ textDecoration: "none" }}
        _focus={{ userSelect: "none" }}
      >
        <Box p={2} py={1} borderRadius="1rem" w="100%">
          <HStack p={2} justify="start" align="start">
            <HStack
              w="15rem"
              me={{ base: 2, sm: "3vw", md: "8vw", lg: "13vw" }}
            >
              <Box
                bg={indicatorColors[getIndicator(record)]}
                h="34px"
                w="6px"
                borderRadius="20rem"
                me={2}
              />

              {/* Insured Tile */}
              {role === "insured" && (
                <Box>
                  <Text fontWeight="medium" fontSize="0.9rem">
                    Hospital Address
                  </Text>
                  <Text
                    fontFamily="Roboto Mono"
                    fontSize="0.77rem"
                    opacity={0.6}
                    title={record.hospitalAddr}
                    onClick={(e) => {
                      console.log(e);
                      e.preventDefault();
                      e.stopPropagation();
                      e.nativeEvent.stopImmediatePropagation();
                      copyToClipboard(record.hospitalAddr);
                    }}
                    cursor="copy"
                  >
                    {record.hospitalAddr.substr(0, 8) +
                      "..." +
                      record.hospitalAddr.substr(
                        record.hospitalAddr.length - 6,
                        6
                      )}
                  </Text>
                </Box>
              )}

              {/* Hospital Tile */}

              {role === "hospital" && (
                <Box>
                  <Text fontWeight="medium" fontSize="0.9rem">
                    Patient Address
                  </Text>
                  <Text
                    fontFamily="Roboto Mono"
                    fontSize="0.77rem"
                    opacity={0.6}
                    title={record.patientAddr}
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
                      record.patientAddr.substr(
                        record.patientAddr.length - 6,
                        6
                      )}
                  </Text>
                </Box>
              )}
              {/* Insurer Tile */}

              {role === "insurer" && (
                <Box>
                  <Text
                    fontWeight="medium"
                    fontSize="0.9rem"
                    title={record.patientAddr}
                    onClick={(e) => {
                      console.log(e);
                      e.preventDefault();
                      e.stopPropagation();
                      e.nativeEvent.stopImmediatePropagation();
                      copyToClipboard(record.patientAddr);
                    }}
                    cursor="copy"
                  >
                    Claimant:{" "}
                    {record.patientAddr.substr(0, 8) +
                      "..." +
                      record.patientAddr.substr(
                        record.patientAddr.length - 6,
                        6
                      )}
                  </Text>
                  <Text
                    fontFamily="Roboto Mono"
                    fontSize="0.77rem"
                    opacity={0.6}
                    title={record.hospitalAddr}
                    onClick={(e) => {
                      console.log(e);
                      e.preventDefault();
                      e.stopPropagation();
                      e.nativeEvent.stopImmediatePropagation();
                      copyToClipboard(record.hospitalAddr);
                    }}
                    cursor="copy"
                  >
                    {record.hospitalAddr.substr(0, 8) +
                      "..." +
                      record.hospitalAddr.substr(
                        record.hospitalAddr.length - 6,
                        6
                      )}
                  </Text>
                </Box>
              )}
            </HStack>
            <VStack align="start" spacing={0} w="7rem">
              <Text fontWeight="medium" fontSize="0.9rem">
                {date.toLocaleDateString("en-IN")}
              </Text>
              <Text fontFamily="Roboto Mono" fontSize="0.77rem" opacity={0.6}>
                {date.toLocaleTimeString()}
              </Text>
            </VStack>
            <Flex flex={1} justify="end">
              <Box
                bg={useColorModeValue(
                  !invert ? "purple.100" : "purple.400",
                  "purple.900"
                )}
                py={2}
                px={4}
                borderRadius="1rem"
              >
                <Text
                  color={useColorModeValue(
                    !invert ? "purple.500" : "purple.700",
                    "purple.300"
                  )}
                  fontFamily="Roboto Mono"
                  fontWeight="bold"
                  maxW="4rem"
                  noOfLines={1}
                  isTruncated
                  title={ethers.utils.formatEther(record.price)}
                >
                  {ethers.utils.formatEther(record.price)}E
                </Text>
              </Box>
            </Flex>
          </HStack>
        </Box>
      </Link>
    </motion.div>
  );
};

export default ClaimItem;
