"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { BookCard } from "@/components/books/BookCard";
import { useWishlistContext } from "@/components/wishlist/WishlistContext";
import { bookDatabase } from "@/data/books";

export default function WishlistPage() {
  const { wishlist } = useWishlistContext();

  useEffect(() => { document.title = "Wishlist — BookHaven"; }, []);

  const books = wishlist.map((id) => bookDatabase[id]).filter(Boolean);

  return (
    <main className="pt-28 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
            <Heart className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Wishlist</h1>
            <p className="text-sm text-gray-500">{wishlist.length} book{wishlist.length !== 1 ? "s" : ""} saved</p>
          </div>
        </div>

        {books.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <Heart className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Save books you love to your wishlist and find them here.</p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors"
            >
              Browse Books <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
            {books.map((book, i) => (
              <BookCard key={book.id} book={book} index={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
