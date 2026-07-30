"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, X, Check } from "lucide-react";

const VALID_PROMOS: Record<string, { discount: number; label: string }> = {
  WELCOME10: { discount: 0.1, label: "10% off" },
  SAVE20: { discount: 0.2, label: "20% off" },
};

interface PromoCodeProps {
  onApplyDiscount: (discount: number) => void;
  appliedDiscount: number;
}

export function PromoCode({ onApplyDiscount, appliedDiscount }: PromoCodeProps) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "valid" | "invalid" | "applied">("idle");
  const [activePromo, setActivePromo] = useState<string | null>(null);

  const handleApply = () => {
    const normalized = code.trim().toUpperCase();
    if (VALID_PROMOS[normalized]) {
      const promo = VALID_PROMOS[normalized];
      onApplyDiscount(promo.discount);
      setActivePromo(normalized);
      setStatus("applied");
      setCode("");
    } else if (normalized) {
      setStatus("invalid");
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  const handleRemove = () => {
    onApplyDiscount(0);
    setActivePromo(null);
    setStatus("idle");
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Tag className="w-4 h-4 text-gray-400" />
        <span className="text-sm font-medium text-gray-700">Promo Code</span>
      </div>

      {activePromo ? (
        <div className="flex items-center justify-between px-3 py-2.5 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">{activePromo}</span>
            <span className="text-xs text-green-500">({VALID_PROMOS[activePromo]?.label})</span>
          </div>
          <button
            onClick={handleRemove}
            aria-label="Remove promo code"
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-green-100 text-green-500"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
            placeholder="Enter promo code"
            aria-label="Promo code"
            className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <button
            onClick={handleApply}
            disabled={!code.trim()}
            className="px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Apply
          </button>
        </div>
      )}

      <AnimatePresence>
        {status === "invalid" && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-red-500"
          >
            Invalid promo code. Try WELCOME10 or SAVE20.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
