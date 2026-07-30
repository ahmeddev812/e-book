"use client";

import { useState } from "react";

interface SortDropdownProps {
  selected: string;
  onSelect: (option: string) => void;
}

const sortOptions = ["Bestselling", "New Arrivals", "Price Low-High", "Price High-Low", "Customer Rating"];

export function SortDropdown({ selected, onSelect }: SortDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="custom-select min-w-48">
      <div
        className="select-selected text-sm whitespace-nowrap"
        onClick={() => setOpen(!open)}
      >
        <span>Sort by: {selected}</span>
        <div className="w-5 h-5 flex items-center justify-center ml-2">
          <i className="ri-arrow-down-s-line"></i>
        </div>
      </div>
      {open && (
        <div className="select-items" style={{ display: "block" }}>
          {sortOptions.map((opt) => (
            <div
              key={opt}
              className="select-item text-sm"
              onClick={() => {
                onSelect(opt);
                setOpen(false);
              }}
            >
              Sort by: {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
