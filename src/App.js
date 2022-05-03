import React from "react";
import Header from "./components/header/Header";
import LoginForm from "./components/login/LoginForm";
import { Route, Routes } from "react-router-dom";
import Error from "./components/Error";
import RedirectSignup from "./components/common/RedirectSignup";
import SignupForm from "./components/signup/SignupForm";
import { AuthProvider } from "./contexts/Auth";
import { DBProvider } from "./contexts/Database";
import Dashboard from "./components/dashboard/Dashboard";
import { ProtectedComp } from "./components/ProtectedComp";
import { TransactionProvider } from "./contexts/Transaction";
import ClaimInfo from "./components/claim/ClaimInfo";

function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <DBProvider>
          <TransactionProvider>
            <Header />
            <Routes>
              <Route path="*" element={<Error />} />
              <Route path="/" element={<RedirectSignup />} exact />
              <Route path="/signin" element={<LoginForm />} exact />
              <Route path="/signup" element={<SignupForm />} exact />
              <Route
                path="/dashboard"
                element={
                  <ProtectedComp Component={Dashboard} toRoute="/signin" />
                }
                exact
              />
              <Route
                path="/claim/:addr/:id"
                element={
                  <ProtectedComp Component={ClaimInfo} toRoute="signin" />
                }
              />
            </Routes>
          </TransactionProvider>
        </DBProvider>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
