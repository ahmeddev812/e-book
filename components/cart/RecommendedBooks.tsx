"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartContext } from "@/components/layout/CartContext";
import { bookDatabase, bestSellers } from "@/data/books";

export function RecommendedBooks() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { addToCart } = useCartContext();

  const books = bestSellers.slice(0, 6).map((id) => bookDatabase[id]).filter(Boolean);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
    }
  };

  const handleAdd = (book: typeof books[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book.id, book.title, Math.round(parseFloat(book.price) * 100), book.image, book.author);
  };

  return (
    <section ref={ref} className="mt-10">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">You might also like</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-500" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-3"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {books.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex-shrink-0 w-[160px] group"
            >
              <Link
                href={`/books/${encodeURIComponent(book.title.toLowerCase().replace(/\s+/g, "-"))}`}
                className="block"
              >
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 mb-2.5 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:-translate-y-0.5">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    className="object-cover"
                    sizes="160px"
                    unoptimized
                  />
                  <button
                    onClick={(e) => handleAdd(book, e)}
                    aria-label={`Add ${book.title} to cart`}
                    className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                  >
                    <Plus className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                  {book.title}
                </h3>
                <p className="text-xs text-gray-500 truncate">{book.author}</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star
                        key={si}
                        className={`w-3 h-3 ${si < Math.round(parseFloat(book.rating)) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">({book.reviews})</span>
                </div>
                <p className="text-sm font-bold text-gray-900 mt-1">${parseFloat(book.price).toFixed(2)}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
