import React from "react";
import Header from "./components/header/Header";
import LoginForm from "./components/login/LoginForm";
import { Route, Routes } from "react-router-dom";
import Error from "./components/Error";
import RedirectSignup from "./components/common/RedirectSignup";
import SignupForm from "./components/signup/SignupForm";
import { AuthProvider } from "./contexts/Auth";
import { DBProvider } from "./contexts/Database";

function App() {
  return (
    <React.Fragment>
      <DBProvider>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="*" element={<Error />} />
            <Route path="/" element={<RedirectSignup />} exact />
            <Route path="/signin" element={<LoginForm />} exact />
            <Route path="/signup" element={<SignupForm />} exact />
          </Routes>
        </AuthProvider>
      </DBProvider>
    </React.Fragment>
  );
}

export default App;
