import React, { useState } from "react";
import Form from "../components/ui/Form";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "./AuthContext";

const Signup = () => {
  const [isloading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");

  const navigate = useNavigate();
  const { signup } = useAuth();

  const fields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Enter your full name",
      required: true,
    },

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

    // {
    //   label: "Organization",
    //   name: "organization",
    //   type: "text",
    //   placeholder: "Enter your organization",
    //   required: true,
    // },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "name") setName(value);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      await signup(name, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert(error);
      console.log("Error signing up", error);
    }
  };

  return (
    <>
      <div className=" container flex flex-col items-center justify-center mt-12 gap-4">
        <h1 className="text-4xl text-center font-semibold text-[#121417]">
          Sign up for LawLens
        </h1>
        <Form fields={fields} onChange={handleChange} />
        <Button
          onClick={handleSignup}
          label="Sign up"
          isLoading={isloading}
          otherStyles="bg-black text-white cursor-pointer hover:bg-[#1f1e1e]"
        />

        <p className="text-[#6B7582] text-center text-sm md:text-lg mt-4">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </>
  );
};
72;

export default Signup;
