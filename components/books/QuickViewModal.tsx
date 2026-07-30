"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartContext } from "@/components/layout/CartContext";
import { createSlug } from "@/lib/slug";
import type { Book } from "@/types";

interface QuickViewModalProps {
  book: Book;
  onClose: () => void;
}

export function QuickViewModal({ book, onClose }: QuickViewModalProps) {
  const { addToCart } = useCartContext();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const rating = parseFloat(book.rating);
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const priceCents = Math.round(parseFloat(book.price) * 100);
  const slug = createSlug(book.title);

  const handleAddToCart = () => {
    addToCart(book.id, book.title, priceCents, book.image, book.author);
    onClose();
  };

  return (
    <div
      className="quick-view-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold">Quick View</h3>
            <button onClick={onClose} aria-label="Close quick view" className="text-gray-500 hover:text-gray-700 text-2xl">
              <i className="ri-close-line"></i>
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden relative">
                <Image src={book.image} alt={book.title} fill className="object-cover" unoptimized />
              </div>
            </div>
            <div className="md:w-2/3">
              <h4 className="text-xl font-bold mb-2">{book.title}</h4>
              <p className="text-gray-600 mb-4">by {book.author}</p>
              <div className="star-rating mb-2">
                {Array.from({ length: fullStars }).map((_, i) => (
                  <i key={i} className="ri-star-fill text-yellow-400"></i>
                ))}
                {hasHalf && <i className="ri-star-half-fill text-yellow-400"></i>}
                {Array.from({ length: 5 - fullStars - (hasHalf ? 1 : 0) }).map((_, i) => (
                  <i key={i} className="ri-star-line text-gray-300"></i>
                ))}
                <span className="text-gray-600 text-sm ml-1">({book.rating})</span>
              </div>
              <p className="text-2xl font-bold text-primary mb-6">${book.price}</p>
              <div className="mb-6">
                <h5 className="font-bold mb-2">Description</h5>
                <p className="text-gray-700">{book.description}</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleAddToCart}
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-button font-medium flex items-center"
                >
                  <i className="ri-shopping-cart-line mr-2"></i>
                  Add to Cart
                </button>
                <Link
                  href={`/books/${slug}`}
                  className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-button font-medium flex items-center"
                >
                  <i className="ri-book-open-line mr-2"></i>
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
