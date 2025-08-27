"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInventory } from "@/store/slices/inventorySlice";
import { InventoryTableOrganism } from "@/components/organisms/InventoryTableOrganism";

export const InventoryTable = ({ store, searchTerm }) => {
  const inventory = useSelector((state) => state.inventory.inventory);
  const totalProducts = useSelector((state) => state.inventory.count);
  const [pageNumber, setPageNumber] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInventory = async () => {
      if (store && store._id) {
        try {
          await dispatch(
            getInventory({
              storeId: store._id,
              pageNumber,
              productName: searchTerm,
            })
          );
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchInventory();
  }, [dispatch, store, pageNumber, searchTerm]);

  return (
    <InventoryTableOrganism
      inventory={inventory}
      totalProducts={totalProducts}
      currentPage={pageNumber}
      onPageChange={setPageNumber}
      storeId={store?._id}
    />
  );
};
