"use client";
import React from "react";
import { useSelector } from "react-redux";
import SidebarNavigation from "../../components/SidebarNavigation";

const SmoothieMenu = () => {
  return (
    <div className="flex">
      <SidebarNavigation />
      <div>All Smoothies</div>
    </div>
  );
};

export default SmoothieMenu;
