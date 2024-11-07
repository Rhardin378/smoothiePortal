import React, { useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, signout } from "../store/slices/authSlice";
const SidebarNavigation = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.authenticated);
  const name = useSelector((state) => state.auth.name);
  const store = useSelector((state) => state.auth.store);
  const role = useSelector((state) => state.auth.role);

  // The loading state is needed to ensure that the store information is only rendered
  // once the user data has been fetched. This prevents the renderStore function from
  // being called with incomplete data during the initial render.
  const renderStore = () => {
    if (authenticated && store.address && store.address.street) {
      return (
        <div className="mx-6 p-4">
          <h2 className="text-4xl font-bold mb-2">
            Store # {store.storeNumber}
          </h2>
          <h3 className="text-lg ">{store.address.street}</h3>
        </div>
      );
    } else {
      return (
        <div className="mx-6 p-4">
          <h2 className="text-4xl font-bold">Store # ****</h2>
          <h3 className="text-lg">*********</h3>
        </div>
      );
    }
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <nav className="w-2/12 h-screen bg-gray-500 text-white flex flex-col flex-shrink-0">
      {renderStore()}

      <ul className="flex flex-col space-y-6 mx-6 p-4 text-xl">
        <li>
          <Link href="/manager/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/manager/inventory" className="hover:text-gray-300">
            Inventory
          </Link>
        </li>
        <li>
          <Link href="/manager/truckOrders" className="hover:text-gray-300">
            Truck Orders
          </Link>
        </li>
        {/* Add more sections as needed */}
      </ul>
    </nav>
  );
};

export default SidebarNavigation;
