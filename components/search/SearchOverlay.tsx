"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { searchBooks } from "@/lib/search";
import { createSlug } from "@/lib/slug";

interface SearchOverlayProps {
  query: string;
  onClose: () => void;
}

export function SearchOverlay({ query, onClose }: SearchOverlayProps) {
  const router = useRouter();
  const [results, setResults] = useState<ReturnType<typeof searchBooks>>([]);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setResults(searchBooks(query).slice(0, 5));
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  const handleViewAll = useCallback(() => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
    onClose();
  }, [query, router, onClose]);

  if (!query.trim() || results.length === 0) return null;

  return (
    <div ref={overlayRef} className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
      <div className="p-2">
        {results.map((book) => {
          const slug = createSlug(book.title);
          return (
            <Link
              key={book.id}
              href={`/books/${slug}`}
              onClick={onClose}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded transition-colors"
            >
              <div className="relative w-10 h-14 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                <Image src={book.image} alt={book.title} fill className="object-cover" sizes="40px" unoptimized />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{book.title}</p>
                <p className="text-xs text-gray-500">{book.author}</p>
              </div>
              <span className="text-sm font-bold text-primary">${book.price}</span>
            </Link>
          );
        })}
      </div>
      <button
        onClick={handleViewAll}
        className="w-full text-center text-sm font-medium text-primary py-3 border-t border-gray-100 hover:bg-gray-50"
      >
        View all results ({searchBooks(query).length} books)
      </button>
    </div>
  );
}
