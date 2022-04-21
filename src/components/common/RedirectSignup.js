import React from "react";
import { Navigate } from "react-router-dom";

const RedirectSignup = () => {
  return <Navigate to="/signin" replace={true} />;
};

export default RedirectSignup;
