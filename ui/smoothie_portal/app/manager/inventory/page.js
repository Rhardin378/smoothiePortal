// app/manager/inventory/page.js
"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "@/store/slices/authSlice";
import { InventoryTemplate } from "@/components/templates/InventoryTemplate";
import { InventoryTable } from "@/components/containers/inventory/InventoryTable";
import { AddItemModal } from "@/components/organisms/addItemModal";
import { SidebarNavigation } from "@/components/SidebarNavigation";
import { Unauthorized } from "@/components/Unauthorized";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { authenticated, store } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchUser());
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dispatch]);

  if (!authenticated) {
    return <Unauthorized />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarNavigation />
      <main className="flex-1">
        <InventoryTemplate
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          store={store}
          addItemModal={AddItemModal}
          tableComponent={InventoryTable}
        />
      </main>
    </div>
  );
};

export default Inventory;
