"use client";

import React from "react";

export const TableCell = ({
  children,
  className = "",
  isAction = false, // For action buttons
  ...props
}) => {
  return (
    <td
      className={`
        py-4 
        px-4 
        text-sm
        text-gray-900
        border-b 
        border-gray-200 
        ${isAction ? "w-[100px]" : "text-center whitespace-nowrap"}
        ${className}
      `}
      {...props}
    >
      {children}
    </td>
  );
};
