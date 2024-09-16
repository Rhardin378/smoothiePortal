"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchUser, signout } from "../../store/slices/authSlice";
import SidebarNavigation from "../../components/SidebarNavigation";
import InventorySearchBar from "../../components/inventorySearch";
import UserPanel from "../../components/userPanel";
import InventoryTable from "../../components/inventoryTable";
import AddItemModal from "../../components/addItemModal";

const Inventory = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.authenticated);
  const name = useSelector((state) => state.auth.name);
  const store = useSelector((state) => state.auth.store);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchUser());
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="flex">
      <SidebarNavigation />
      <div className="flex flex-col w-3/4 mx-auto ">
        <div className="flex justify-between items-center  py-3">
          <InventorySearchBar />
          <UserPanel />
        </div>
        <div className="text-3xl   py-2 font-mono font-bold">Inventory</div>
        <div className="flex items-center   py-2">
          <AddItemModal />
        </div>
        <InventoryTable store={store} />
      </div>
    </div>
  );
};

export default Inventory;
