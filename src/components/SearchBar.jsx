import React from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

export default function SearchBar({ placeholder = "Search" }) {
  return (
    // Search Bar
    <div className="w-full p-4 font-sans">
      <button className="flex items-center w-full system-search-bar  text-sm px-4 py-2 rounded-full">
        <MagnifyingGlass
          className="mr-2 system-base-text muted-text"
          size={18}
          weight="regular"
        />
        <span className="text-left muted-text">{placeholder}</span>
      </button>
    </div>
  );
}
