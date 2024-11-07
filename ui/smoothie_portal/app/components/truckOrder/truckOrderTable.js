"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import TruckOrderTableItem from "./truckOrderTableItem";
import TruckOrderPageNavigation from "./truckOrderPageNavigation";
import {
  getAllTruckOrders,
  selectTruckOrdersWithTotalCases,
} from "../../store/slices/truckOrdersSlice";

const TruckOrderTable = () => {
  const userId = useSelector((state) => state.auth.userId);
  const truckOrders = useSelector(selectTruckOrdersWithTotalCases);
  console.log(truckOrders);
  const [pageNumber, setPageNumber] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect is running");
    console.log("user._id:", userId);

    const fetchTruckOrders = async () => {
      try {
        const userOrders = userId;
        console.log("Fetching truck orders for user:", userOrders);
        await dispatch(getAllTruckOrders({ userId, pageNumber }));
      } catch (error) {
        console.log("Error fetching truck orders:", error);
      }
    };

    if (userId) {
      fetchTruckOrders();
    }
  }, [dispatch, userId, pageNumber]);
  return (
    <div className="container mx-auto">
      <div className="overflow-x-auto flex mt-4">
        <table className="min-w-full w-2/3 bg-white border border-gray-200">
          <thead>
            {/* make a UUID function for order # from the id */}
            <tr className="bg-red-600">
              <th className="py-3 px-4 border-b border-gray-200 text-center text-lg font-semibold text-white">
                Order #
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-center text-lg font-semibold text-white">
                Created By
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-center text-lg font-semibold text-white">
                Total Cases
              </th>

              <th className="py-3 px-4 border-b border-gray-200 text-center text-lg font-semibold text-white">
                Date Placed
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-center text-lg font-semibold text-white"></th>
              <th className="py-3 px-4 border-b border-gray-200 text-center text-lg font-semibold text-white"></th>
            </tr>
          </thead>
          <tbody>
            {truckOrders.map((truckOrder) => {
              return (
                <TruckOrderTableItem
                  id={truckOrder._id}
                  user={truckOrder.user.name}
                  date={truckOrder.date}
                  cases={truckOrder.totalCases}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <TruckOrderPageNavigation
        setPageNumber={setPageNumber}
        currentPage={pageNumber}
      />
    </div>
  );
};

export default TruckOrderTable;
