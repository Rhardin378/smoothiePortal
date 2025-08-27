"use client";

import React from "react";
import { Table } from "@/components/atoms/Table";
import { TableHeader } from "@/components/atoms/TableHeader";
import { TableRow } from "@/components/atoms/TableRow";
import { InventoryRow } from "@/components/molecules/InventoryRow";
import { Pagination } from "@/components/molecules/Pagination";

export const InventoryTableOrganism = ({
  inventory,
  totalProducts,
  currentPage,
  onPageChange,
  storeId,
}) => {
  return (
    <div>
      <Table>
        <thead>
          <TableRow isHeader={true}>
            <TableHeader>Product Name</TableHeader>
            <TableHeader>Category</TableHeader>
            <TableHeader>Quantity</TableHeader>
            <TableHeader>Needed Weekly</TableHeader>
            <TableHeader>Last Updated</TableHeader>
            <TableHeader></TableHeader>
            <TableHeader></TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {inventory.map((product) => (
            <InventoryRow
              key={product._id}
              productId={product._id}
              name={product.name}
              category={product.category}
              neededWeekly={product.neededWeekly}
              inStock={product.inStock}
              units={product.units}
              lastUpdated={product.lastUpdated}
              pageNumber={currentPage}
              currentPage={currentPage}
              storeId={storeId}
            />
          ))}
        </tbody>
      </Table>
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalProducts / 10)}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};
