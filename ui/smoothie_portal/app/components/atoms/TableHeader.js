"use client";

import React from "react";

export const TableHeader = ({ children, className = "", ...props }) => {
  return (
    <th
      className={`
        py-3 
        px-4 
        border-b 
        border-gray-200 
        text-center 
        text-lg 
        font-semibold 
        text-white
        bg-red-600
        first:rounded-tl-lg
        last:rounded-tr-lg
        ${className}
      `}
      {...props}
    >
      {children}
    </th>
  );
};
