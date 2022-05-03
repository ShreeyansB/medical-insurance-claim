import {
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import FadeIn from "../common/FadeIn";
import { useTransaction } from "./../../contexts/Transaction";
import ClaimCard from "./ClaimCard";
import SignButton from "./SignButton";
import Timeline from "./Timeline";

const ClaimInfo = () => {
  const [record, setRecord] = useState();

  const { records } = useTransaction();
  const { role } = useAuth();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const data = records.find(
      (r) => r.patientAddr === params.addr && r.recordId === params.id
    );
    if (records.length > 0 && !data) {
      navigate("/404", { replace: true });
    }
    setRecord(data);
  }, [records]);

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

  const getBadge = (val) => {
    if (val === 0) return <Badge colorScheme="yellow">PENDING</Badge>;
    else if (val === 1) return <Badge colorScheme="whatsapp">ACCEPTED</Badge>;
    else
      return (
        <Badge colorScheme="red" variant="subtle">
          DENIED
        </Badge>
      );
  };

  return (
    <Flex
      pt={{ base: "5.2rem", md: "5.8rem" }}
      px={{ base: "1.45rem", md: "17vw" }}
      minH="100vh"
      justify={record ? "start" : "center"}
    >
      {!record && (
        <Spinner mt="7rem" thickness="3px" size="lg" color="whatsapp.300" />
      )}
      {record && (
        <FadeIn>
          <VStack w="100%" align="start">
            <HStack align="center" py={4}>
              <Heading fontSize="2xl">Record No. {record.recordId}</Heading>
              <Box pb={1}>{getBadge(getIndicator(record))}</Box>
            </HStack>
            <ClaimCard record={record} />
            <Timeline record={record} />
          </VStack>
          {role !== "insured" && getIndicator(record) === 0 && <SignButton record={record}/>}
        </FadeIn>
      )}
    </Flex>
  );
};

export default ClaimInfo;
