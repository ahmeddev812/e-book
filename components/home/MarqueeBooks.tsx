"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { bookDatabase } from "@/data/books";
import { createSlug } from "@/lib/slug";

interface MarqueeBooksProps {
  title: string;
  bookIds: string[];
  speed?: number;
}

export function MarqueeBooks({ title, bookIds, speed = 30 }: MarqueeBooksProps) {
  const books = bookIds.map((id) => bookDatabase[id]).filter(Boolean);
  const trackRef = useRef<HTMLDivElement>(null);

  if (books.length === 0) return null;

  return (
    <section className="py-14 sm:py-18 bg-gradient-to-b from-white to-gray-50/50" aria-labelledby={`marquee-title-${title.replace(/\s+/g, "-")}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-end justify-between">
          <div>
            <h2
              id={`marquee-title-${title.replace(/\s+/g, "-")}`}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900"
            >
              {title}
            </h2>
            <p className="text-sm text-gray-400 mt-1">Curated picks for you</p>
          </div>
          <Link
            href="/browse"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
          >
            View All
            <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="region" aria-label={`${title} carousel`}>
        <div
          className="overflow-hidden rounded-xl"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)",
          }}
        >
          <div
            ref={trackRef}
            className="flex gap-4 sm:gap-5 w-max"
            style={{
              animation: `marquee-scroll ${speed}s linear infinite`,
              willChange: "transform",
            }}
            onMouseEnter={() => {
              if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
            }}
            onMouseLeave={() => {
              if (trackRef.current) trackRef.current.style.animationPlayState = "running";
            }}
          >
            {[...books, ...books].map((book, i) => {
              const isDuplicate = i >= books.length;
              const realIndex = isDuplicate ? i - books.length : i;

              return (
                <Link
                  key={`${isDuplicate ? "dup" : "orig"}-${book.id}-${realIndex}`}
                  href={`/books/${createSlug(book.title)}`}
                  className="group flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl"
                  aria-label={`${book.title} by ${book.author}`}
                  tabIndex={0}
                >
                  <div className="relative w-28 sm:w-32 md:w-36 aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 shadow-sm group-hover:shadow-lg transition-all duration-500 group-hover:-translate-y-1.5 group-focus-visible:-translate-y-1.5">
                    <Image
                      src={book.image}
                      alt={isDuplicate ? "" : book.title}
                      width={144}
                      height={192}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading={realIndex < 4 ? "eager" : "lazy"}
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    <div className="absolute top-2 left-2 z-10">
                      {parseFloat(book.rating) >= 4.5 && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-500 text-white text-[10px] font-bold rounded-md shadow-sm">
                          <Star className="w-2.5 h-2.5 fill-white" /> Bestseller
                        </span>
                      )}
                    </div>
                    <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white">
                        <Heart className="w-3.5 h-3.5 text-gray-600 hover:text-red-500 transition-colors" />
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-400 z-10">
                      <span className="block w-full py-1.5 bg-white text-gray-900 rounded-lg text-[11px] font-semibold text-center shadow-md hover:bg-gray-100 transition-colors">
                        Quick Add
                      </span>
                    </div>
                  </div>
                  <div className="mt-2.5 px-0.5 w-28 sm:w-32 md:w-36">
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">{book.title}</p>
                    <p className="text-[11px] text-gray-400 truncate mt-0.5">{book.author}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, si) => (
                          <Star key={si} className={`w-2.5 h-2.5 ${si < Math.round(parseFloat(book.rating)) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`} />
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-400">({book.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-xs font-bold text-gray-900">${parseFloat(book.price).toFixed(2)}</span>
                      {book.originalPrice && <span className="text-[10px] text-gray-400 line-through">${parseFloat(book.originalPrice).toFixed(2)}</span>}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 text-center sm:hidden">
        <Link href="/browse" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group">
          View All
          <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
        </Link>
      </div>

      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </section>
  );
}
