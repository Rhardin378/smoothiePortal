"use client";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import SidebarNavigation from "../../components/SidebarNavigation";
import UserPanel from "../../components/userPanel";
import TruckOrderTable from "../../components/truckOrder/truckOrderTable";

const TruckOrders = () => {
  const router = useRouter();
  const navigateToPage = () => {
    try {
      console.log("push should work");
      router.push("/manager/truckOrders/new");
    } catch (error) {
      console.error("Failed to navigate:", error);
    }
  };
  return (
    <div className="flex">
      <SidebarNavigation />
      <div className="flex flex-col w-3/4 mx-auto mt-3 ">
        <UserPanel />
        <div className="text-3xl mt-3 py-2 font-mono font-bold">
          Truck Orders
        </div>
        <div className="flex items-center   py-2">
          <button
            onClick={navigateToPage}
            className="flex  items-center border border-transparent hover:border-2 hover:border-black hover:bg-red-600 hover:text-white font-bold py-1 px-2 rounded"
          >
            <span className="text-2xl mr-2">&#x2b;</span>
            New Truck Order
          </button>
        </div>
        <TruckOrderTable />
      </div>
    </div>
  );
};

export default TruckOrders;
