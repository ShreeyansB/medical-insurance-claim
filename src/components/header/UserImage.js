import { motion } from "framer-motion";
import React from "react";
import { Box, forwardRef } from "@chakra-ui/react";
import { useAuth } from "../../contexts/Auth";

const UserImage = forwardRef((props, ref) => {
  const { user } = useAuth();

  return (
    <Box {...props} ref={ref}>
      <motion.img
        initial={{
          filter: "saturate(160%) contrast(70%) brightness(120%)",// to make image more pastel
          cursor: "pointer",
          borderRadius: "0.9rem",
          backgroundColor: "teal",
          boxShadow: "0px 5px 30px 3px rgba(0,0,0,0.25)",
        }}
        whileHover={{
          boxShadow: "0px 11px 30px -2px rgba(0,0,0,0.42)"
        }}
        whileTap={{
          scale: 0.8,
          borderRadius: "10rem",
        }}
        transition={{
          duration: 0.2
        }}
        src={
          "https://source.boringavatars.com/marble/240/" + user.email + "?square"
        }
        height="40px"
        width="40px"
      />
    </Box>
  );
});

export default UserImage;