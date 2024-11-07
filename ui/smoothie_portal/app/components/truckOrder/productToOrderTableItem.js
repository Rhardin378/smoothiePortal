"use client";
import React from "react";
import moment from "moment";
import EditProductModal from "./editProductModal";

const ProductToOrderTableItem = ({
  editable,
  productId,
  productName,
  count,
  inStock,
  neededWeekly,
  units,
  date,
}) => {
  const formattedDate = moment(date).format("L");
  //id ._id
  //product name .name
  // count .count
  // in stock
  // .product.inStock
  // needed Weekly .product.neededWeekly
  // units .product.units
  //date
  const formattedId = (id) => id.slice(-7).toUpperCase();
  return (
    <tr className="odd:bg-gray-100 even:bg-white hover:bg-gray-200">
      <td className="py-3 px-4 border-b border-gray-200 text-center text-sm font-bold text-gray-700">
        {formattedId(productId)}
      </td>
      <td className="py-3 px-4 border-b border-gray-200 text-center text-sm font-bold text-gray-700">
        {productName}
      </td>
      <td className="py-3  border-b border-gray-200 text-center text-sm font-bold text-gray-700">
        {count} {units}
      </td>

      <td className="py-3 px-4 border-b border-gray-200 text-center text-sm font-bold text-gray-700">
        {inStock} {units}
      </td>
      <td className="py-3 px-4 border-b border-gray-200 text-center text-sm font-bold text-gray-700">
        {neededWeekly} {units}
      </td>
      <td className="py-3 px-4 border-b border-gray-200 text-center text-sm font-bold text-gray-700">
        {formattedDate}
      </td>

      <td className="py-3  border-b border-gray-200 text-center text-sm text-gray-700"></td>
      <td className="py-3 px-4 border-b border-gray-200 text-center text-sm font-bold text-gray-700">
        {editable && (
          <EditProductModal
            productName={productName}
            count={count}
            inStock={inStock}
            neededWeekly={neededWeekly}
            units={units}
            productId={productId}
          />
        )}
        {/* edit form will need a productId, name, and count passed to it */}
      </td>

      <td className="py-3  border-b border-gray-200 text-center text-sm text-gray-700"></td>
    </tr>
  );
};
export default ProductToOrderTableItem;
