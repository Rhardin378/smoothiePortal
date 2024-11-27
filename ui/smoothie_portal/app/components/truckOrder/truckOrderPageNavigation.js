"use client";
import React from "react";
import { useSelector } from "react-redux";

const TruckOrderPageNavigation = ({ setPageNumber, currentPage }) => {
  const truckOrdersPerPage = 10;
  const totalPages = Math.ceil(
    useSelector((state) => state.truckOrders.count) / truckOrdersPerPage
  );

  console.log(totalPages);

  return (
    <div className="mt-4 flex justify-center items-center">
      {/* Previous Button */}
      <button
        className="mx-1 px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => setPageNumber(currentPage - 1)}
        disabled={currentPage === 1} // Disable if on the first page
      >
        Prev
      </button>

      {/* Current Page Button (Circular) */}
      <button
        className="mx-1 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
        disabled // Always disabled to indicate it's the current page
      >
        {currentPage}
      </button>

      {/* Next Button */}
      <button
        className="mx-1 px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => setPageNumber(currentPage + 1)}
        disabled={currentPage === totalPages} // Disable if on the last page
      >
        Next
      </button>
    </div>
  );
};
export default TruckOrderPageNavigation;
