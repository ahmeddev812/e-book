"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus } from "lucide-react";
import type { CartItem as CartItemType } from "@/types";

interface CartItemProps {
  item: CartItemType;
  index: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItem({ item, index, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group flex gap-4 p-4 sm:p-5 rounded-xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-300"
    >
      <Link
        href={`/books/${encodeURIComponent(item.name.toLowerCase().replace(/\s+/g, "-"))}`}
        className="relative w-20 h-28 sm:w-24 sm:h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0"
      >
        <Image
          src={item.image || "/default-book.jpg"}
          alt={item.name}
          fill
          className="object-cover"
          sizes="96px"
          unoptimized
        />
      </Link>

      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link
                href={`/books/${encodeURIComponent(item.name.toLowerCase().replace(/\s+/g, "-"))}`}
                className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-1"
              >
                {item.name}
              </Link>
              <p className="text-sm text-gray-500 mt-0.5">{item.author || "Unknown Author"}</p>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              aria-label={`Remove ${item.name} from cart`}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-md text-xs text-gray-500">
            <span>eBook</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              aria-label={`Decrease quantity of ${item.name}`}
              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <motion.span
              key={item.quantity}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              className="w-10 text-center text-sm font-semibold text-gray-900 tabular-nums"
            >
              {item.quantity}
            </motion.span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              aria-label={`Increase quantity of ${item.name}`}
              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <motion.div
            key={`${item.id}-${item.quantity}`}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-right"
          >
            <div className="font-bold text-gray-900">${((item.price * item.quantity) / 100).toFixed(2)}</div>
            {item.quantity > 1 && (
              <div className="text-xs text-gray-400">${(item.price / 100).toFixed(2)} each</div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
