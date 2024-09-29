"use client";
import React from "react";
import { useSelector } from "react-redux";
import SidebarNavigation from "../../../components/SidebarNavigation";
import UserPanel from "../../../components/userPanel";

const NewTruckOrder = () => {
  return (
    <div className="flex">
      <SidebarNavigation />
      <div className="flex flex-col w-3/4 mx-auto mt-3 ">
        <UserPanel />
        <div className="text-3xl mt-3 py-2 font-mono font-bold">
          Truck Orders &gt; New order
        </div>
        {/* this page will have the prepopulated truck order  */}
      </div>
    </div>
  );
};

export default NewTruckOrder;
