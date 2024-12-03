"use client";
import React, { useEffect } from "react";
import { useState } from "react";

const GoodsStatus = ({ products, type }) => {
  // if a product quantity  is less than 1/2 of the needed weekly it is low
  // if a product quantity is at 0 it is out
  // else green
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);

  const getStatusColor = () => {
    if (outOfStockProducts.length > 0) return "bg-red-300";
    if (lowStockProducts.length > 0) return "bg-yellow-300";
    return "bg-green-300";
  };

  const countProducts = (products) => {
    let lowStockItems = [];
    let outOfStockItems = [];
    products.forEach((product) => {
      let surplusQuantity = product.neededWeekly - product.inStock;
      let outOfStock = product.inStock === 0;

      if (surplusQuantity > 0 && surplusQuantity <= product.neededWeekly / 2) {
        lowStockItems.push(product);
      }
      if (outOfStock) {
        outOfStockItems.push(product);
      }
    });
    setLowStockProducts(lowStockItems);
    setOutOfStockProducts(outOfStockItems);
  };

  useEffect(() => {
    if (products) {
      countProducts(products);
    }
  }, [products]);

  return (
    <div
      className={`${getStatusColor()} p-6  flex-1 h-1/3 rounded-lg shadow-lg m-2`}
    >
      <h2 className="text-2xl text-center  font-bold mb-2">{type}</h2>

      <p className="text-gray-700 text-xl">
        Out of Stock Products: {outOfStockProducts.length}
      </p>
      <p className="text-gray-700 text-xl">
        Low Products: {lowStockProducts.length}
      </p>
    </div>
  );
};

export default GoodsStatus;
