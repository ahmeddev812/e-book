"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCartContext } from "@/components/layout/CartContext";

export default function PaymentSuccessPage() {
  const { clearCart } = useCartContext();

  useEffect(() => { clearCart(); }, [clearCart]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="bg-white rounded-xl shadow-lg p-12 max-w-md text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="ri-check-line text-3xl text-green-600"></i>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-500 mb-8">Thank you for your purchase. Your order has been placed.</p>
        <Link
          href="/orders"
          className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          View Orders
        </Link>
      </div>
    </div>
  );
}
