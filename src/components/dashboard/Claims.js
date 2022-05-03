import {Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import FadeIn from "../common/FadeIn";
import { useTransaction } from "./../../contexts/Transaction";
import ClaimItem from "./ClaimItem";

const Claims = () => {
  const [data, setData] = useState([]);
  const { records } = useTransaction();

  const listItems = data.map((d) => <ClaimItem key={d.objectId} record={d} />);

  useEffect(() => {
    let temp = records.slice();
    temp.sort(
      (a, b) =>
        new Date(b.block_timestamp.iso) - new Date(a.block_timestamp.iso)
    );
    setData(temp);
  }, [records]);

  return (
    <VStack align="center" w="100%" spacing={3}>
      {data.length !== 0 && <FadeIn>{listItems}</FadeIn>}
      {data.length === 0 && (
        <Text opacity={0.3}>Trying to fetch claims...</Text>
      )}
    </VStack>
  );
};

export default Claims;
