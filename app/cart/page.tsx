"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { ShoppingBag, CheckCircle, AlertCircle, X } from "lucide-react";
import Link from "next/link";

import { useCartContext } from "@/components/layout/CartContext";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { RecommendedBooks } from "@/components/cart/RecommendedBooks";
import { CartSkeleton } from "@/components/cart/CartSkeleton";

const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 5.99;

export default function CartPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { cart, cartTotal, removeFromCart, updateQuantity, clearCart } = useCartContext();
  const [mounted, setMounted] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState(0);
  const [toast, setToast] = useState<{ id: string; title: string; message: string; type: "success" | "error" | "warning" } | null>(null);

  useEffect(() => {
    setMounted(true);
    document.title = "Shopping Cart - BookHaven";
  }, []);

  const showToast = useCallback((title: string, message: string, type: "success" | "error" | "warning") => {
    const id = Date.now().toString();
    setToast({ id, title, message, type });
    setTimeout(() => setToast((t) => t?.id === id ? null : t), 3500);
  }, []);

  const subtotal = cartTotal / 100;
  const discount = appliedDiscountPercent > 0 ? subtotal * appliedDiscountPercent : 0;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST;
  const total = Math.max(0, subtotal + shipping - discount);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = useCallback(async () => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    if (cart.length === 0) return;
    setCheckingOut(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        showToast("Checkout Error", "Failed to create checkout session. Please try again.", "error");
      }
    } catch {
      showToast("Checkout Error", "Something went wrong. Please try again.", "error");
    } finally {
      setCheckingOut(false);
    }
  }, [isSignedIn, cart, router, showToast]);

  const handleRemove = useCallback((id: string) => {
    const item = cart.find((i) => i.id === id);
    removeFromCart(id);
    if (item) {
      showToast("Item Removed", `${item.name} has been removed from your cart.`, "warning");
    }
  }, [cart, removeFromCart, showToast]);

  if (!mounted) {
    return (
      <main className="pt-28 pb-12 min-h-screen bg-gray-50">
        <CartSkeleton />
      </main>
    );
  }

  return (
    <main className="pt-28 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Cart</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {cart.length > 0 ? `Review your ${itemCount} item${itemCount !== 1 ? "s" : ""} and proceed to checkout` : "Your cart is empty"}
              </p>
            </div>
          </div>
        </motion.div>

        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="popLayout">
                {cart.map((item, index) => (
                  <div key={item.id} className="mb-4 last:mb-0">
                    <CartItem
                      item={item}
                      index={index}
                      onUpdateQuantity={updateQuantity}
                      onRemove={handleRemove}
                    />
                  </div>
                ))}
              </AnimatePresence>

              <RecommendedBooks />
            </div>

            <div className="lg:w-96 flex-shrink-0">
              <CartSummary
                subtotal={subtotal}
                shipping={shipping}
                discount={discount}
                total={total}
                itemCount={itemCount}
                discountPercent={appliedDiscountPercent}
                onCheckout={handleCheckout}
                isCheckingOut={checkingOut}
                onApplyDiscount={(p) => setAppliedDiscountPercent(p)}
                appliedDiscountPercent={appliedDiscountPercent}
                FREE_SHIPPING_THRESHOLD={FREE_SHIPPING_THRESHOLD}
              />
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 10, x: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`fixed top-24 right-4 z-50 max-w-sm rounded-xl shadow-xl border px-4 py-3.5 ${
              toast.type === "success"
                ? "bg-white border-green-200"
                : toast.type === "warning"
                ? "bg-white border-amber-200"
                : "bg-white border-red-200"
            }`}
          >
            <div className="flex items-start gap-3">
              {toast.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              ) : toast.type === "warning" ? (
                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900">{toast.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{toast.message}</p>
              </div>
              <button
                onClick={() => setToast(null)}
                aria-label="Dismiss notification"
                className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400 flex-shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
