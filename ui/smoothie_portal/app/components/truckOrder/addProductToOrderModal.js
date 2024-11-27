"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { getAllInventory } from "../../store/slices/inventorySlice";
import {
  addProductToOrder,
  getTruckOrderById,
} from "../../store/slices/truckOrdersSlice";
const AddProductToOrderModal = () => {
  const userStoreId = useSelector((state) => state.auth.store._id);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  const [selectedProduct, setSelectedProduct] = useState("");
  const [productId, setProductId] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const errorMessage = useSelector((state) => state.inventory.errorMessage);
  const inventory = useSelector((state) => state.inventory.inventory);
  const truckOrder = useSelector((state) => state.truckOrders.singleTruckOrder);
  const truckOrderId = useSelector(
    (state) => state.truckOrders.singleTruckOrder._id
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const productSchema = Yup.object().shape({
    count: Yup.number().required(),
  });
  // form for name is a drop down of select items
  // the select for the name will be all the names of items in inventory
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  useEffect(() => {
    if (userStoreId) {
      dispatch(getAllInventory({ storeId: userStoreId }));

      console.log("inventory fetched");
    }
  }, [dispatch, userStoreId]);

  const populateSelectedProduct = (product) => {
    const populatedItem = inventory.find(
      (foundProduct) => foundProduct._id === product
    );
    console.log("populatedITEM:", populatedItem);
    setSelectedProduct(populatedItem);
    setProductId(product);
  };
  /**
   * Filters the inventory to exclude products that are already in the truck order's purchase order.
   *
   * @param {Array} inventory - The list of all available products.
   * @param {Array} truckOrder.purchaseOrder - The list of products already in the truck order.
   * @returns {Array} - The filtered list of products not yet in the truck order's purchase order.
   */
  const filterProducts = (inventory, truckOrder) =>
    inventory.filter(
      (item) =>
        !truckOrder?.purchaseOrder?.some(
          (orderItem) => orderItem?.name === item?.name
        )
    );

  const onSubmit = async (data) => {
    try {
      const name = selectedProduct.name;

      const { count } = data;
      const formData = {
        truckOrderId,
        productId,
        storeId: userStoreId,
        count,
        name,
      };
      console.log("submitted data:", formData);
      // where edit will be added
      await dispatch(addProductToOrder(formData));

      await dispatch(getTruckOrderById({ id: truckOrderId, userId }));
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const setProduct = (e) => {
    console.log("setProduct function called");
    const product = e.target.value;
    setSelectedProduct(product);
    populateSelectedProduct(product);

    console.log(product);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="flex  items-center border border-transparent hover:border-2 hover:border-black hover:bg-red-600 hover:text-white font-bold py-1 px-2 rounded"
      >
        <span className="text-2xl mr-2">&#x2b;</span>
        Add Product to Order
      </button>
      {isModalOpen && (
        <div
          id="static-modal"
          data-modal-backdrop="static"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-center text-xl font-bold text-red-900 mb-4">
                Add Product To Order
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={closeModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-4 md:p-5 space-y-4">
              {errorMessage && (
                <div className="text-red-500 text-center font-bold">
                  <p> {errorMessage} </p> <p> error:</p>
                </div>
              )}

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="text-base leading-relaxed text-gray-500 dark:text-gray-400"
              >
                <label htmlFor="Select A Product To Add">
                  Select A Product To Add
                </label>
                <select
                  value={productId}
                  onChange={setProduct}
                  id="name"
                  name="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  max-h-48 overflow-auto "
                >
                  <option value="#">Select an option</option>
                  {filterProducts(inventory, truckOrder).map((product) => {
                    return (
                      <option key={product._id} value={product._id}>
                        {product.name}
                      </option>
                    );
                  })}
                </select>
                {errors.name?.message}
                <label htmlFor="category">Category</label>
                <select
                  disabled
                  value={selectedProduct.category}
                  id="category"
                  name="category"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-not-allowed"
                  {...register("category", { required: true })}
                >
                  <option value="frozen">Frozen</option>
                  <option value="refrigerated">Refrigerated</option>
                  <option value="dry">Dry</option>
                </select>
                {errors.cetegory?.message}

                <label htmlFor="count">count</label>
                <input
                  type="text"
                  id="count"
                  name="count"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm outline-none ring ring-indigo-500 border border-indigo-500 sm:text-sm"
                  {...register("count", {
                    required: true,
                    pattern: {
                      value: /^\d*\.?\d+$/,
                      message: "Please enter a valid number",
                    },
                    setValueAs: (value) => parseFloat(value), // Parse the value as a float
                  })}
                />
                {errors.neededWeekly?.message}

                <label htmlFor="neededWeekly">Needed Weekly</label>
                <input
                  disabled
                  value={selectedProduct.neededWeekly}
                  type="text"
                  id="neededWeekly"
                  name="neededWeekly"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-not-allowed"
                  {...register("neededWeekly", {
                    required: true,
                  })}
                />
                {errors.neededWeekly?.message}

                <label htmlFor="inStock">In Stock</label>
                <input
                  disabled
                  value={selectedProduct.inStock}
                  type="text"
                  id="inStock"
                  name="inStock"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-not-allowed"
                  {...register("inStock", { required: true })}
                />
                {errors.inStock?.message}

                <label htmlFor="units">Units</label>
                <input
                  disabled
                  type="text"
                  value={selectedProduct.units}
                  id="units"
                  name="units"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-not-allowed"
                  {...register("units", { required: true })}
                />
                {errors.units?.message}
                {/* Modal footer */}
                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    type="submit"
                    className="text-white bg-red-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-green-800 dark:focus:ring-blue-800"
                  >
                    Save Product
                  </button>
                  <button
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
    // useEffect that when the item changes on select a get request is sent to that product in the inventory
    // get the inventory
  );
};

export default AddProductToOrderModal;
