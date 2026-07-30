"use client";

import { useState } from "react";

interface FilterSidebarProps {
  themes: string[];
  authors: string[];
  selectedThemes: string[];
  selectedAuthors: string[];
  priceRange: number;
  onThemeChange: (theme: string) => void;
  onAuthorChange: (author: string) => void;
  onPriceRangeChange: (value: number) => void;
  onApply: () => void;
  onClear: () => void;
}

export function FilterSidebar({
  themes,
  authors,
  selectedThemes,
  selectedAuthors,
  priceRange,
  onThemeChange,
  onAuthorChange,
  onPriceRangeChange,
  onApply,
  onClear,
}: FilterSidebarProps) {
  const [authorSearch, setAuthorSearch] = useState("");
  const [showAllThemes, setShowAllThemes] = useState(false);

  const filteredAuthors = authors.filter((a) =>
    a.toLowerCase().includes(authorSearch.toLowerCase())
  );

  const displayedThemes = showAllThemes ? themes : themes.slice(0, 4);

  return (
    <div className="bg-white rounded shadow-sm p-5">
      <div className="mb-6">
        <h3 className="font-medium mb-3">Themes</h3>
        <div className="space-y-2">
          {displayedThemes.map((theme) => (
            <label key={theme} className="custom-checkbox flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedThemes.includes(theme)}
                onChange={() => onThemeChange(theme)}
                className="mr-2"
              />
              <span className="text-sm">{theme}</span>
            </label>
          ))}
        </div>
        {themes.length > 4 && (
          <button
            onClick={() => setShowAllThemes(!showAllThemes)}
            className="text-primary text-sm mt-2"
          >
            {showAllThemes ? "- Show less" : `+ ${themes.length - 4} more`}
          </button>
        )}
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-3">Price Range</h3>
        <div className="px-1">
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange}
            onChange={(e) => onPriceRangeChange(parseInt(e.target.value))}
            className="price-range-slider mb-3 w-full"
          />
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">$0</span>
            <span className="text-sm text-gray-600">${priceRange}</span>
          </div>
          <div className="flex items-center mt-3 gap-2">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                defaultValue="0"
                min="0"
                readOnly
                className="w-full pl-8 pr-2 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <span className="text-gray-400">to</span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={priceRange}
                min="0"
                readOnly
                className="w-full pl-8 pr-2 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-3">Author</h3>
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="Search authors..."
            value={authorSearch}
            onChange={(e) => setAuthorSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-sm"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <i className="ri-search-line"></i>
          </div>
        </div>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {filteredAuthors.map((author) => (
            <label key={author} className="custom-checkbox flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedAuthors.includes(author)}
                onChange={() => onAuthorChange(author)}
                className="mr-2"
              />
              <span className="text-sm">{author}</span>
            </label>
          ))}
          {filteredAuthors.length === 0 && (
            <p className="text-sm text-gray-400">No authors found</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-3">Customer Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="custom-radio flex items-center cursor-pointer">
              <input type="radio" name="rating" className="mr-2" />
              <div className="star-rating">
                {Array.from({ length: rating }).map((_, i) => (
                  <i key={i} className="ri-star-fill text-yellow-400 text-sm"></i>
                ))}
                {Array.from({ length: 5 - rating }).map((_, i) => (
                  <i key={i} className="ri-star-line text-gray-300 text-sm"></i>
                ))}
                <span className="text-gray-600 text-xs ml-1">& up</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={onApply}
        className="bg-primary text-white w-full px-4 py-2 rounded-button text-sm font-medium mb-2"
      >
        Apply Filters
      </button>
      <button
        onClick={onClear}
        className="bg-gray-100 hover:bg-gray-200 text-gray-800 w-full px-4 py-2 rounded-button text-sm font-medium"
      >
        Clear All Filters
      </button>
    </div>
  );
}
