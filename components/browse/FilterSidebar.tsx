"use client";

import { X } from "lucide-react";

interface FilterSidebarProps {
  priceMax: number;
  setPriceMax: (v: number) => void;
  minRating: number;
  setMinRating: (v: number) => void;
  hasActiveFilters: boolean;
  clearFilters: () => void;
  maxPrice: number;
}

export function FilterSidebar({
  priceMax, setPriceMax, minRating, setMinRating, hasActiveFilters, clearFilters, maxPrice,
}: FilterSidebarProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 text-sm">Filters</h3>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
            <X className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-3 block">Max Price: ${priceMax}</label>
        <input
          type="range" min="0" max={maxPrice} value={priceMax}
          onChange={(e) => setPriceMax(parseInt(e.target.value))}
          className="w-full accent-blue-600"
          aria-label="Maximum price"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1"><span>$0</span><span>${maxPrice}</span></div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-3 block">Minimum Rating</label>
        <div className="space-y-2.5">
          {[
            { value: 0, label: "Any Rating" },
            { value: 4, label: "4+ Stars" },
            { value: 3, label: "3+ Stars" },
            { value: 2, label: "2+ Stars" },
          ].map((r) => (
            <label key={r.value} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="radio" name="rating"
                checked={minRating === r.value}
                onChange={() => setMinRating(r.value)}
                className="accent-blue-600 w-4 h-4"
              />
              <span className="text-sm text-gray-600">{r.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MobileFilters({
  priceMax, setPriceMax, minRating, setMinRating, hasActiveFilters, clearFilters, open, onClose, maxPrice,
}: FilterSidebarProps & { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Filters</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors" aria-label="Close filters">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">Max Price: ${priceMax}</label>
            <input type="range" min="0" max={maxPrice} value={priceMax} onChange={(e) => setPriceMax(parseInt(e.target.value))} className="w-full accent-blue-600" aria-label="Maximum price" />
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>$0</span><span>${maxPrice}</span></div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">Minimum Rating</label>
            <div className="space-y-2.5">
              {[
                { value: 0, label: "Any Rating" },
                { value: 4, label: "4+ Stars" },
                { value: 3, label: "3+ Stars" },
                { value: 2, label: "2+ Stars" },
              ].map((r) => (
                <label key={r.value} className="flex items-center gap-2.5 cursor-pointer">
                  <input type="radio" name="rating-mobile" checked={minRating === r.value} onChange={() => setMinRating(r.value)} className="accent-blue-600 w-4 h-4" />
                  <span className="text-sm text-gray-600">{r.label}</span>
                </label>
              ))}
            </div>
          </div>
          {hasActiveFilters && (
            <button onClick={() => { clearFilters(); onClose(); }} className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors">
              Clear All Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
