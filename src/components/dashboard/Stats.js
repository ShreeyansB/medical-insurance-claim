import {  HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/Auth";
import { useTransaction } from "../../contexts/Transaction";
import "./material-icons.css";
import StatIcon from "./StatIcon";

const Stats = () => {
  const { records } = useTransaction();
  const [counters, setCounters] = useState([0, 0, 0]);

  const { role } = useAuth();

  const parseRecords = () => {
    if (role === "insured") parseInsured();
    else if (role === "hospital") parseHospital();
    else if (role === "insurer") parseInsurer();
  };

  const parseInsurer = () => {
    if (records.length === 0) return;
    let pending = 0;
    let accepted = 0;
    let denied = 0;
    records.forEach((r) => {
      if (r.signHistory.length === 0) pending++;

      if (r.signHistory.length === 1) {
        if (r.signHistory[0].status === "1") pending++;
        else denied++;
      }

      if (r.signHistory.length === 2) {
        if (r.signHistory[0].status === "2") denied++;
        else {
          if (r.signHistory[1].status === "2") denied++;
          else accepted++;
        }
      }
    });
    setCounters([pending, accepted, denied]);
  };

  const parseHospital = () => {
    if (records.length === 0) return;
    let pending = 0;
    let accepted = 0;
    let denied = 0;
    records.forEach((r) => {
      if (r.signHistory.length === 0) pending++;

      if (r.signHistory.length === 1) {
        if (r.signHistory[0].status === "1") pending++;
        else denied++;
      }

      if (r.signHistory.length === 2) {
        if (r.signHistory[0].status === "2") denied++;
        else {
          if (r.signHistory[1].status === "2") denied++;
          else accepted++;
        }
      }
    });
    setCounters([pending, accepted, denied]);
  };

  const parseInsured = () => {
    if (records.length === 0) return;
    let pending = 0;
    let accepted = 0;
    let denied = 0;
    records.forEach((r) => {
      if (r.signHistory.length === 0) pending++;

      if (r.signHistory.length === 1) {
        if (r.signHistory[0].status === "1") pending++;
        else denied++;
      }

      if (r.signHistory.length === 2) {
        if (r.signHistory[0].status === "2") denied++;
        else {
          if (r.signHistory[1].status === "2") denied++;
          else accepted++;
        }
      }
    });
    setCounters([pending, accepted, denied]);
  };

  useEffect(() => {
    parseRecords();
  }, [records]);

  return (
    <HStack
      align="center"
      justify={{ base: "space-between", md: "space-around" }}
      w="100%"
      ms={{ md: "5vw", lg: "8vw" }}
      maxW={{ base: "30rem", md: "100%" }}
      mt={{ base: 8, md: 0 }}
    >
      <StatIcon
        icon="schedule"
        fontSize="2.8rem"
        heading="Pending"
        value={counters[0]}
      />
      <StatIcon
        icon="verified"
        fontSize="2.8rem"
        heading="Accepted"
        value={counters[1]}
      />
      <StatIcon
        icon="dangerous"
        fontSize="2.8rem"
        heading="Denied"
        value={counters[2]}
      />
    </HStack>
  );
};

export default Stats;
