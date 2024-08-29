import React from "react";
import Link from "next/link";
const SidebarNavigation = () => {
  return (
    <nav className="w-2/12 h-full bg-gray-800 text-white flex flex-col">
      <ul className="flex flex-col space-y-2 p-4">
        <li>
          <Link href="#">Menu</Link>
        </li>
        <li>
          <Link href="#">Dashboard</Link>
        </li>
        <li>
          <Link href="#">Inventory</Link>
        </li>
        <li>
          <Link href="#">Truck Orders</Link>
        </li>
        {/* Add more sections as needed */}
      </ul>
    </nav>
  );
};

export default SidebarNavigation;
