"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartContext } from "@/components/layout/CartContext";
import { useState, useEffect } from "react";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cart, cartCount, subtotal, shipping, discount, grandTotal, removeFromCart, updateQuantity, clearCart } = useCartContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <i className="ri-shopping-cart-line text-primary"></i>
              Cart ({cartCount})
            </h2>
            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button onClick={clearCart} aria-label="Clear cart" className="text-sm text-red-500 hover:text-red-600 px-2 py-1">
                  Clear All
                </button>
              )}
              <button onClick={onClose} aria-label="Close cart" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <i className="ri-shopping-cart-line text-5xl mb-4"></i>
                <p className="text-lg font-medium">Your cart is empty</p>
                <button onClick={onClose} className="text-primary hover:underline mt-2">
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 bg-gray-50 rounded-lg p-3">
                    <div className="relative w-16 h-20 flex-shrink-0">
                      <Image src={item.image || "/default-book.jpg"} alt={item.name} fill className="rounded object-cover" unoptimized />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-800 truncate">{item.name}</h3>
                      <p className="text-xs text-gray-500">{item.author}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={`Decrease quantity of ${item.name}`} className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-200 text-sm">
                            <i className="ri-subtract-line"></i>
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={`Increase quantity of ${item.name}`} className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-200 text-sm">
                            <i className="ri-add-line"></i>
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-primary">${((item.price * item.quantity) / 100).toFixed(2)}</span>
                          <button onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`} className="text-gray-400 hover:text-red-500">
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t p-4 space-y-3">
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-green-600">FREE</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-gray-800 pt-2 border-t">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>
              <Link
                href="/cart"
                onClick={onClose}
                className="block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                View Cart & Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
