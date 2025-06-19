import React, { useState } from "react";
import { FormProps } from "../../types/customTypes";

const Form = ({ fields, onChange }: FormProps) => {
  const [formData, setFormData] = useState({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      className="flex flex-col gap-5 p-4 w-full md:max-w-md bg-white rounded-2xl"
      onSubmit={handleSubmit}
    >
      {fields.map((field, index) => (
        <div key={index} className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-[#121417]">
            {field.label}
          </label>
          <input
            placeholder={field.placeholder}
            name={field.name}
            type={field.type}
            onChange={onChange}
            required={field.required}
            className="border-none bg-[#F2F2F5] px-4 h-[52px] rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
          />
        </div>
      ))}
    </form>
  );
};

export default Form;
