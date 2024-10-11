"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import TruckOrderTableItem from "./truckOrderTableItem";
import {
  getAllTruckOrders,
  selectTruckOrdersWithTotalCases,
} from "../../store/slices/truckOrdersSlice";

const TruckOrderTable = () => {
  const truckOrders = useSelector(selectTruckOrdersWithTotalCases);
  console.log(truckOrders);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect is running");
    console.log("user._id:", userId);

    const fetchTruckOrders = async () => {
      try {
        const userOrders = userId;
        console.log("Fetching truck orders for user:", userOrders);
        await dispatch(getAllTruckOrders({ userId }));
      } catch (error) {
        console.log("Error fetching truck orders:", error);
      }
    };

    if (userId) {
      fetchTruckOrders();
    }
  }, [dispatch, userId]);
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
                Last Updated
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
    </div>
  );
};

export default TruckOrderTable;
