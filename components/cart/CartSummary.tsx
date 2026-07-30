"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Lock, ShieldCheck, CreditCard, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { PromoCode } from "./PromoCode";

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  itemCount: number;
  discountPercent: number;
  onCheckout: () => void;
  isCheckingOut: boolean;
  onApplyDiscount: (discount: number) => void;
  appliedDiscountPercent: number;
  FREE_SHIPPING_THRESHOLD: number;
}

export function CartSummary({
  subtotal,
  shipping,
  discount,
  total,
  itemCount,
  onCheckout,
  isCheckingOut,
  onApplyDiscount,
  appliedDiscountPercent,
  FREE_SHIPPING_THRESHOLD,
}: CartSummaryProps) {
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div className="lg:sticky lg:top-28 space-y-5">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-7">
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span>Order Summary</span>
          <span className="text-sm font-normal text-gray-400">({itemCount} items)</span>
        </h2>

        {subtotal < FREE_SHIPPING_THRESHOLD && subtotal > 0 && (
          <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-amber-700 font-medium">Free Shipping</span>
              <span className="text-amber-600 font-semibold">${remaining.toFixed(2)} left</span>
            </div>
            <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-amber-500 rounded-full"
              />
            </div>
          </div>
        )}

        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <motion.span
              key={subtotal}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-medium text-gray-900 tabular-nums"
            >
              ${subtotal.toFixed(2)}
            </motion.span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span className="font-medium">
              {shipping === 0 ? (
                <span className="text-green-600 font-semibold">FREE</span>
              ) : (
                <span className="text-gray-900">${shipping.toFixed(2)}</span>
              )}
            </span>
          </div>
          <AnimatePresence>
            {discount > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex justify-between text-green-600"
              >
                <span>Discount ({appliedDiscountPercent * 100}%)</span>
                <span className="font-medium">-${discount.toFixed(2)}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-baseline">
            <span className="text-base font-semibold text-gray-900">Total</span>
            <motion.span
              key={total}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold text-gray-900 tabular-nums"
            >
              ${total.toFixed(2)}
            </motion.span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <motion.button
            onClick={onCheckout}
            disabled={isCheckingOut}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
          >
            {isCheckingOut ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Proceed to Checkout
              </>
            )}
          </motion.button>

          <Link
            href="/search"
            className="flex items-center justify-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors py-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>

        <div className="mt-6 pt-5 border-t border-gray-100">
          <PromoCode onApplyDiscount={onApplyDiscount} appliedDiscount={appliedDiscountPercent} />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
            Secure Checkout
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <CreditCard className="w-3.5 h-3.5" />
            SSL Encrypted
          </div>
          <div className="text-xs text-gray-400">|</div>
          <div className="flex items-center gap-2">
            {["Visa", "MC", "PayPal", "Apple"].map((p) => (
              <span key={p} className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
