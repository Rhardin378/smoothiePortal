"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import SidebarNavigation from "../../components/SidebarNavigation";
import UserPanel from "../../components/userPanel";
import TruckOrderTable from "../../components/truckOrder/truckOrderTable";
import { createTruckOrder } from "../../store/slices/truckOrdersSlice";

const TruckOrders = () => {
  const storeId = useSelector((state) => state.auth.store._id);
  const truckOrderId = useSelector((state) => state.truckOrders.truckOrderId);
  const isLoading = useSelector((state) => state.truckOrders.status);
  const router = useRouter();

  const dispatch = useDispatch();

  const createNewTruckOrder = async () => {
    try {
      const response = await dispatch(createTruckOrder({ storeId: storeId }));
      const directTruckOrderId = response.payload.truckOrder._id;
      console.log("directOrderID:", directTruckOrderId);

      router.push(`/manager/truckOrders/edit/
${directTruckOrderId}`);
    } catch (error) {
      console.error("Failed to navigate:", error);
    }
  };
  return (
    <div className="flex">
      {isLoading === "Pending" && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500"></div>
        </div>
      )}
      <SidebarNavigation />
      <div className="flex flex-col w-3/4 mx-auto mt-3 ">
        <UserPanel />
        <div className="text-3xl mt-3 py-2 font-mono font-bold">
          Truck Orders
        </div>
        <div className="flex items-center   py-2">
          <button
            onClick={createNewTruckOrder}
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
