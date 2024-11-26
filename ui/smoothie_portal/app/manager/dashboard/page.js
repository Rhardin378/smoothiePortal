"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SidebarNavigation from "../../components/SidebarNavigation";
import UserPanel from "../../components/userPanel";
import GoodsStatus from "../../components/dashboard/GoodsStatus";

import TruckOrderTracker from "../../components/dashboard/truckOrderTracker";
import PreviousTruckOrderChart from "../../components/dashboard/previousTruckOrderChart";
import InventoryChart from "../../components/dashboard/inventoryChart";
import { fetchUser } from "../../store/slices/authSlice";
import { getAllInventory } from "../../store/slices/inventorySlice";
import {
  getAllTruckOrders,
  selectTruckOrdersWithTotalCases,
} from "../../store/slices/truckOrdersSlice";

const Dashboard = () => {
  const authenticated = useSelector((state) => state.auth.authenticated);
  const storeId = useSelector((state) => state.auth.store._id);
  const truckOrderDay = useSelector((state) => state.auth.store.truckOrderDay);
  const userId = useSelector((state) => state.auth.userId);
  const inventory = useSelector((state) => state.inventory.inventory);
  const mostRecentTruckOrder = useSelector(
    (state) => state.truckOrders.truckOrders
  )[0];
  const dispatch = useDispatch();
  // inventory fetch
  // filter for
  // category == dry goods
  // category == refrigerated goods
  // category == frozen goods
  // low stock if stock is lower than half of amount needed weekly

  const filterProductsByCategory = (products, category) => {
    return products.filter((product) => product.category == category);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchUser());
        if (storeId) {
          await dispatch(getAllInventory({ storeId: storeId }));
          await dispatch(getAllTruckOrders({ userId: userId, pageNumber: 1 }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch, storeId, userId]);

  return (
    <div className="flex">
      <SidebarNavigation />
      <div className="flex flex-col w-3/4 mx-auto mt-3">
        <UserPanel />
        <div className="text-3xl mt-3 py-2 font-mono font-bold">Dashboard</div>
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-6">
            <GoodsStatus
              products={filterProductsByCategory(inventory, "dry")}
              type={"Dry Goods"}
            />
            <GoodsStatus
              products={filterProductsByCategory(inventory, "refrigerated")}
              type={"Refrigerated Goods"}
            />
            <GoodsStatus
              products={filterProductsByCategory(inventory, "frozen")}
              type={"Frozen Goods"}
            />
            <TruckOrderTracker day={truckOrderDay} />
            <PreviousTruckOrderChart truckOrder={mostRecentTruckOrder} />
            <InventoryChart products={inventory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
