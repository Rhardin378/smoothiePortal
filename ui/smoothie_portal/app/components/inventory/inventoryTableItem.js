import React from "react";
import moment from "moment";
import EditItemModal from "./editItemModal";
import DeleteItemModal from "./deleteItemModal";
const InventoryTableItem = ({
  productId,
  name,
  category,
  neededWeekly,
  inStock,
  units,
  lastUpdated,
  pageNumber,
  currentPage,
  storeId,
}) => {
  const date = moment(lastUpdated).format("L");
  console.log(date);
  return (
    <tr className="odd:bg-gray-100 even:bg-white hover:bg-gray-200">
      <td className="py-3 px-4 border-b border-gray-200 text-center text-sm font-bold text-gray-700">
        {name}{" "}
      </td>
      <td className="py-3 px-4 border-b border-gray-200 text-center text-sm font-bold text-gray-700">
        {category}
      </td>

      <td className="py-3 px-4 border-b border-gray-200 text-center text-sm font-bold text-gray-700">
        {inStock} {units}
      </td>
      <td className="py-3 px-4 border-b border-gray-200 text-center text-sm font-bold text-gray-700">
        {neededWeekly} {units}
      </td>
      <td className="py-3 px-4 border-b border-gray-200 text-center text-sm font-bold text-gray-700">
        {date}
      </td>
      <td className="py-3  border-b border-gray-200 text-center text-sm font-bold text-gray-700">
        <EditItemModal
          productId={productId}
          pageNumber={pageNumber}
          currentPage={currentPage}
        />
      </td>
      <td className="py-3  border-b border-gray-200 text-center text-sm text-gray-700">
        <DeleteItemModal productId={productId} type={"inventory"} />
      </td>
    </tr>
  );
};

export default InventoryTableItem;
