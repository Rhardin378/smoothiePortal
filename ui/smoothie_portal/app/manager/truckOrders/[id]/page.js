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

const EditTruckOrderView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const truckOrder = useSelector((state) => state.truckOrders.singleTruckOrder);
  const { purchaseOrder } = truckOrder || {};
  // setup pagination using useState
  const [productCount, setProductCount] = useState(0);

  // console.log("truck Order:", purchaseOrder);
  // console.log("Count:", purchaseOrder.length);

  const formattedId = (id) => id.slice(-7).toUpperCase();
  // const productsPerPage = 10;
  // const totalPages = purchaseOrder.length / productsPerPage;

  useEffect(() => {
    dispatch(getTruckOrderById({ id, userId }));
  }, [userId, id, dispatch]);

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

          {/* <Link href={`/manager/truckOrders/`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Back to Truck Orders
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default EditTruckOrderView;
