"use client";

import React from "react";
import { Input } from "../atoms/Input";
import { useColors } from "@/hooks/useColors";

export const SearchInput = ({
  placeholder = "Search...",
  value,
  onChange,
  className = "",
}) => {
  const { gray } = useColors();

  return (
    <div className="relative w-full">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`pl-10 w-full ${className}`}
      />
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>
    </div>
  );
};

export default SearchInput;
