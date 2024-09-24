import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getInventory } from "../../store/slices/inventorySlice";
import InventoryTableItem from "../inventory/inventoryTableItem";
import InventoryPageNumber from "../inventory/inventoryPageNumber";
const InventoryTable = ({ store }) => {
  const inventory = useSelector((state) => state.inventory.inventory);
  const [pageNumber, setPageNumber] = useState(1);

  const dispatch = useDispatch();
  useEffect(() => {
    if (store && store._id) {
      console.log("working working");
      const fetchInventory = async () => {
        try {
          console.log(store);
          const storeId = store._id;
          await dispatch(getInventory({ storeId, pageNumber }));
        } catch (error) {
          console.log(error);
        }
      };

      fetchInventory();
    }
  }, [dispatch, store, pageNumber]);
  return (
    <div className="container mx-auto">
      <div className="overflow-x-auto flex mt-4">
        <table className="min-w-full w-2/3 bg-white border border-gray-200">
          <thead>
            <tr className="bg-red-600">
              <th className="py-3 px-4 border-b border-gray-200 text-center text-lg font-semibold text-white">
                Item Name
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-center text-lg font-semibold text-white">
                Category
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-center text-lg font-semibold text-white">
                Quantity
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-center text-lg font-semibold text-white">
                Needed Weekly
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-center text-lg font-semibold text-white">
                Last Updated
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-center text-lg font-semibold text-white"></th>
              <th className="py-3 px-4 border-b border-gray-200 text-center text-lg font-semibold text-white"></th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((product) => {
              return (
                <InventoryTableItem
                  key={product._id}
                  productId={product._id}
                  name={product.name}
                  category={product.category}
                  neededWeekly={product.neededWeekly}
                  inStock={product.inStock}
                  units={product.units}
                  lastUpdated={product.lastUpdated}
                  pageNumber={pageNumber}
                  currentPage={pageNumber}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <InventoryPageNumber
        setPageNumber={setPageNumber}
        currentPage={pageNumber}
      />
    </div>
  );
};

export default InventoryTable;
