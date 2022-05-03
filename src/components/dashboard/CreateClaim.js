import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import CreateForm from "./CreateForm";

const CreateClaim = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button
        shadow="lg"
        variant="solid"
        position="fixed"
        bottom="30px"
        right="33px"
        size="lg"
        borderRadius="2xl"
        colorScheme="whatsapp"
        onClick={onOpen}
      >
        +
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={false}
        scrollBehavior="inside"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent borderRadius="2xl">
          <ModalHeader fontFamily="Plus Jakarta Sans">
            Submit a Claim
          </ModalHeader>
          <ModalBody>
            <CreateForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateClaim;
