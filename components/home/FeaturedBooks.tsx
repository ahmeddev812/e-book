"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Heart, ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useCartContext } from "@/components/layout/CartContext";
import { useWishlistContext } from "@/components/wishlist/WishlistContext";
import { bookDatabase } from "@/data/books";
import type { Book } from "@/types";

interface FeaturedBooksProps {
  title: string;
  viewAllHref: string;
  bookIds: string[];
  variant?: "carousel" | "grid";
  showBadge?: boolean;
}

export function FeaturedBooks({ title, viewAllHref, bookIds, variant = "carousel", showBadge }: FeaturedBooksProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCartContext();
  const { isInWishlist, toggleWishlist } = useWishlistContext();

  const books = bookIds.map((id) => bookDatabase[id]).filter(Boolean);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
    }
  };

  const handleAddToCart = (book: Book, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book.id, book.title, Math.round(parseFloat(book.price) * 100), book.image, book.author);
  };

  const renderStars = (rating: string) => {
    const num = Math.round(parseFloat(rating));
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${i < num ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
          />
        ))}
      </div>
    );
  };

  const renderBook = (book: Book) => (
    <div
      key={book.id}
      className="group relative flex-shrink-0 w-[200px]"
    >
      <Link href={`/books/${encodeURIComponent(book.title.toLowerCase().replace(/\s+/g, "-"))}`} className="block">
        <div className="relative rounded-xl overflow-hidden bg-gray-100 mb-3 aspect-[3/4] shadow-sm group-hover:shadow-lg transition-all duration-500 group-hover:-translate-y-1">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <button
            onClick={(e) => toggleWishlist(book.id)}
              aria-label={isInWishlist(book.id) ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
          >
            <Heart
              className={`w-4 h-4 ${isInWishlist(book.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
            />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={(e) => handleAddToCart(book, e)}
              className="w-full py-2 bg-white text-gray-900 rounded-lg text-xs font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Quick Add
            </button>
          </div>
          {showBadge && (
            <div className="absolute top-3 left-3 px-2 py-1 bg-orange-500 text-white text-[10px] font-bold rounded-md uppercase tracking-wide">
              Bestseller
            </div>
          )}
        </div>
        <h3 className="font-semibold text-sm text-gray-900 truncate group-hover:text-blue-600 transition-colors">
          {book.title}
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">{book.author}</p>
        <div className="flex items-center justify-between mt-2">
          {renderStars(book.rating)}
          <span className="font-bold text-sm text-gray-900">${parseFloat(book.price).toFixed(2)}</span>
        </div>
      </Link>
    </div>
  );

  if (variant === "grid") {
    return (
      <section ref={ref} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{title}</h2>
            </div>
            <Link
              href={viewAllHref}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              View All &rarr;
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {books.map((book, i) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                {renderBook(book)}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="py-16 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{title}</h2>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={viewAllHref}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors mr-2"
            >
              View All
            </Link>
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ArrowRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </motion.div>
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {books.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              {renderBook(book)}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
