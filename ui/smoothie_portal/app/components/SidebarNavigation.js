import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, signout } from "../store/slices/authSlice";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaTruck,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const SidebarNavigation = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.authenticated);
  const store = useSelector((state) => state.auth.store);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleSignOut = async () => {
    await dispatch(signout());
    router.push("/");
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const renderStore = () => {
    if (authenticated && store.address && store.address.street) {
      return (
        <div className="mx-6 p-4">
          <h2 className="text-4xl font-bold mb-2">
            Store # {store.storeNumber}
          </h2>
          <h3 className="text-xl">{store.address.street}</h3>
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

  return (
    <div>
      <button
        className="md:hidden p-4 text-white bg-gray-800"
        onClick={toggleMenu}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <nav
        ref={sidebarRef}
        className={`fixed top-0 left-0 w-64 h-screen bg-gray-800 text-white flex flex-col flex-shrink-0 shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        {renderStore()}
        <ul className="flex flex-col space-y-4 mx-6 p-4 text-xl">
          <li onClick={toggleMenu}>
            <Link href="/manager/dashboard">
              <div className="flex items-center space-x-3 hover:text-gray-300 cursor-pointer">
                <FaTachometerAlt />
                <span>Dashboard</span>
              </div>
            </Link>
          </li>
          <li onClick={toggleMenu}>
            <Link href="/manager/inventory">
              <div className="flex items-center space-x-3 hover:text-gray-300 cursor-pointer">
                <FaBoxOpen />
                <span>Inventory</span>
              </div>
            </Link>
          </li>
          <li onClick={toggleMenu}>
            <Link href="/manager/truckOrders">
              <div className="flex items-center space-x-3 hover:text-gray-300 cursor-pointer">
                <FaTruck />
                <span>Truck Orders</span>
              </div>
            </Link>
          </li>
          <li onClick={toggleMenu}>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-3 hover:text-gray-300 w-full text-left"
            >
              <FaSignOutAlt />
              <span>Sign Out</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarNavigation;
