"use client";
import React from "react";
import { useSelector } from "react-redux";
import SidebarNavigation from "../../components/SidebarNavigation";
import UserPanel from "../../components/userPanel";

const Inventory = () => {
  return (
    <div className="flex">
      <SidebarNavigation />
      <div className="flex flex-col w-full">
        <UserPanel />
        <div>Inventory</div>
      </div>
    </div>
  );
};

export default Inventory;
