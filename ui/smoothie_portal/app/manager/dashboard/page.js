"use client";
import React from "react";
import { useSelector } from "react-redux";
import SidebarNavigation from "../../components/SidebarNavigation";
const Dashboard = () => {
  const authenticated = useSelector((state) => state.auth.authenticated);

  return (
    <div className="flex h-screen">
      <SidebarNavigation />
      <div>Dashboard</div>
    </div>
  );
};

export default Dashboard;
