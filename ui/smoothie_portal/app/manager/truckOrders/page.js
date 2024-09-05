"use client";
import React from "react";
import { useSelector } from "react-redux";
import SidebarNavigation from "../../components/SidebarNavigation";

const Inventory = () => {
  return (
    <div className="flex">
      <SidebarNavigation />
      <div>Truck Orders</div>
    </div>
  );
};

export default Inventory;
