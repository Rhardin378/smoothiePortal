import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { addItemToInventory } from "../../store/slices/inventorySlice";

const AddItemModal = ({ store }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const errorMessage = useSelector((state) => state.inventory.errorMessage);

  const storeId = store._id;

  const productSchema = Yup.object().shape({
    name: Yup.string().required(),
    category: Yup.string().required(),
    neededWeekly: Yup.number().required(),
    inStock: Yup.number().required(),
    units: Yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const formData = { storeId, ...data };
      await dispatch(addItemToInventory(formData));
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="flex items-center border border-transparent hover:border-2 hover:border-black hover:bg-red-600 hover:text-white font-bold py-1 px-2 rounded"
      >
        <span className="text-2xl mr-2">&#x2b;</span>
        Add New Item
      </button>

      {isModalOpen && (
        <div
          id="static-modal"
          data-modal-backdrop="static"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700 z-60">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-center text-xl font-bold text-red-900 mb-4">
                New Product
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
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  {...register("name", { required: true })}
                />
                {errors.name?.message}
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  {...register("category", { required: true })}
                >
                  {errors.category?.message}
                  <option value="frozen">Frozen</option>
                  <option value="refrigerated">Refrigerated</option>
                  <option value="dry">Dry</option>
                </select>

                <label htmlFor="neededWeekly">Needed Weekly</label>
                <input
                  type="text"
                  id="neededWeekly"
                  name="neededWeekly"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  {...register("neededWeekly", {
                    required: true,
                    pattern: {
                      value: /^\d*\.?\d+$/,
                      message: "Please enter a valid number",
                    },
                  })}
                />
                {errors.neededWeekly?.message}

                <label htmlFor="inStock">In Stock</label>
                <input
                  type="text"
                  id="inStock"
                  name="inStock"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  {...register("inStock", {
                    required: true,
                    pattern: {
                      value: /^\d*\.?\d+$/,
                      message: "Please enter a valid number",
                    },
                  })}
                />
                {errors.inStock?.message}
                <label htmlFor="units">Units</label>
                <input
                  type="text"
                  id="units"
                  name="units"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  {...register("units", { required: true })}
                />
                {errors.units?.message}
                {/* Modal footer */}
                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    type="submit"
                    className="text-white bg-red-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-green-700 dark:focus:ring-blue-800"
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

export default AddItemModal;
