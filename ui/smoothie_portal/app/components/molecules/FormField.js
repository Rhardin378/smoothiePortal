"use client";
import React from "react";
import Label from "@/components/atoms/label";
import { Input } from "@/components/atoms/Input";
export const FormField = ({
  label,
  name,
  error,
  validationRules = {},
  register,
  inputProps,
}) => {
  return (
    <div className="form-field">
      <Label
        htmlFor={name}
        className="block text-red-900 font-medium mb-2 text-sm"
      >
        {" "}
        {label}
      </Label>
      <div className="relative">
        <Input
          id={name}
          name={name}
          {...register(name, validationRules)}
          className={`
            w-full
            px-4 
            py-3 
            rounded-lg 
            bg-white/80 
            backdrop-blur-sm 
            border 
            transition-all 
            duration-200
            ${
              error
                ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-500/20"
                : "border-yellow-500/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
            }
          `}
          {...inputProps}
        />
      </div>
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  );
};
