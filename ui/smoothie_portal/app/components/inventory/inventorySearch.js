"use client";
import { SearchInput } from "../molecules/SearchInput";

export const InventorySearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="w-full">
      <SearchInput
        placeholder="Search inventory items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
      />
    </div>
  );
};
