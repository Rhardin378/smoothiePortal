"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SidebarNavigation from "../../../components/SidebarNavigation";
import UserPanel from "@/app/components/userPanel";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getTruckOrderById } from "../../../store/slices/truckOrdersSlice";
import ProductToOrderTable from "../../../components/truckOrder/productToOrderTable";
import Link from "next/link";
import Unauthorized from "../../../components/unauthorized";

const EditTruckOrderView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.authenticated);
  const userId = useSelector((state) => state.auth.userId);

  // setup pagination using useState

  // console.log("truck Order:", purchaseOrder);
  // console.log("Count:", purchaseOrder.length);

  const formattedId = (id) => id.slice(-7).toUpperCase();
  // const productsPerPage = 10;
  // const totalPages = purchaseOrder.length / productsPerPage;

  useEffect(() => {
    dispatch(getTruckOrderById({ id, userId }));
  }, [userId, id, dispatch]);

  if (authenticated) {
    return (
      <div className="flex">
        <SidebarNavigation />
        <div className="flex-col w-3/4 mx-auto mt-3">
          <UserPanel />
          <div className="text-3xl mt-3 py-2 font-mono font-bold">
            <h1>Truck Order &gt; {formattedId(id)} </h1>
          </div>
          <div className="flex-col space-x-4 mb-4">
            <ProductToOrderTable editable={false} singleTruckOrderId={id} />
          </div>
        </div>
      </div>
    );
  } else {
    return <Unauthorized />;
  }
};

export default EditTruckOrderView;
