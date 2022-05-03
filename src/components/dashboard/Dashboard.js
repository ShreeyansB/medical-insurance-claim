import {  Flex, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../../contexts/Auth";
import FadeIn from "../common/FadeIn";
import Claims from "./Claims";
import CreateClaim from "./CreateClaim";
import Stats from "./Stats";
import WalletCard from "./WalletCard";

const Dashboard = () => {
  const { role } = useAuth();

  return (
    <FadeIn delay={0.7}>
      <Flex
        pt={{ base: "5.2rem", md: "5.8rem" }}
        px={{ base: "1.45rem", md: "17vw" }}
        minH="100vh"
        mb="3rem"
      >
        <VStack w="100%" align="start">
          <Heading fontSize="2xl" py={4}>
            Dashboard
          </Heading>
          <Flex direction={{ base: "column", md: "row" }} w="100%">
            <WalletCard />
            <Stats />
          </Flex>
          <Heading fontSize="2xl" pt={5} pb={1}>
            Claims
          </Heading>
          <Claims />
          {role === "insured" && <CreateClaim />}
        </VStack>
      </Flex>
    </FadeIn>
  );
};

export default Dashboard;
