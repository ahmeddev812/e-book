"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartContext } from "@/components/layout/CartContext";
import { BookCard } from "@/components/books/BookCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { createSlug } from "@/lib/slug";
import type { Book } from "@/types";

interface BookDetailsClientProps {
  book: Book;
  relatedBooks: Book[];
}

export function BookDetailsClient({ book, relatedBooks }: BookDetailsClientProps) {
  const { addToCart } = useCartContext();

  useEffect(() => {
    document.title = `${book.title} - BookHaven`;
    window.scrollTo(0, 0);
  }, [book.title]);

  const rating = parseFloat(book.rating);
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const priceCents = Math.round(parseFloat(book.price) * 100);

  const handleAddToCart = () => {
    addToCart(book.id, book.title, priceCents, book.image, book.author);
    const msg = document.createElement("div");
    msg.className = "fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
    msg.innerHTML = `<div class="flex items-center"><i class="ri-checkbox-circle-fill mr-2"></i><span>${book.title} added to cart!</span></div>`;
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
  };

  return (
    <main className="pt-28 pb-12">
      <Breadcrumb label={book.category} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-1/3">
            <div className="relative w-full h-64 sm:h-80 md:h-96 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={book.image}
                alt={book.title}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
                unoptimized
              />
            </div>
          </div>
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-gray-600 text-lg mb-4">by {book.author}</p>
            <p className="text-sm text-gray-500 mb-4">
              Category: <span className="text-primary font-medium">{book.category}</span>
            </p>
            <div className="star-rating mb-4">
              {Array.from({ length: fullStars }).map((_, i) => (
                <i key={i} className="ri-star-fill text-yellow-400 text-lg"></i>
              ))}
              {hasHalf && <i className="ri-star-half-fill text-yellow-400 text-lg"></i>}
              {Array.from({ length: 5 - fullStars - (hasHalf ? 1 : 0) }).map((_, i) => (
                <i key={i} className="ri-star-line text-gray-300 text-lg"></i>
              ))}
              <span className="text-gray-600 text-sm ml-2">({book.reviews} reviews)</span>
            </div>
            <p className="text-3xl font-bold text-primary mb-6">${book.price}</p>
            {book.originalPrice && (
              <p className="text-sm text-gray-500 mb-6">
                <span className="line-through mr-2">${book.originalPrice}</span>
                <span className="text-green-600 font-medium">
                  {Math.round((1 - parseFloat(book.price) / parseFloat(book.originalPrice)) * 100)}% OFF
                </span>
              </p>
            )}
            <p className="text-gray-700 mb-6 leading-relaxed">{book.description}</p>
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-1"><strong>ISBN:</strong> {book.isbn}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Publisher:</strong> {book.publisher}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Pages:</strong> {book.pages}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Language:</strong> {book.language}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Format:</strong> {book.format}</p>
              <p className="text-sm text-gray-600"><strong>Published:</strong> {book.published}</p>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-button font-medium inline-flex items-center"
            >
              <i className="ri-shopping-cart-line mr-2"></i>
              Add to Cart
            </button>
          </div>
        </div>

        {relatedBooks.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Related Books</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedBooks.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
