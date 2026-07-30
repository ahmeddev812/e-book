"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Star, BookOpen } from "lucide-react";

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.15),transparent_50%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center"
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1]">
          Your Next Favorite Book<br />
          <span className="text-blue-200">Is Waiting</span>
        </h2>
        <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
          Join 500,000+ readers who have discovered their next great read.
          Start your journey today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/search"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-700 rounded-xl font-semibold text-base hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
          >
            <BookOpen className="w-5 h-5" />
            Start Reading Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/fiction"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-base border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5"
          >
            View All Books
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm text-blue-200">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Secure Payments
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            4.9 Average Rating
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            50K+ Titles
          </div>
        </div>
      </motion.div>
    </section>
  );
}
