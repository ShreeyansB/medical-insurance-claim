import {
  Icon,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useAuth } from "../../contexts/Auth";
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useDB } from "../../contexts/Database";
import UserImage from "./UserImage";
import { useTransaction } from "../../contexts/Transaction";

const UserButton = () => {
  const { user, signOut } = useAuth();
  const { reset } = useDB();

  const { reload } = useTransaction();

  const navigate = useNavigate();

  const signOutHandler = () => {
    signOut();
    reset();
    navigate("/");
  };

  const isLightMode = useColorModeValue(true, false);

  useEffect(() => {
    const interval = setInterval(() => {
      reload();
    }, 7000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (user)
    return (
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        exit={{ opacity: 0 }}
      >
        <Menu>
          <MenuButton as={UserImage}>Hello</MenuButton>
          <MenuList
            color={isLightMode ? "black" : "white"}
            border="none"
            borderRadius="2xl"
            py="4"
            shadow="none"
            bg={isLightMode ? "gray.100" : "gray.900"}
          >
            <MenuGroup title={user.email}>
              <MenuItem
                icon={<Icon as={HiOutlineLogout} w="5" h="5" mt={2} ms={2} />}
                onClick={signOutHandler}
                _focus={{ bg: "blackAplha.50" }}
                _hover={{ bg: "blackAplha.100" }}
              >
                Sign Out
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </motion.div>
    );
  else return <div />;
};

export default UserButton;
