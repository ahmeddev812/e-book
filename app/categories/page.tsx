"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  BookOpen, Globe, FlaskConical, History, Monitor, Heart,
  Search as SearchIcon, GraduationCap, User, Quote, Sparkles,
} from "lucide-react";
import { CategoryHero } from "@/components/categories/CategoryHero";
import { CategoryCarousel } from "@/components/categories/CategoryCarousel";
import { CategoryCardPremium } from "@/components/categories/CategoryCardPremium";
import { TrendingCategories } from "@/components/categories/TrendingCategories";
import { PersonalizedCategories } from "@/components/categories/PersonalizedCategories";
import { CategorySpotlight } from "@/components/categories/CategorySpotlight";
import { bookDatabase } from "@/data/books";
import type { Category } from "@/types/category";

const categoriesData: Category[] = [
  { id: "fiction", name: "Fiction", icon: BookOpen, href: "/search?q=Fiction", count: 12, gradient: "from-blue-500 to-indigo-600", desc: "Novels, stories, and imaginative worlds", image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=600&h=400&fit=crop", bookIds: ["new1", "best1", "fic001", "fic002", "fic003"], trending: true, featured: true, color: "#3B82F6", lightBg: "bg-blue-50", textColor: "text-blue-600" },
  { id: "non-fiction", name: "Non-Fiction", icon: Globe, href: "/search?q=Non-Fiction", count: 12, gradient: "from-emerald-500 to-teal-600", desc: "Real stories, facts, and knowledge", image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=600&h=400&fit=crop", bookIds: ["new7", "new5", "best4", "best3"], trending: true, featured: false, color: "#10B981", lightBg: "bg-emerald-50", textColor: "text-emerald-600" },
  { id: "science", name: "Science", icon: FlaskConical, href: "/search?q=Science", count: 12, gradient: "from-cyan-500 to-blue-600", desc: "Discover the universe through science", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop", bookIds: ["new4", "fic007", "fic008"], trending: false, featured: false, color: "#06B6D4", lightBg: "bg-cyan-50", textColor: "text-cyan-600" },
  { id: "history", name: "History", icon: History, href: "/search?q=History", count: 12, gradient: "from-amber-500 to-orange-600", desc: "Learn from the past", image: "https://images.unsplash.com/photo-1461360370896-922624d12aa4?w=600&h=400&fit=crop", bookIds: ["new3", "best5"], trending: true, featured: false, color: "#F59E0B", lightBg: "bg-amber-50", textColor: "text-amber-600" },
  { id: "technology", name: "Technology", icon: Monitor, href: "/search?q=Technology", count: 8, gradient: "from-slate-600 to-gray-700", desc: "Innovation and digital age", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop", bookIds: ["new4", "fic007"], trending: false, featured: false, color: "#475569", lightBg: "bg-slate-50", textColor: "text-slate-600" },
  { id: "romance", name: "Romance", icon: Heart, href: "/search?q=Romance", count: 10, gradient: "from-pink-500 to-rose-600", desc: "Love stories that touch the heart", image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&h=400&fit=crop", bookIds: ["best8", "fic010"], trending: false, featured: false, color: "#EC4899", lightBg: "bg-pink-50", textColor: "text-pink-600" },
  { id: "mystery", name: "Mystery", icon: SearchIcon, href: "/search?q=Mystery", count: 9, gradient: "from-red-500 to-rose-600", desc: "Thrills, suspense, and puzzles", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop", bookIds: ["new2", "best2", "best3", "best6"], trending: true, featured: false, color: "#EF4444", lightBg: "bg-red-50", textColor: "text-red-600" },
  { id: "self-improvement", name: "Self-Improvement", icon: Sparkles, href: "/search?q=Self-Improvement", count: 7, gradient: "from-violet-500 to-purple-600", desc: "Become your best self", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=400&fit=crop", bookIds: ["new5", "best4"], trending: false, featured: true, color: "#8B5CF6", lightBg: "bg-violet-50", textColor: "text-violet-600" },
  { id: "biography", name: "Biography", icon: User, href: "/search?q=Biography", count: 12, gradient: "from-amber-500 to-yellow-600", desc: "Extraordinary life stories", image: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=600&h=400&fit=crop", bookIds: ["new7"], trending: false, featured: false, color: "#F59E0B", lightBg: "bg-amber-50", textColor: "text-amber-600" },
  { id: "academic", name: "Academic", icon: GraduationCap, href: "/search?q=Academic", count: 12, gradient: "from-purple-500 to-indigo-600", desc: "Textbooks and scholarly works", image: "https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=600&h=400&fit=crop", bookIds: ["fic007", "fic008", "fic009"], trending: false, featured: false, color: "#8B5CF6", lightBg: "bg-purple-50", textColor: "text-purple-600" },
  { id: "poetry", name: "Poetry", icon: Quote, href: "/search?q=Poetry", count: 12, gradient: "from-pink-500 to-fuchsia-600", desc: "Verse and lyrical beauty", image: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=600&h=400&fit=crop", bookIds: ["fic010", "fic009"], trending: false, featured: false, color: "#EC4899", lightBg: "bg-pink-50", textColor: "text-pink-600" },
  { id: "childrens", name: "Children's", icon: BookOpen, href: "/search?q=Children", count: 12, gradient: "from-yellow-400 to-orange-500", desc: "Books for young minds", image: "https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?w=600&h=400&fit=crop", bookIds: ["new6", "fic001", "fic004"], trending: false, featured: false, color: "#FBBF24", lightBg: "bg-yellow-50", textColor: "text-yellow-600" },
];

export default function CategoriesPage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => { setMounted(true); document.title = "Discover Categories — BookHaven"; }, []);

  const filtered = useMemo(
    () => categoriesData.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery]
  );

  const getMiniCovers = (bookIds: string[]) =>
    bookIds.map((id) => bookDatabase[id]?.image).filter(Boolean) as string[];

  const trendingCategories = useMemo(() => categoriesData.filter((c) => c.trending), []);
  const spotlightCategory = useMemo(() => categoriesData.find((c) => c.featured) || categoriesData[0], []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin" role="status">
          <span className="sr-only">Loading categories...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <CategoryHero searchQuery={searchQuery} onSearchChange={setSearchQuery} totalCategories={categoriesData.length} />

      <div className="relative -mt-16 z-20">
        <CategoryCarousel categories={categoriesData.slice(0, 6)} autoRotate={false} />
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">All Categories</h2>
          <p className="text-gray-500 mt-1">
            {filtered.length} of {categoriesData.length} categories
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
          <p className="text-sm text-gray-400 mt-2">Click any category to explore books in that genre</p>
        </motion.div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
            <SearchIcon className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No categories found</h3>
            <p className="text-sm text-gray-500">Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((cat, i) => {
              const miniCovers = getMiniCovers(cat.bookIds);
              return (
                <CategoryCardPremium
                  key={cat.id}
                  name={cat.name}
                  desc={cat.desc}
                  href={cat.href}
                  count={cat.count}
                  gradient={cat.gradient}
                  icon={cat.icon}
                  image={cat.image}
                  miniCovers={miniCovers}
                  index={i}
                  isTrending={cat.trending}
                  isFeatured={cat.featured}
                />
              );
            })}
          </div>
        )}
      </section>

      <TrendingCategories categories={trendingCategories} />
      <PersonalizedCategories categories={categoriesData.slice(0, 4)} />
      <CategorySpotlight category={spotlightCategory} autoNavigate={false} />
    </main>
  );
}
