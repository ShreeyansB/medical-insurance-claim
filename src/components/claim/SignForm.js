import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useTransaction } from "../../contexts/Transaction";

const SignForm = ({ onClose, record }) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { contract } = useTransaction();

  const signRecord = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const status = e.target[0].checked ? "1" : "2";
    const message = e.target[2].value.trim();
    try {
      const tx = await contract.signRecord(
        record.recordId,
        record.patientAddr,
        status,
        message
      );
      console.log(tx);
      setIsLoading(false);
      toast({
        title: "Signed",
        description:
          "This claim has been signed. Please wait for it to be mined.\nTx Id: " +
          tx.hash,
        status: "success",
        duration: 10000,
        isClosable: true,
        position: "top",
      });
      onClose();
    } catch (err) {
      console.log(err.message);
      setIsLoading(false);
      toast({
        title: "Error",
        description: "An error occured while carrying out the Transaction",
        status: "error",
        duration: 10000,
        isClosable: true,
        position: "top",
      });
      onClose();
      return;
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={signRecord} id="signRecord">
      <FormControl>
        <FormLabel>Approve/Deny Claim</FormLabel>
        <RadioGroup>
          <Stack direction="row">
            <Radio colorScheme="whatsapp" value="1" isRequired>
              Approve
            </Radio>
            <Radio colorScheme="red" value="2" isRequired>
              Deny
            </Radio>
          </Stack>
        </RadioGroup>

        <FormLabel mt={4}>Reason</FormLabel>
        <Input
          id="message"
          type="text"
          isRequired
          placeholder="Reason for approval/denial"
        />
      </FormControl>
      <HStack float="right" my={4} spacing={5}>
        <Button colorScheme="whatsapp" type="submit" isLoading={isLoading}>
          Submit
        </Button>

        <Button colorScheme="red" isLoading={isLoading} onClick={onClose}>
          Close
        </Button>
      </HStack>
    </form>
  );
};

export default SignForm;
