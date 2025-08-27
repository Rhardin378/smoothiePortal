"use client";

import React from "react";
import { Button } from "../atoms/Button";
import { useColors } from "@/hooks/useColors";

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  const { gray, indigo } = useColors();

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <Button
        variant="secondary"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="min-w-[80px]"
      >
        Previous
      </Button>

      <div className="flex items-center gap-2">
        {/* Current page indicator */}
        <div
          className={`
            w-10 h-10 
            flex items-center justify-center 
            rounded-full 
            bg-indigo-100 
            text-indigo-700 
            font-medium 
            border-2 
            border-indigo-200
          `}
        >
          {currentPage}
        </div>

        <span className="text-gray-600">of {totalPages}</span>
      </div>

      <Button
        variant="secondary"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="min-w-[80px]"
      >
        Next
      </Button>
    </div>
  );
};
