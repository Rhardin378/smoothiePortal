// app/components/templates/InventoryTemplate.js
"use client";
import React from "react";
import { UserPanel } from "@/components/molecules/UserPanel";
import { InventorySearchBar } from "@/components/inventory/inventorySearch";

export const InventoryTemplate = ({
  title = "Inventory Management",
  searchTerm,
  setSearchTerm,
  store,
  addItemModal: AddItemModal,
  tableComponent: TableComponent,
  children,
}) => {
  return (
    <div className="max-w-7xl mx-auto pb-6 h-screen">
      {/* Header Section */}
      <header className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          <UserPanel />
        </div>

        {/* Search and Actions Row */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full sm:w-[400px]">
            <InventorySearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
          {AddItemModal && <AddItemModal store={store} />}
        </div>
      </header>

      {/* Table Section */}
      <section className="bg-white rounded-lg shadow-sm">
        {TableComponent && (
          <TableComponent searchTerm={searchTerm} store={store} />
        )}
        {children}
      </section>
    </div>
  );
};
