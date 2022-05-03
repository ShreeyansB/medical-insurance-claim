import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ethers } from "ethers";
import { nanoid } from "nanoid";
import { supabase } from "../../supabaseClient";
import { useDB } from "../../contexts/Database";
import { useTransaction } from "./../../contexts/Transaction";

const CreateForm = ({ onClose }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { uploadFile, deleteFile } = useDB();
  const { contract } = useTransaction();

  const createRecord = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setError(undefined);
    const hospitalAddr = e.target[0].value;
    const price = e.target[1].value;
    const bill = document.getElementById("bill").files[0];
    let verification;

    if (bill.name.split(".").slice(-1)[0] !== "pdf") {
      setError({
        status: "error",
        message: "Only .pdf files allowed.",
      });
      setIsLoading(false);

      return;
    }
    let uploadedFile;
    try {
      verification = ethers.utils.getAddress(hospitalAddr);
    } catch (e) {
      setError({
        status: "error",
        message: "Invalid Hospital Address.",
      });
      setIsLoading(false);

      return;
    }
    let blob = bill.slice(0, bill.size, "application/pdf");

    const file = new File([blob], nanoid() + ".pdf", {
      type: "application/pdf",
    });

    const hash = await hashfile(file);
    // Upload File
    try {
      const { data, error } = await uploadFile({
        user: supabase.auth.user().id,
        file: file,
      });

      if (error) {
        console.log(error);
        setError({
          status: "error",
          message: error.message,
        });
        setIsLoading(false);
        return;
      }
      uploadedFile = data.Key.split("files/")[1];

      // Transact

      const tx = await contract.newRecord(
        hospitalAddr,
        uploadedFile,
        hash,
        ethers.utils.parseEther(price).toString()
      );

      setIsLoading(false);
      toast({
        title: "Submitted",
        description:
          "You claim has been submitted. Please wait for it to be mined. Tx Id: " +
          tx.hash,
        status: "success",
        duration: 10000,
        isClosable: true,
        position: "top",
      });
      onClose();
      return;
    } catch (e) {
      console.log(e);

      // Delete File
      const deleteResp = await deleteFile(uploadedFile);

      if (deleteResp.error) {
        console.log(error);
        setError({
          status: "error",
          message: error.message,
        });
        setIsLoading(false);
        return;
      }
      setError({
        status: "error",
        message: "Transaction Failed",
      });
      setIsLoading(false);
      return;
    }
  };

  async function hashfile(file) {
    let result = await readbinaryfile(file);
    result = new Uint8Array(result);
    let digest = await window.crypto.subtle.digest("SHA-256", result);
    let hex = Uint8ArrayToHexString(new Uint8Array(digest));

    return hex;
  }

  function readbinaryfile(file) {
    return new Promise((resolve, reject) => {
      var fr = new FileReader();
      fr.onload = () => {
        resolve(fr.result);
      };
      fr.readAsArrayBuffer(file);
    });
  }

  function Uint8ArrayToHexString(ui8array) {
    var hexstring = "",
      h;
    for (var i = 0; i < ui8array.length; i++) {
      h = ui8array[i].toString(16);
      if (h.length === 1) {
        h = "0" + h;
      }
      hexstring += h;
    }
    var p = Math.pow(2, Math.ceil(Math.log2(hexstring.length)));
    hexstring = hexstring.padStart(p, "0");
    return hexstring;
  }
  return (
    <form onSubmit={createRecord} id="createRecord">
      <FormControl>
        <FormLabel>Hospital Address</FormLabel>
        <Input
          id="hospitalAddr"
          type="text"
          isRequired
          placeholder="0xabcdefghijklmnoprstuvwxyz0123456789abcdef"
        />

        <FormLabel mt={4}>Insured Amount (in ETH)</FormLabel>
        <Input
          id="price"
          type="number"
          isRequired
          placeholder="0.01E"
          step="0.001"
          min={0.001}
        />

        <FormLabel mt={4}>Bill (.pdf)</FormLabel>
        <input id="bill" type="file" required={true} />
        {error && (
          <Alert
            mt={4}
            status={error.status}
            borderRadius="2xl"
            fontSize="0.8rem"
          >
            <AlertIcon />
            {error.message}
          </Alert>
        )}
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

export default CreateForm;
