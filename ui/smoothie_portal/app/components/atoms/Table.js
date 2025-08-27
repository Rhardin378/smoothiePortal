"use client";

import React from "react";

export const Table = ({ children, className = "", ...props }) => {
  return (
    <div className="container mx-auto">
      <div className="overflow-x-auto flex ">
        <table
          className={`
            min-w-full 
            w-2/3 
            bg-white 
            border 
            border-gray-200
            shadow-sm
            rounded-lg
            overflow-hidden
            ${className}
          `}
          {...props}
        >
          {children}
        </table>
      </div>
    </div>
  );
};
