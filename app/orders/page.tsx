"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function OrdersPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Order History</h1>
      <p className="text-gray-500 mb-8">
        Welcome, {user?.firstName || "User"}! Your orders will appear here.
      </p>
      <div className="bg-white rounded-xl shadow-md p-12 text-center">
        <i className="ri-file-list-3-line text-5xl text-gray-300 mb-4"></i>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">No orders yet</h2>
        <p className="text-gray-500 mb-6">When you place an order, it will show up here.</p>
        <Link
          href="/"
          className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Start Shopping
        </Link>
      </div>
    </div>
  );
}
