import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

export const ProtectedComp = ({ Component, toRoute, invert }) => {
  const { user } = useAuth();

  if (user) {
    if (!invert)
      return user ? <Component /> : <Navigate to={toRoute} replace={true} />;
    else
      return !user ? <Component /> : <Navigate to={toRoute} replace={true} />;
  } else {
    return <div></div>;
  }
};
