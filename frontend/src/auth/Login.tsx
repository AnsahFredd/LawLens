import React, { useState } from "react";
import Form from "../components/ui/Form";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [isloading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const fields = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter password",
      required: true,
    },
  ];

  const handleInputChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else {
      setPasword(value);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error: any) {
      alert(error);
      console.log("Error logging in", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-12 gap-4">
        <h1 className="text-4xl font-semibold text-[#121417]">Welcom back</h1>
        <Form fields={fields} onChange={handleInputChnage} />
        <Button
          onClick={handleLogin}
          label="Login"
          disabled={!email || !password}
          isLoading={isloading}
          otherStyles="bg-black text-white cursor-pointer hover:bg-[#1f1e1e]"
        />
        <p className="text-sm md:text-lg ml-72 text-blue-400 hover:text-blue-300">
          <Link to="/reset-password">Forgot password?</Link>
        </p>
        <p className="text-[#6B7582] mt-8">
          Dont have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </>
  );
};
72;

export default Login;
