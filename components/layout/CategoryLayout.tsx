"use client";

import { useState, useEffect, useMemo } from "react";
import { bookDatabase } from "@/data/books";
import type { Book } from "@/types";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SortDropdown } from "@/components/filters/SortDropdown";
import { FilterSidebar } from "@/components/filters/FilterSidebar";
import { BookGrid } from "@/components/books/BookGrid";
import { Pagination } from "@/components/filters/Pagination";

interface CategoryLayoutProps {
  title: string;
  description: string;
  breadcrumb: string;
  bookIds: string[];
}

const PAGE_SIZE = 8;

export function CategoryLayout({
  title,
  description,
  breadcrumb,
  bookIds,
}: CategoryLayoutProps) {
  const [selectedSort, setSelectedSort] = useState("Bestselling");
  const [priceRange, setPriceRange] = useState(60);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [applied, setApplied] = useState(false);

  const books = useMemo(() => bookIds.map((id) => bookDatabase[id]).filter(Boolean), [bookIds]);

  const availableThemes = useMemo(() => {
    const themeSet = new Set<string>();
    books.forEach((b) => b.themes?.forEach((t) => themeSet.add(t)));
    return Array.from(themeSet).sort();
  }, [books]);

  const availableAuthors = useMemo(() => {
    const authorSet = new Set<string>();
    books.forEach((b) => authorSet.add(b.author));
    return Array.from(authorSet).sort();
  }, [books]);

  const sortBooks = (list: Book[], sortKey: string): Book[] => {
    const sorted = [...list];
    switch (sortKey) {
      case "Price Low-High":
        sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "Price High-Low":
        sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "Customer Rating":
        sorted.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      case "New Arrivals":
        sorted.sort((a, b) => parseInt(b.published) - parseInt(a.published));
        break;
      default:
        break;
    }
    return sorted;
  };

  const filteredBooks = useMemo(() => {
    let list = books;

    if (applied) {
      if (selectedThemes.length > 0) {
        list = list.filter(
          (b) => b.themes && b.themes.some((t) => selectedThemes.includes(t))
        );
      }
      if (selectedAuthors.length > 0) {
        list = list.filter((b) => selectedAuthors.includes(b.author));
      }
      list = list.filter((b) => parseFloat(b.price) <= priceRange);
    }

    list = sortBooks(list, selectedSort);

    return list;
  }, [books, selectedThemes, selectedAuthors, priceRange, selectedSort, applied]);

  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedBooks = filteredBooks.slice(
    (safeCurrentPage - 1) * PAGE_SIZE,
    safeCurrentPage * PAGE_SIZE
  );

  const handleThemeChange = (theme: string) => {
    setSelectedThemes((prev) =>
      prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme]
    );
  };

  const handleAuthorChange = (author: string) => {
    setSelectedAuthors((prev) =>
      prev.includes(author) ? prev.filter((a) => a !== author) : [...prev, author]
    );
  };

  const handleApply = () => {
    setApplied(true);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setSelectedThemes([]);
    setSelectedAuthors([]);
    setPriceRange(60);
    setApplied(false);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => { document.title = `${title} - BookHaven`; }, [title]);

  const startItem = filteredBooks.length === 0 ? 0 : (safeCurrentPage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(safeCurrentPage * PAGE_SIZE, filteredBooks.length);

  return (
    <main className="pt-28 pb-12">
      <Breadcrumb label={breadcrumb} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-gray-600 mb-1">{description}</p>
            <p className="text-sm text-gray-500">
              {filteredBooks.length > 0
                ? `Showing ${startItem}-${endItem} of ${filteredBooks.length} books`
                : "No books match your filters"}
            </p>
          </div>
          <SortDropdown selected={selectedSort} onSelect={setSelectedSort} />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block lg:w-1/4">
            <FilterSidebar
              themes={availableThemes}
              authors={availableAuthors}
              selectedThemes={selectedThemes}
              selectedAuthors={selectedAuthors}
              priceRange={priceRange}
              onThemeChange={handleThemeChange}
              onAuthorChange={handleAuthorChange}
              onPriceRangeChange={setPriceRange}
              onApply={handleApply}
              onClear={handleClear}
            />
          </div>
          <div className="lg:w-3/4">
            <BookGrid books={paginatedBooks} />
            <Pagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

    </main>
  );
}
