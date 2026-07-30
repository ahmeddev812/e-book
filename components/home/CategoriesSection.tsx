"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Globe,
  Brain,
  FlaskConical,
  History,
  Monitor,
  Heart,
  Search,
} from "lucide-react";

const categories = [
  { name: "Fiction", icon: BookOpen, href: "/fiction", gradient: "from-blue-500 to-blue-600", lightBg: "bg-blue-50" },
  { name: "Non-Fiction", icon: Globe, href: "/non-fiction", gradient: "from-emerald-500 to-emerald-600", lightBg: "bg-emerald-50" },
  { name: "Self-Improvement", icon: Brain, href: "/non-fiction", gradient: "from-violet-500 to-violet-600", lightBg: "bg-violet-50" },
  { name: "Science", icon: FlaskConical, href: "/academic", gradient: "from-cyan-500 to-cyan-600", lightBg: "bg-cyan-50" },
  { name: "History", icon: History, href: "/biography", gradient: "from-amber-500 to-amber-600", lightBg: "bg-amber-50" },
  { name: "Technology", icon: Monitor, href: "/academic", gradient: "from-slate-600 to-slate-700", lightBg: "bg-slate-50" },
  { name: "Romance", icon: Heart, href: "/fiction", gradient: "from-pink-500 to-pink-600", lightBg: "bg-pink-50" },
  { name: "Mystery", icon: Search, href: "/fiction", gradient: "from-red-500 to-red-600", lightBg: "bg-red-50" },
];

export function CategoriesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Browse by Category</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Explore thousands of books across every genre imaginable
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link href={cat.href} className="group block">
                <div className={`relative overflow-hidden rounded-2xl ${cat.lightBg} p-6 sm:p-8 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl`}>
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/80 group-hover:bg-white/20 backdrop-blur-sm mb-4 transition-all duration-500">
                      <cat.icon className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors duration-500" />
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-white transition-colors duration-500">
                      {cat.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
