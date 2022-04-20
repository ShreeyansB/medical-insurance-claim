import { motion } from "framer-motion";
import React from "react";

const FadeIn = (props) => {
  return (
    <motion.div
      style={{ width: "100%" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: props.delay }}
    >
      {props.children}
    </motion.div>
  );
};

export default FadeIn;
