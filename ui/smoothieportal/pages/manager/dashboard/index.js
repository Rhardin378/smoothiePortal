import React from "react";
import { useSelector } from "react-redux";
const Dashboard = () => {
  const authenticated = useSelector((state) => state.auth.authenticated);
  const renderPage = authenticated ? (
    <div>dashboard</div>
  ) : (
    <div>Please Login</div>
  );

  return <>{renderPage}</>;
};

export default Dashboard;
