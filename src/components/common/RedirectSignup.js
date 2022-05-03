import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";

const RedirectSignup = () => {
  const { user } = useAuth();
  return user ? (
    <Navigate to="/dashboard" replace={true} />
  ) : (
    <Navigate to="/signin" replace={true} />
  );
};

export default RedirectSignup;
