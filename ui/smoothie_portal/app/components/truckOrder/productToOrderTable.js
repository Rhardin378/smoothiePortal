"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getTruckOrderById } from "../../store/slices/truckOrdersSlice";
import ProductToOrderTableItem from "./productToOrderTableItem";
import ProductToOrderPageNavigation from "./productToOrderPageNavigation";
import next from "next";

const ProductToOrderTable = ({ singleTruckOrderId }) => {
  const [page, setPage] = useState(1);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);

  const truckOrder = useSelector((state) => state.truckOrders.singleTruckOrder);
  const { purchaseOrder } = truckOrder ?? {};
  const userId = useSelector((state) => state.auth.userId);
  const productsPerPage = 10;

  const nextPage = () => {
    setPage((prevPage) => {
      const totalPages = Math.ceil(
        truckOrder.purchaseOrder.length / productsPerPage
      );
      console.log("total Pages:", totalPages);
      const newPage = prevPage + 1;
      if (newPage > totalPages) {
        return prevPage;
      } else {
        updateCurrentProducts(newPage);
        return newPage;
      }
    });
  };

  const previousPage = () => {
    setPage((prevPage) => {
      const newPage = prevPage - 1;
      if (newPage < 1) {
        return prevPage;
      } else {
        updateCurrentProducts(newPage);
        return newPage;
      }
    });
  };

  const updateCurrentProducts = (page) => {
    const pageStart = (page - 1) * productsPerPage;
    if (purchaseOrder) {
      const newProducts = purchaseOrder.slice(
        pageStart,
        pageStart + productsPerPage
      );
      setCurrentProducts(newProducts);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (singleTruckOrderId && userId) {
      console.log("truckOrderId exists");
      dispatch(getTruckOrderById({ id: singleTruckOrderId, userId: userId }));
    }
  }, [dispatch, singleTruckOrderId]);

  useEffect(() => {
    if (purchaseOrder) {
      setProductCount(purchaseOrder.length);
      updateCurrentProducts(page);
    }
  }, [purchaseOrder, page]);
  return (
    <div className="container mx-auto">
      <div className="overflow-x-auto flex mt-4">
        <table className="min-w-full w-2/3 bg-white border border-gray-200">
          <thead>
            <tr className="bg-red-600">
              <th className="py-3 px-4 border-b border-gray-200 text-center text-lg font-semibold text-white">
                Product ID
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-center text-lg font-semibold text-white">
                Product Name
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-center text-lg font-semibold text-white">
                Count
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-center text-lg font-semibold text-white">
                In Stock
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-center text-lg font-semibold text-white">
                Needed Weekly
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-center text-lg font-semibold text-white">
                Date
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-center text-lg font-semibold text-white"></th>
              <th className="py-3 px-4 border-b border-gray-200 text-center text-lg font-semibold text-white"></th>
            </tr>
          </thead>
          <tbody>
            {truckOrder &&
              truckOrder.purchaseOrder &&
              currentProducts.map((product) => {
                return (
                  <ProductToOrderTableItem
                    key={product._id}
                    productId={product._id}
                    productName={product.name}
                    count={product.count}
                    inStock={product.product?.inStock ?? "N/A"}
                    neededWeekly={product.product?.neededWeekly ?? "N/A"}
                    units={product.product?.units ?? "cases"}
                    date={product.lastUpdated}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
      <ProductToOrderPageNavigation
        totalCount={productCount}
        nextPage={nextPage}
        previousPage={previousPage}
        currentPage={page}
      />
      {/* <button
        onClick={nextPage}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Next Page
      </button> */}
      {/* <InventoryPageNumber
        setPageNumber={setPageNumber}
        currentPage={pageNumber}
      /> */}
    </div>
  );
};

export default ProductToOrderTable;
