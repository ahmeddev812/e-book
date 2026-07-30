"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Flame, Sparkles } from "lucide-react";
import type { CategoryCardPremiumProps } from "@/types/category";

export function CategoryCardPremium({
  name, desc, href, count, gradient, icon: Icon, image, miniCovers, index, isTrending = false, isFeatured = false,
}: CategoryCardPremiumProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link href={href} className="block h-full" aria-label={`${name} category - ${count} titles`}>
        <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm h-full transition-all duration-300 group-hover:shadow-xl">
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
            <Image src={image} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
          </div>

          <div className="relative z-10 p-6">
            <div className="flex items-center gap-2 mb-3" aria-live="polite">
              {isTrending && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-500/10 text-red-500 rounded-full text-xs font-medium">
                  <Flame className="w-3 h-3" /> Trending
                </span>
              )}
              {isFeatured && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#2563EB]/10 text-[#2563EB] rounded-full text-xs font-medium">
                  <Sparkles className="w-3 h-3" /> Featured
                </span>
              )}
            </div>

            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/50 group-hover:bg-white/20 backdrop-blur-sm mb-4 transition-all duration-500">
              <Icon className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors duration-500" />
            </div>

            <h3 className="text-lg font-bold text-gray-900 group-hover:text-white transition-colors duration-500">
              {name}
            </h3>
            <p className="text-sm text-gray-500 group-hover:text-white/80 transition-colors duration-500 mt-1 line-clamp-2">
              {desc}
            </p>

            {miniCovers.length > 0 && (
              <div className="flex -space-x-2 mt-4" aria-hidden="true">
                {miniCovers.slice(0, 3).map((cover, i) => (
                  <div key={i} className="w-8 h-10 rounded border-2 border-white group-hover:border-white/20 bg-gray-200 overflow-hidden shadow-sm">
                    {cover && <Image src={cover} alt="" width={32} height={40} className="w-full h-full object-cover" />}
                  </div>
                ))}
                {miniCovers.length > 3 && (
                  <div className="w-8 h-10 rounded border-2 border-white group-hover:border-white/20 bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-500 shadow-sm">
                    +{miniCovers.length - 3}
                  </div>
                )}
              </div>
            )}

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-400 group-hover:text-white/60 transition-colors duration-500">
                {count} titles
              </span>
              <span className="text-xs font-semibold text-[#2563EB] group-hover:text-white transition-colors duration-500 inline-flex items-center gap-1">
                Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
