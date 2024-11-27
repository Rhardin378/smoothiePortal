"use client";
import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import SidebarNavigation from "../../../../components/SidebarNavigation";
import UserPanel from "@/app/components/userPanel";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getTruckOrderById } from "../../../../store/slices/truckOrdersSlice";
import ProductToOrderTable from "../../../../components/truckOrder/productToOrderTable";
import AddProductToOrderModal from "../../../../components/truckOrder/addProductToOrderModal";
import Unauthorized from "../../../../components/unauthorized";
import { fetchUser } from "../../../../store/slices/authSlice";

const EditTruckOrderView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const authorized = useSelector((state) => state.auth.authorized);
  const userId = useSelector((state) => state.auth.userId);
  const truckOrderId = useSelector(
    (state) => state.truckOrders?.singleTruckOrder._id
  );
  const [truckOrderChanged, setTruckOrderChanged] = useState(false);
  const truckOrder = useSelector(
    (state) => state.truckOrders?.singleTruckOrder
  );

  // console.log("truck Order:", purchaseOrder);
  // console.log("Count:", purchaseOrder.length);

  const formattedId = (id) => id.slice(-7).toUpperCase();
  // const productsPerPage = 10;
  // const totalPages = purchaseOrder.length / productsPerPage;
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    setTruckOrderChanged(true);
  }, [truckOrder]);
  useEffect(() => {
    if (truckOrderId && truckOrderId !== "undefined" && truckOrderChanged) {
      dispatch(getTruckOrderById({ id: truckOrderId, userId })).then(() =>
        setTruckOrderChanged(false)
      );
    }
  }, [userId, truckOrderId, dispatch, truckOrderChanged]);

  if (authorized) {
    return (
      <div className="flex">
        <SidebarNavigation />
        <div className="flex-col w-3/4 mx-auto mt-3">
          <UserPanel />
          <div className="text-3xl mt-3 py-2 font-mono font-bold">
            <h1>Truck Order &gt; Edit &gt; {formattedId(id)} </h1>
          </div>
          <div className="flex items-center  gap-4  py-2">
            <AddProductToOrderModal />
            <Link href={"/manager/truckOrders"}>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4  rounded">
                Complete Order
              </button>
            </Link>
          </div>

          <div className="flex-col space-x-4 mb-4">
            <ProductToOrderTable editable={true} singleTruckOrderId={id} />
          </div>
        </div>
      </div>
    );
  } else {
    return <Unauthorized />;
  }
};

export default EditTruckOrderView;
