import React from "react";

export const Label = ({ htmlFor, children, className = "" }) => {
  const baseClasses = "block font-medium text-gray-700 mb-2";

  return (
    <label htmlFor={htmlFor} className={`${baseClasses} ${className}`}>
      {children}
    </label>
  );
};

export default Label;
