import React, { useState } from "react";
import Form from "../components/ui/Form";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [isloading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const fields = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
    },
  ];
  const handleInputChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    }
  };

  const navigate = useNavigate();
  const handlePasswordReset = () => {
    setIsLoading(true);

    try {
      navigate("/");
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-12 gap-4">
        <h1 className="text-4xl font-semibold text-[#121417]">
          Forgot password?
        </h1>
        <p className="text-[#6B7582] text-sm md:text-lg">
          Enter the email address associated with your account to a link to
          reset your password
        </p>
        <Form fields={fields} onChange={handleInputChnage} />
        <Button
          onClick={handlePasswordReset}
          label="Send reset link"
          isLoading={isloading}
          otherStyles="bg-black text-white"
        />

        <p className="text-[#6B7582] text-sm md:text-lg ml-72">
          Remember your password? <Link to="/login">Log in</Link>
        </p>
      </div>
    </>
  );
};
72;

export default ForgotPassword;
