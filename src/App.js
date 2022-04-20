import { HStack } from "@chakra-ui/react";
import React from "react";
import Header from "./components/header/Header";
import LoginForm from "./components/login/LoginForm";
import { Route, Routes } from "react-router-dom";
import Error from "./Error";
import RedirectSignup from "./components/common/RedirectSignup";
import SignupForm from "./components/signup/SignupForm";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<RedirectSignup />} exact />
        <Route path="/signin" element={<LoginForm />} exact />
        <Route path="/signup" element={<SignupForm />} exact />
      </Routes>
    </React.Fragment>
  );
}

export default App;
