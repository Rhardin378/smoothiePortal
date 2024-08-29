"use client";
import React from "react";
import { useSelector } from "react-redux";
import SidebarNavigation from "../../components/SidebarNavigation";
const Dashboard = () => {
  const authenticated = useSelector((state) => state.auth.authenticated);
  const renderPage = authenticated ? (
    <div>dashboard</div>
  ) : (
    <div>Please Login</div>
  );

  return (
    <div className="flex h-screen">
      <SidebarNavigation />
      {renderPage}
    </div>
  );
};

export default Dashboard;
