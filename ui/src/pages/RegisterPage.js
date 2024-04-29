import React from "react";
import AuthLoyout from "../components/auth/AuthLoyout";
import RegisterForm from "../components/auth/registerform";

const RegisterPage = () => {
  return (
    <AuthLoyout>
      <RegisterForm />
    </AuthLoyout>
  );
};

export default RegisterPage;
