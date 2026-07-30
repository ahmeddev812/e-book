"use client";

export const dynamic = "force-dynamic";

import { Suspense, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { BookGrid } from "@/components/books/BookGrid";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { bookDatabase } from "@/data/books";
import { searchBooks } from "@/lib/search";

const allBooks = Object.values(bookDatabase);
const categories = ["All", ...new Set(allBooks.map((b) => b.category))];

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [selectedSort, setSelectedSort] = useState("Relevance");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(100);

  useEffect(() => {
    document.title = query ? `Search: ${query} - BookHaven` : "Search Books - BookHaven";
  }, [query]);

  const results = useMemo(() => {
    let books = query ? searchBooks(query) : allBooks;

    if (selectedCategory !== "All") {
      books = books.filter((b) => b.category === selectedCategory);
    }

    books = books.filter((b) => parseFloat(b.price) <= priceRange);

    switch (selectedSort) {
      case "Price Low-High": books.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)); break;
      case "Price High-Low": books.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)); break;
      case "Rating": books.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)); break;
      default: break;
    }

    return books;
  }, [query, selectedCategory, selectedSort, priceRange]);

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {query ? `Search results for "${query}"` : "Browse All Books"}
        </h1>
        <p className="text-sm text-gray-500">{results.length} books found</p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block lg:w-1/4">
            <div className="bg-white rounded shadow-sm p-5 lg:sticky lg:top-28 space-y-5">
              <div>
                <h3 className="font-medium mb-3">Category</h3>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded text-sm p-2"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <input
                  type="range" min="0" max="100" value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>$0</span><span>${priceRange}</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-3">Sort By</h3>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="w-full border border-gray-300 rounded text-sm p-2"
                >
                  <option value="Relevance">Relevance</option>
                  <option value="Price Low-High">Price Low-High</option>
                  <option value="Price High-Low">Price High-Low</option>
                  <option value="Rating">Rating</option>
                </select>
              </div>
            </div>
          </aside>

          <div className="lg:w-3/4">
            {results.length === 0 ? (
              <div className="text-center py-16">
                <i className="ri-search-line text-6xl text-gray-300 mb-4"></i>
                <h2 className="text-xl font-bold text-gray-800 mb-2">No books found</h2>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <BookGrid books={results} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default function SearchPage() {
  return (
    <main className="pt-28 pb-12">
      <Breadcrumb label="Search" />
      <Suspense fallback={<div className="text-center py-16"><p>Loading search...</p></div>}>
        <SearchContent />
      </Suspense>
    </main>
  );
}
