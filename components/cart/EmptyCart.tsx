"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";

const categories = [
  { name: "Fiction", href: "/fiction", color: "bg-blue-50 text-blue-700 hover:bg-blue-100" },
  { name: "Non-Fiction", href: "/non-fiction", color: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" },
  { name: "Science", href: "/academic", color: "bg-cyan-50 text-cyan-700 hover:bg-cyan-100" },
  { name: "Biography", href: "/biography", color: "bg-amber-50 text-amber-700 hover:bg-amber-100" },
];

export function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-6"
      >
        <ShoppingBag className="w-10 h-10 text-gray-300" />
      </motion.div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
      <p className="text-gray-500 mb-8 max-w-sm text-center">
        Looks like you haven&apos;t added any books yet. Start exploring our collection.
      </p>
      <Link
        href="/search"
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
      >
        Start Shopping
        <ArrowRight className="w-4 h-4" />
      </Link>
      <div className="mt-10 text-center">
        <p className="text-sm text-gray-400 mb-4">Browse categories</p>
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${cat.color}`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
