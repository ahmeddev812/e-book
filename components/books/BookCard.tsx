"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Heart, Plus, Star } from "lucide-react";
import { useCartContext } from "@/components/layout/CartContext";
import { useWishlistContext } from "@/components/wishlist/WishlistContext";
import type { Book } from "@/types";

interface BookCardProps {
  book: Book;
  index?: number;
}

export function BookCard({ book, index = 0 }: BookCardProps) {
  const { addToCart } = useCartContext();
  const { isInWishlist, toggleWishlist } = useWishlistContext();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book.id, book.title, Math.round(parseFloat(book.price) * 100), book.image, book.author);
  };

  const slug = encodeURIComponent(book.title.toLowerCase().replace(/\s+/g, "-"));

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.4 }}
    >
      <Link href={`/books/${slug}`} className="group block">
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 mb-3 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:-translate-y-0.5">
          <Image
            src={book.image}
            alt={book.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist(book.id); }}
            aria-label={isInWishlist(book.id) ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10"
          >
            <Heart className={`w-4 h-4 ${isInWishlist(book.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
            <button
              onClick={handleAdd}
              className="w-full py-2 bg-white text-gray-900 rounded-lg text-xs font-semibold hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add to Cart
            </button>
          </div>
          {parseFloat(book.rating) >= 4.5 && (
            <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-orange-500 text-white text-[10px] font-bold rounded-md z-10">
              Bestseller
            </div>
          )}
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded inline-block">
            {book.category}
          </span>
          <h3 className="font-semibold text-sm text-gray-900 truncate group-hover:text-blue-600 transition-colors">
            {book.title}
          </h3>
          <p className="text-xs text-gray-500 truncate">{book.author}</p>
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, si) => (
                <Star
                  key={si}
                  className={`w-3 h-3 ${si < Math.round(parseFloat(book.rating)) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                />
              ))}
            </div>
            <span className="text-[10px] text-gray-400">({book.reviews})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-gray-900">${parseFloat(book.price).toFixed(2)}</span>
            {book.originalPrice && (
              <span className="text-xs text-gray-400 line-through">${parseFloat(book.originalPrice).toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
