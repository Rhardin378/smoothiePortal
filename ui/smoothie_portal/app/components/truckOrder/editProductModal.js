import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import {
  editInventoryItem,
  getInventory,
  getSingleProduct,
} from "../../store/slices/inventorySlice";
import store from "@/app/store/configureStore";

const EditProductModal = ({
  productId,
  productName,
  count,
  inStock,
  neededWeekly,
  units,
}) => {
  // still need to add edit slice

  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("productID:", productId);

  const [formData, setFormData] = useState({
    count: 0,
  });
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const storeId = useSelector((state) => state.auth.store._id);

  const productSchema = Yup.object().shape({
    count: Yup.number().required(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  useEffect(() => {
    if (productId) {
      reset({
        name: productName || "",
        count: count || "",
        neededWeekly: neededWeekly || 0,
        inStock: inStock || "",
        units: units || "",
        // Populate other fields as needed
      });
    }
  }, [productId]);

  const onSubmit = async (data) => {
    try {
      const formData = { count };
      console.log(formData);
      // where edit will be added
      await dispatch(editInventoryItem(formData));
      await dispatch(getInventory({ storeId, pageNumber })).then(() =>
        closeModal()
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
      >
        Edit
      </button>

      {isModalOpen && (
        <div
          id="static-modal"
          data-modal-backdrop="static"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-center text-xl font-bold text-red-900 mb-4">
                Edit Product
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
              {/* {errorMessage && (
                <div className="text-red-500 text-center font-bold">
                  <p> {errorMessage} </p> <p> error:</p>
                </div>
              )} */}

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="text-base leading-relaxed text-gray-500 dark:text-gray-400"
              >
                <label htmlFor="name">Name</label>
                <input
                  disabled
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-not-allowed "
                  {...register("name", { required: true })}
                />
                {errors.name?.message}
                <label htmlFor="category">Category</label>
                <select
                  disabled
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
                  type="text"
                  id="inStock"
                  name="inStock"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-not-allowed"
                  {...register("inStock", {})}
                />
                {errors.inStock?.message}

                <label htmlFor="units">Units</label>
                <input
                  disabled
                  type="text"
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
  );
};

export default EditProductModal;
