"use client";
import React from "react";
import { useSelector } from "react-redux";
import SidebarNavigation from "../../components/SidebarNavigation";
import InventorySearchBar from "../../components/inventorySearch";
import UserPanel from "../../components/userPanel";

const Inventory = () => {
  return (
    <div className="flex">
      <SidebarNavigation />
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center px-4 py-3">
          <InventorySearchBar />
          <UserPanel />
        </div>
        <div className="text-3xl ml-4 px-4 py-2 font-mono font-bold">
          Inventory
        </div>
      </div>
    </div>
  );
};

export default Inventory;
