import React from "react";
import moment from "moment";
import Link from "next/link";
// import EditItemModal from "./editItemModal";
// import DeleteItemModal from "./deleteItemModal";
const TruckOrderTableItem = ({ id, user, date, cases }) => {
  let formattedDate = moment(date).format("L");
  console.log(date);
  const formattedId = (id) => id.slice(-7).toUpperCase();
  return (
    <tr className="odd:bg-gray-100 even:bg-white hover:bg-gray-200">
      <td className="py-3 px-4 border-b border-gray-200 text-center text-sm font-bold text-gray-700">
        <Link
          className="hover:text-blue-500"
          href={`/manager/truckOrders/${id}`}
        >
          {formattedId(id)}
        </Link>
      </td>{" "}
      <td className="py-3 px-4 border-b border-gray-200 text-center text-sm font-bold text-gray-700">
        {user}
      </td>
      <td className="py-3 px-4 border-b border-gray-200 text-center text-sm font-bold text-gray-700">
        {cases}
      </td>
      <td className="py-3 px-4 border-b border-gray-200 text-center text-sm font-bold text-gray-700">
        {formattedDate}
      </td>
      <td className="py-3  border-b border-gray-200 text-center text-sm font-bold text-gray-700"></td>
      <td className="py-3  border-b border-gray-200 text-center text-sm text-gray-700"></td>
    </tr>
  );
};

export default TruckOrderTableItem;
