"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

const WISHLIST_KEY = "wishlist";

interface WishlistContextType {
  wishlist: string[];
  wishlistCount: number;
  isInWishlist: (id: string) => boolean;
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  toggleWishlist: (id: string) => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(WISHLIST_KEY);
    if (stored) {
      try { setWishlist(JSON.parse(stored)); }
      catch { setWishlist([]); }
    }
  }, []);

  const saveWishlist = useCallback((newWishlist: string[]) => {
    setWishlist(newWishlist);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(newWishlist));
  }, []);

  const isInWishlist = useCallback((id: string) => wishlist.includes(id), [wishlist]);

  const addToWishlist = useCallback((id: string) => {
    setWishlist((prev) => {
      if (prev.includes(id)) return prev;
      const newWishlist = [...prev, id];
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(newWishlist));
      return newWishlist;
    });
  }, []);

  const removeFromWishlist = useCallback((id: string) => {
    setWishlist((prev) => {
      const newWishlist = prev.filter((item) => item !== id);
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(newWishlist));
      return newWishlist;
    });
  }, []);

  const toggleWishlist = useCallback((id: string) => {
    if (isInWishlist(id)) removeFromWishlist(id);
    else addToWishlist(id);
  }, [isInWishlist, removeFromWishlist, addToWishlist]);

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider value={{ wishlist, wishlistCount, isInWishlist, addToWishlist, removeFromWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlistContext must be used within WishlistProvider");
  return ctx;
}
