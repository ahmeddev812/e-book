"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Flame, ArrowRight } from "lucide-react";
import type { TrendingCategoriesProps } from "@/types/category";

export function TrendingCategories({ categories }: TrendingCategoriesProps) {
  if (categories.length === 0) return null;

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Flame className="w-6 h-6 text-red-500" />
              Trending Now
            </h2>
            <p className="text-gray-500 text-sm mt-1">Most popular categories this week</p>
          </div>
          <Link href="/books" className="text-sm font-medium text-[#2563EB] hover:text-[#1D4ED8] inline-flex items-center gap-1 transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {categories.slice(0, 5).map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -2 }}
            >
              <Link href={category.href} aria-label={`${category.name} - ${category.count} books`}>
                <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${category.gradient} p-6 text-white`}>
                  <div className="relative z-10">
                    <category.icon className="w-6 h-6 opacity-80 mb-3" />
                    <h3 className="font-semibold text-sm">{category.name}</h3>
                    <p className="text-white/70 text-xs mt-1">{category.count} books</p>
                  </div>
                  <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full" aria-hidden="true" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
