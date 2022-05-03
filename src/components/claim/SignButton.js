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
import SignForm from "./SignForm";

const SignButton = ({record}) => {
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
        fontFamily="Roboto Mono"
        fontWeight="black"
      >
        SIGN
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={false}
        scrollBehavior="inside"
        closeOnOverlayClick={false}
      >
        <ModalOverlay/>
        <ModalContent borderRadius="2xl">
          <ModalHeader fontFamily="Plus Jakarta Sans">
            Sign this claim
          </ModalHeader>
          <ModalBody>
            <SignForm onClose={onClose} record={record}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SignButton;
