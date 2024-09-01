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

  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return (
    <nav className="w-2/12 h-full bg-gray-500 text-white flex flex-col">
      <div className="p-4">
        <h2 className="text-4xl font-bold">Store # {store.storeNumber}</h2>
        <h3 className="text-lg">{store.address.street}</h3>
      </div>

      <ul className="flex flex-col space-y-4 px-6 p-4 text-xl">
        <li>
          <Link href="#" className="hover:text-gray-300">
            Smoothie Menu
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-gray-300">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-gray-300">
            Inventory
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-gray-300">
            Truck Orders
          </Link>
        </li>
        {/* Add more sections as needed */}
      </ul>
    </nav>
  );
};

export default SidebarNavigation;
