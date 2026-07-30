"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { User, Sparkles, ArrowRight } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import type { PersonalizedCategoriesProps, Category } from "@/types/category";

export function PersonalizedCategories({ categories, isLoading = false }: PersonalizedCategoriesProps) {
  const { isSignedIn } = useUser();

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!isSignedIn) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-md mx-auto"
          >
            <div className="w-16 h-16 bg-[#2563EB]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-[#2563EB]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Personalized Recommendations</h3>
            <p className="text-gray-500 text-sm mb-6">
              Sign in to get category recommendations based on your reading history
            </p>
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-2 bg-[#2563EB] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#1D4ED8] transition-colors"
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[#2563EB]" />
              Recommended for You
            </h2>
            <p className="text-gray-500 text-sm mt-1">Based on your reading history</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(categories as Category[]).slice(0, 4).map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -2 }}
            >
              <Link href={category.href}>
                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <category.icon className="w-5 h-5 text-[#2563EB] mb-2" />
                      <h3 className="font-semibold text-gray-900 text-sm">{category.name}</h3>
                      <p className="text-gray-500 text-xs mt-1">{category.count} titles</p>
                    </div>
                    <div className="px-2 py-1 bg-[#2563EB]/10 rounded-full">
                      <span className="text-xs font-medium text-[#2563EB]">92%</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Based on your interest in similar genres</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
