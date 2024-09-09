"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInventory } from "../../store/slices/inventorySlice";
import { fetchUser, signout } from "../../store/slices/authSlice";
import SidebarNavigation from "../../components/SidebarNavigation";
import InventorySearchBar from "../../components/inventorySearch";
import UserPanel from "../../components/userPanel";

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

  useEffect(() => {
    // if (store && store.id) {
    //   console.log("working working");
    const fetchInventory = async () => {
      try {
        console.log(store);
        const storeId = store._id;
        await dispatch(getInventory({ storeId }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchInventory();
    // }
  }, [dispatch, store]);
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
