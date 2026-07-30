"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { CartItem } from "@/types";

const CART_KEY = "cart";

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  subtotal: number;
  shipping: number;
  discount: number;
  grandTotal: number;
  addToCart: (id: string, name: string, price: number, image: string, author?: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(CART_KEY);
    if (stored) {
      try { setCart(JSON.parse(stored)); }
      catch { setCart([]); }
    }
  }, []);

  const saveCart = useCallback((newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem(CART_KEY, JSON.stringify(newCart));
  }, []);

  const addToCart = useCallback((id: string, name: string, price: number, image: string, author = "") => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      let newCart: CartItem[];
      if (existing) {
        newCart = prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newCart = [...prev, { id, name, price, image, author, quantity: 1 }];
      }
      localStorage.setItem(CART_KEY, JSON.stringify(newCart));
      return newCart;
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => {
      const newCart = prev.filter((item) => item.id !== id);
      localStorage.setItem(CART_KEY, JSON.stringify(newCart));
      return newCart;
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) => {
      const newCart = prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      localStorage.setItem(CART_KEY, JSON.stringify(newCart));
      return newCart;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.setItem(CART_KEY, JSON.stringify([]));
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const subtotal = cartTotal / 100;
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const discount = subtotal > 30 ? subtotal * 0.1 : 0;
  const grandTotal = subtotal + shipping - discount;

  return (
    <CartContext.Provider value={{ cart, cartCount, cartTotal, subtotal, shipping, discount, grandTotal, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used within CartProvider");
  return ctx;
}
