"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { bookDatabase } from "@/data/books";

const books = [bookDatabase.best1, bookDatabase.new1, bookDatabase.fic001].filter(Boolean);

export function ReadingExperience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const laptopY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const tabletY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -110]);

  return (
    <section ref={ref} className="py-20 bg-gray-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Read Anywhere, Anytime
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Seamless experience across all your devices
          </p>
        </div>

        <div className="relative flex flex-col items-center min-h-[500px] sm:min-h-[600px]">
          <motion.div
            style={{ y: laptopY }}
            className="relative z-10 w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white"
          >
            <div className="bg-gray-100 px-4 py-2.5 flex items-center gap-1.5 border-b border-gray-200">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="ml-4 text-xs text-gray-400 font-medium">BookHaven Reader</div>
            </div>
            <div className="aspect-[16/10] bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-6">
              {books[0] && (
                <div className="flex gap-6 items-center">
                  <img
                    src={books[0].image}
                    alt="Book preview"
                    className="h-48 sm:h-56 rounded-lg shadow-md object-cover"
                  />
                  <div className="hidden sm:block max-w-xs">
                    <h3 className="font-bold text-gray-900 text-lg">{books[0].title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{books[0].author}</p>
                    <div className="mt-3 flex items-center gap-1 text-yellow-400 text-sm">
                      {"★".repeat(Math.round(parseFloat(books[0].rating)))}
                      <span className="text-gray-400 ml-1">({books[0].reviews} reviews)</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-3 line-clamp-3">{books[0].description}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            style={{ y: tabletY }}
            className="relative z-20 -mt-20 sm:-mt-32 -mr-[40%] sm:-mr-[30%] self-end rounded-xl overflow-hidden shadow-xl border border-gray-200 bg-white"
          >
            <div className="aspect-[4/3] w-40 sm:w-56 bg-gradient-to-tr from-purple-50 to-blue-50 flex items-center justify-center p-3">
              {books[1] && (
                <img src={books[1].image} alt="Book preview" className="h-full object-cover rounded shadow-sm" />
              )}
            </div>
          </motion.div>

          <motion.div
            style={{ y: phoneY }}
            className="relative z-30 -mt-12 sm:-mt-20 -ml-[30%] sm:-ml-[20%] self-start rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white"
          >
            <div className="aspect-[9/16] w-24 sm:w-32 bg-gradient-to-bl from-blue-50 to-indigo-50 flex items-center justify-center p-2">
              {books[2] && (
                <img src={books[2].image} alt="Book preview" className="h-full object-cover rounded shadow-sm" />
              )}
            </div>
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 via-purple-200/20 to-indigo-200/20 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </section>
  );
}
