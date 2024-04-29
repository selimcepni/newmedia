import React from "react";
import AuthLoyout from "../components/auth/AuthLoyout";
import LoginForm from "../components/auth/loginform";

const LoginPage = () => {
  return (
    <AuthLoyout>
      <LoginForm />
    </AuthLoyout>
  );
};

export default LoginPage;
