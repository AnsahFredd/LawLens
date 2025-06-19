import React from "react";
import { ButtonProps } from "../../types/customTypes";

const Button = ({ label, isLoading, onClick, otherStyles }: ButtonProps) => {
  return (
    <div className="w-full md:max-w-md">
      <button
        onClick={onClick}
        disabled={isLoading}
        className={`w-full h-[44px] rounded-xl font-semibold tracking-wide shadow-md transition-all duration-300 ease-in-out
          ${otherStyles}
        `}
      >
        {isLoading ? "Loading..." : label}
      </button>
    </div>
  );
};

export default Button;
