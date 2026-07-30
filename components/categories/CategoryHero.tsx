"use client";

import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { useState } from "react";

interface CategoryHeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  totalCategories: number;
}

export function CategoryHero({ searchQuery, onSearchChange, totalCategories }: CategoryHeroProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#7C3AED]">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-[120px] opacity-20"
        aria-hidden="true"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[#7C3AED] rounded-full blur-[100px] opacity-20"
        aria-hidden="true"
      />

      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-12 h-16 bg-white/10 rounded-lg backdrop-blur-sm"
          style={{ left: `${10 + Math.random() * 80}%`, top: `${10 + Math.random() * 80}%`, transform: `rotate(${Math.random() * 60 - 30}deg)` }}
          animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
          aria-hidden="true"
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">{totalCategories} Categories to Explore</span>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
            Discover Your
            <span className="block text-white/90">Next Favorite Book</span>
          </h1>

          <p className="text-white/80 mt-4 max-w-xl mx-auto text-base sm:text-lg">
            Explore curated collections across every genre. Find your next read from thousands of premium eBooks.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 max-w-xl mx-auto"
          >
            <div className={`relative transition-all duration-300 ${isFocused ? "scale-[1.02]" : "scale-100"}`}>
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${isFocused ? "text-[#2563EB]" : "text-white/60"}`} />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 rounded-2xl border border-white/20 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
                aria-label="Search categories"
              />
              <kbd className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 text-xs bg-white/10 rounded text-white/60 hidden sm:block" aria-hidden="true">
                ⌘K
              </kbd>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
