"use client";

import React from "react";

export const TableRow = ({
  children,
  className = "",
  isHeader = false,
  ...props
}) => {
  return (
    <tr
      className={`
        ${isHeader ? "bg-red-600" : "hover:bg-gray-50"}
        transition-colors
        duration-200
        ease-in-out
        ${className}
      `}
      {...props}
    >
      {children}
    </tr>
  );
};
