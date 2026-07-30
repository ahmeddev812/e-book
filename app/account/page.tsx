"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import {
  Library, ShoppingBag, Heart, Settings, LogOut,
  BookOpen, Download, ExternalLink,
} from "lucide-react";
import { bookDatabase, bestSellers } from "@/data/books";
import Image from "next/image";

const tabs = [
  { id: "library", label: "My Library", icon: Library },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function AccountPage() {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState("library");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); document.title = "My Account — BookHaven"; }, []);

  const purchasedBooks = bestSellers.slice(0, 6).map((id) => bookDatabase[id]).filter(Boolean);

  if (!mounted || !isLoaded) return <div className="pt-28 pb-12 min-h-screen" />;

  return (
    <main className="pt-28 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-500 mt-1">Welcome back, {user?.firstName || "Reader"}</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-56 flex-shrink-0">
            <nav className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition-colors ${
                    activeTab === tab.id ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
              <Link
                href="/wishlist"
                className="flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors border-t border-gray-100"
              >
                <Heart className="w-4 h-4" />
                Wishlist
              </Link>
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors border-t border-gray-100"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Link>
            </nav>
          </div>

          <div className="flex-1 min-w-0">
            {activeTab === "library" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-lg font-bold text-gray-900 mb-5">My Library ({purchasedBooks.length})</h2>
                {purchasedBooks.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                    <BookOpen className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Your library is empty</h3>
                    <p className="text-sm text-gray-500 mb-6">Start building your collection</p>
                    <Link href="/search" className="inline-flex px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">Browse Books</Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {purchasedBooks.map((book) => (
                      <div key={book.id} className="group bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
                        <Link href={`/books/${encodeURIComponent(book.title.toLowerCase().replace(/\s+/g, "-"))}`}>
                          <div className="relative aspect-[3/4] bg-gray-100">
                            <Image src={book.image} alt={book.title} fill className="object-cover" sizes="(max-width: 640px) 50vw, 25vw" unoptimized />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                              <button aria-label="Download" className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-gray-100"><Download className="w-4 h-4 text-gray-700" /></button>
                              <button aria-label="Read online" className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-gray-100"><ExternalLink className="w-4 h-4 text-gray-700" /></button>
                            </div>
                          </div>
                        </Link>
                        <div className="p-3">
                          <h3 className="text-sm font-semibold text-gray-900 truncate">{book.title}</h3>
                          <p className="text-xs text-gray-500">{book.author}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "orders" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-lg font-bold text-gray-900 mb-5">Order History</h2>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
                  <ShoppingBag className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">No orders yet</h3>
                  <p className="text-sm text-gray-500 mb-6">When you place an order, it will appear here</p>
                  <Link href="/search" className="inline-flex px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">Start Shopping</Link>
                </div>
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-lg font-bold text-gray-900 mb-5">Account Settings</h2>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
                  <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
                      {user?.firstName?.[0] || "R"}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user?.fullName || "Reader"}</p>
                      <p className="text-sm text-gray-500">{user?.primaryEmailAddress?.emailAddress || ""}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "Full Name", value: user?.fullName || "Reader" },
                      { label: "Email", value: user?.primaryEmailAddress?.emailAddress || "" },
                    ].map((field) => (
                      <div key={field.label}>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">{field.label}</label>
                        <input type="text" defaultValue={field.value} readOnly className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500 cursor-not-allowed" />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Newsletter</p>
                      <p className="text-xs text-gray-500">Get notified about new releases</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
