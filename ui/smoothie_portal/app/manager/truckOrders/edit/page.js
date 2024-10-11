"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTruckOrderById } from "../../../store/slices/truckOrdersSlice";
import { useEffect } from "react";
import SidebarNavigation from "../../../components/SidebarNavigation";
import UserPanel from "../../../components/userPanel";

const EditTruckOrder = () => {
  const truckOrderId = useSelector((state) => state.truckOrders.truckOrderId);
  console.log(truckOrderId);
  const userId = useSelector((state) => state.auth.userId);

  const dispatch = useDispatch();
  const formattedId = (id) => id.slice(-7).toUpperCase();
  // add a useEffect that if truckOrderId does a get request for that current TruckOrder

  useEffect(() => {
    if (truckOrderId) {
      console.log("truckOrderId exists");
      dispatch(getTruckOrderById({ id: truckOrderId, userId: userId }));
    }
  }, [dispatch, truckOrderId]);
  return (
    <div className="flex">
      <SidebarNavigation />
      <div className="flex flex-col w-3/4 mx-auto mt-3 ">
        <UserPanel />
        <div className="text-3xl mt-3 py-2 font-mono font-bold">
          <p> Truck Orders &gt; order # {formattedId(truckOrderId)} </p>
        </div>
        {/* this page will have the prepopulated truck order  */}
      </div>
    </div>
  );
};

export default EditTruckOrder;
