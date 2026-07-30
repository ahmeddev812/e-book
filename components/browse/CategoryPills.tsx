"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface CategoryPill {
  name: string;
  count: number;
  icon: LucideIcon;
}

interface CategoryPillsProps {
  categories: CategoryPill[];
  selected: string;
  onSelect: (name: string) => void;
}

export function CategoryPills({ categories, selected, onSelect }: CategoryPillsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 200, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors hidden sm:flex"
        aria-label="Scroll categories left"
      >
        <ChevronLeft className="w-4 h-4 text-gray-500" />
      </button>
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-none py-2 px-0 sm:px-10"
      >
        {categories.map((cat, i) => {
          const isAll = cat.name === "All";
          const isSelected = selected === cat.name;
          return (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => onSelect(cat.name)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                isSelected
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
              }`}
              aria-pressed={isSelected}
            >
              {!isAll && <cat.icon className="w-4 h-4" />}
              <span>{cat.name}</span>
              <span className={`text-xs ${isSelected ? "text-blue-200" : "text-gray-400"}`}>
                {cat.count}
              </span>
            </motion.button>
          );
        })}
      </div>
      <button
        onClick={() => scroll(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors hidden sm:flex"
        aria-label="Scroll categories right"
      >
        <ChevronRight className="w-4 h-4 text-gray-500" />
      </button>
    </div>
  );
}
