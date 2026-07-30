"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Heart, ShoppingBag, ArrowRight } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const categories = [
    { label: "Fiction", href: "/fiction" },
    { label: "Non-Fiction", href: "/non-fiction" },
    { label: "Children's", href: "/children" },
    { label: "Academic", href: "/academic" },
    { label: "Biography", href: "/biography" },
    { label: "Poetry", href: "/poetry" },
  ];

  const quickLinks = [
    { label: "About Us", href: "/" },
    { label: "Bestsellers", href: "/search" },
    { label: "New Releases", href: "/search" },
    { label: "Gift Cards", href: "/cart" },
    { label: "Blog", href: "/" },
  ];

  const legal = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">BookHaven</span>
            </Link>
            <p className="text-sm text-gray-500 mb-6 max-w-sm leading-relaxed">
              Your premier destination for premium digital books. Discover, read, and collect
              thousands of titles across every genre.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: "ri-twitter-x-fill", href: "#" },
                { icon: "ri-instagram-fill", href: "#" },
                { icon: "ri-linkedin-fill", href: "#" },
                { icon: "ri-github-fill", href: "#" },
              ].map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-blue-50 flex items-center justify-center text-gray-500 hover:text-blue-600 transition-all"
                  aria-label="Social media"
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-gray-900 uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.label}>
                  <Link href={cat.href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-gray-900 uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-gray-900 uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              {legal.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-semibold text-sm text-gray-900 uppercase tracking-wider mb-4">Newsletter</h3>
            <p className="text-sm text-gray-500 mb-4">
              Get notified about new releases, exclusive deals, and reading recommendations.
            </p>
            {subscribed ? (
              <p className="text-sm text-green-600 font-medium">Thanks for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  required
                  className="flex-1 px-3 py-2.5 bg-gray-100 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors flex-shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} BookHaven. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3" /> Made with love for readers
            </div>
            <div className="flex items-center gap-1">
              <ShoppingBag className="w-3 h-3" /> 50K+ titles
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
