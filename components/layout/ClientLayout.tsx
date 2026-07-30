"use client";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "@/components/wishlist/WishlistContext";
import { useEffect, useState } from "react";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="bg-gray-50 min-h-screen">
          {mounted && <Navbar />}
          <div className={mounted ? "" : "pt-28 pb-12"}>{children}</div>
          {mounted && <Footer />}
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}
