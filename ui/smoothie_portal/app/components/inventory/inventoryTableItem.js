import React from "react";
import moment from "moment";
import { TableRow } from "@/components/atoms/TableRow";
import { TableCell } from "@/components/atoms/TableCell";
import EditItemModal from "../organisms/editItemModal";
import DeleteItemModal from "../organisms/deleteItemModal";
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

  return (
    <TableRow>
      <TableCell className="font-bold">{name}</TableCell>
      <TableCell className="font-bold">{category}</TableCell>
      <TableCell className="font-bold">
        {inStock} {units}
      </TableCell>
      <TableCell className="font-bold">
        {neededWeekly} {units}
      </TableCell>
      <TableCell className="font-bold">{date}</TableCell>
      <TableCell isAction>
        <EditItemModal
          productId={productId}
          pageNumber={pageNumber}
          currentPage={currentPage}
        />
      </TableCell>
      <TableCell isAction>
        <DeleteItemModal productId={productId} type={"inventory"} />
      </TableCell>
    </TableRow>
  );
};

export default InventoryTableItem;
