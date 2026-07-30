"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import type { CategorySpotlightProps } from "@/types/category";

export function CategorySpotlight({ category, autoNavigate = false }: CategorySpotlightProps) {
  if (autoNavigate) {}
  if (!category) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#7C3AED]"
        >
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                    <Sparkles className="w-4 h-4" />
                    Category Spotlight
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold mb-3">Explore {category.name}</h2>
                  <p className="text-white/90 text-sm md:text-base max-w-md mb-6">{category.desc}</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      href={category.href}
                      className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 group"
                    >
                      Browse Collection
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <span className="text-white/60 text-sm">{category.count}+ titles available</span>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex-shrink-0"
              >
                <div className="relative w-48 h-64 md:w-56 md:h-72 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20">
                  <Image src={category.image} alt={category.name} fill className="object-cover" sizes="(max-width: 768px) 192px, 224px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-white text-sm font-medium">{category.name}</div>
                    <div className="text-white/70 text-xs">Featured Collection</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" aria-hidden="true" />
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-[#7C3AED]/20 rounded-full blur-2xl" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
