import React from "react";

export const Card = ({
  children,
  className = "",
  variant = "default",
  padding = true, //if a card doesn't need padding just set it to false
}) => {
  const baseClasses = "bg-white rounded-lg";

  const variantClasses = {
    default: "border border-gray-200 shadow",
    elevated: "shadow-lg",
    modal: "shadow-md",
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    padding ? "p-4 md:p-6" : "", // Conditional padding
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
};
