import React from "react";

export const Input = ({
  type = "text",
  id,
  name,
  value,
  onChange,
  placeholder,
  disabled,
  variant = "default",
  className = "",
  ...rest
}) => {
  const baseClasses =
    "w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300";

  const variantClasses = {
    default: "",
    error: "border-red-500 focus:ring-red-500",
    success: "border-green-500 focus:ring-green-500",
    disabled: "bg-gray-100 cursor-not-allowed",
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    disabled ? variantClasses["disabled"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={classes}
      {...rest}
    />
  );
};
