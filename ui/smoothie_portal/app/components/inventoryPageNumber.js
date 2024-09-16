"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getInventory } from "../store/slices/inventorySlice";

const InventoryPageNumber = ({ setPageNumber }) => {
  const productsPerPage = 10;
  const totalPages = Math.ceil(
    useSelector((state) => state.inventory.count) / productsPerPage
  );

  console.log(totalPages);

  const renderButtons = () => {
    let buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          className="mx-1 px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          key={i}
          onClick={() => setPageNumber(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };
  return (
    <div className="mt-4 flex justify-center items-center">
      {renderButtons()}
    </div>
  );
};
export default InventoryPageNumber;
