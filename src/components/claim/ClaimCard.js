import {
  Box,
  Flex,
  HStack,
  Link,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useTransaction } from "../../contexts/Transaction";
import { ethers } from "ethers";

const ClaimCard = ({ record }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [billData, setBillData] = useState();
  const { contract } = useTransaction();

  useEffect(() => {
    getBill();
  }, [record]);

  const getBill = async () => {
    const response = await contract.records(
      record.patientAddr,
      parseInt(record.recordId)
    );
    setBillData({ billId: response.billId, billHash: response.billHash });
    setIsLoading(false);
  };

  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      w="100%"
      justify="space-between"
    >
      <VStack align="start" spacing={5}>
        <HStack align="start">
          <Text fontSize="0.8rem" fontWeight="medium" opacity={0.4} minW="5rem">
            Claimant:{" "}
          </Text>
          <Box>
            <Text fontFamily="Roboto Mono" fontSize="0.85rem">
              {record.patientAddr}
            </Text>
          </Box>
        </HStack>
        <HStack align="start">
          <Text fontSize="0.8rem" fontWeight="medium" opacity={0.4} minW="5rem">
            Hospital:{" "}
          </Text>
          <Box>
            <Text fontFamily="Roboto Mono" fontSize="0.85rem">
              {record.hospitalAddr}
            </Text>
          </Box>
        </HStack>
      </VStack>

      <VStack
        align="start"
        spacing={5}
        mt={{ base: 4, lg: 0 }}
        pe={{ base: 0, lg: "2vw", xl: "5vw" }}
      >
        <HStack align="start">
          <Text
            fontSize="0.8rem"
            fontWeight="medium"
            opacity={0.4}
            minW={{ base: "5rem", lg: "3.5rem" }}
          >
            Price:{" "}
          </Text>
          <Box>
            <Text fontSize="0.85rem" fontWeight="semibold">
              {ethers.utils.formatEther(record.price)}E
            </Text>
          </Box>
        </HStack>
        <HStack align="start" mt={{ base: 0, lg: "1rem" }}>
          <Text
            fontSize="0.8rem"
            fontWeight="medium"
            opacity={0.4}
            minW={{ base: "5rem", lg: "3.5rem" }}
            pt={1}
          >
            Bill:{" "}
          </Text>
          {isLoading && <Spinner size="sm" />}
          {!isLoading && (
            <Box>
              <Link
                fontSize="0.85rem"
                fontWeight="semibold"
                href={
                  process.env.REACT_APP_SUPABASE_URL +
                  "/storage/v1/object/public/files/" +
                  billData.billId
                }
                target="_blank"
              >
                View
              </Link>
              <Text
                fontFamily="Roboto Mono"
                fontSize="0.85rem"
                maxWidth="17rem"
              >
                <b>SHA256:</b> {billData.billHash}
              </Text>
            </Box>
          )}
        </HStack>
      </VStack>
    </Flex>
  );
};

export default ClaimCard;
