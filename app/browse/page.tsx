"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { BookCard } from "@/components/books/BookCard";
import { Pagination } from "@/components/filters/Pagination";
import { CategoryPills } from "@/components/browse/CategoryPills";
import { FilterSidebar, MobileFilters } from "@/components/browse/FilterSidebar";
import { bookDatabase } from "@/data/books";
import {
  BookOpen, Globe, FlaskConical, History, Monitor, Heart, Sparkles, User, GraduationCap, Quote, Search as SearchIcon,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, typeof BookOpen> = {
  Fiction: BookOpen, "Non-Fiction": Globe, Science: FlaskConical, History,
  Technology: Monitor, Romance: Heart, Mystery: SearchIcon, "Self-Help": Sparkles,
  Biography: User, Academic: GraduationCap, Poetry: Quote, Fantasy: BookOpen,
  "Mystery/Thriller": SearchIcon, "Historical Fiction": History, "Science Fiction": FlaskConical,
  "Contemporary Fiction": BookOpen, "Literary Fiction": BookOpen, Classic: Quote, Thriller: SearchIcon,
};

const SORT_OPTIONS = ["Newest", "Price Low-High", "Price High-Low", "Rating"];
const ITEMS_PER_PAGE = 12;
const DEBOUNCE_MS = 300;

export default function BrowsePage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [priceMax, setPriceMax] = useState(100);
  const [minRating, setMinRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => { setMounted(true); document.title = "Browse Books — BookHaven"; }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => { setCurrentPage(1); }, [debouncedSearch, selectedCategory, sortBy, priceMax, minRating]);

  const allBooks = useMemo(() => Object.values(bookDatabase).filter(Boolean), []);
  const maxBookPrice = useMemo(
    () => Math.ceil(Math.max(...allBooks.map((b) => parseFloat(b.price)), 0)),
    [allBooks]
  );

  useEffect(() => { setPriceMax(maxBookPrice); }, [maxBookPrice]);

  const categoryPills = useMemo(() => {
    const counts: Record<string, number> = {};
    allBooks.forEach((b) => {
      counts[b.category] = (counts[b.category] || 0) + 1;
    });
    return [
      { name: "All", count: allBooks.length, icon: BookOpen },
      ...Object.entries(counts)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([name, count]) => ({
          name,
          count,
          icon: CATEGORY_ICONS[name] || BookOpen,
        })),
    ];
  }, [allBooks]);

  const filtered = useMemo(() => {
    let list = [...allBooks];
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q)
      );
    }
    if (selectedCategory !== "All") {
      list = list.filter((b) => b.category === selectedCategory);
    }
    list = list.filter((b) => parseFloat(b.price) <= priceMax);
    if (minRating > 0) list = list.filter((b) => parseFloat(b.rating) >= minRating);
    switch (sortBy) {
      case "Price Low-High": list.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)); break;
      case "Price High-Low": list.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)); break;
      case "Rating": list.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)); break;
      default: list.sort((a, b) => parseInt(b.published) - parseInt(a.published)); break;
    }
    return list;
  }, [allBooks, debouncedSearch, selectedCategory, sortBy, priceMax, minRating]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const hasActiveFilters = !!(debouncedSearch || selectedCategory !== "All" || priceMax < maxBookPrice || minRating > 0);

  const clearFilters = useCallback(() => {
    setSearchQuery(""); setDebouncedSearch(""); setSelectedCategory("All");
    setSortBy("Newest"); setPriceMax(maxBookPrice); setMinRating(0); setCurrentPage(1);
  }, [maxBookPrice]);

  const handleCategorySelect = useCallback((name: string) => {
    setSelectedCategory(name);
    setCurrentPage(1);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-gray-600">Home</Link><span>/</span>
            <span className="text-gray-900 font-medium">Browse</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Browse Our Library</h1>
          <p className="text-gray-500 mt-1.5">{allBooks.length} premium titles across multiple genres</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, author, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              aria-label="Search books"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" aria-label="Clear search">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Pills */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
          <CategoryPills categories={categoryPills} selected={selectedCategory} onSelect={handleCategorySelect} />
        </motion.div>

        {/* Filter & Sort Bar */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <p className="text-sm text-gray-500">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            {hasActiveFilters && (
              <button onClick={clearFilters} className="ml-2 text-blue-600 hover:text-blue-700 font-medium text-xs">Clear filters</button>
            )}
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-full sm:w-44 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer"
                aria-label="Sort by"
              >
                {SORT_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
              aria-label="Open filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28">
              <FilterSidebar
                priceMax={priceMax} setPriceMax={setPriceMax}
                minRating={minRating} setMinRating={setMinRating}
                hasActiveFilters={hasActiveFilters} clearFilters={clearFilters}
                maxPrice={maxBookPrice}
              />
            </div>
          </aside>

          {/* Books Grid */}
          <div className="flex-1 min-w-0">
            {paginated.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <SearchIcon className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">No books found</h3>
                <p className="text-sm text-gray-500 mb-4">Try adjusting your search or filters</p>
                <button onClick={clearFilters} className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">Clear Filters</button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                  {paginated.map((book, i) => (
                    <BookCard key={book.id} book={book} index={i} />
                  ))}
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <MobileFilters
        priceMax={priceMax} setPriceMax={setPriceMax}
        minRating={minRating} setMinRating={setMinRating}
        hasActiveFilters={hasActiveFilters} clearFilters={clearFilters}
        open={showMobileFilters} onClose={() => setShowMobileFilters(false)}
        maxPrice={maxBookPrice}
      />
    </main>
  );
}
