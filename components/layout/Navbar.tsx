"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import { useCartContext } from "./CartContext";
import { useWishlistContext } from "@/components/wishlist/WishlistContext";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Search, Heart, ShoppingBag, Menu, X, BookOpen, ChevronDown, Globe, FlaskConical, History, Monitor, Heart as HeartIcon, Sparkles, User, GraduationCap, Quote } from "lucide-react";

export function Navbar() {
  const { cartCount } = useCartContext();
  const { wishlistCount } = useWishlistContext();
  const { isSignedIn } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  const navbarBg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.95)"]
  );
  const navbarShadow = useTransform(
    scrollY,
    [0, 80],
    ["0px 0px 0px rgba(0,0,0,0)", "0px 1px 3px rgba(0,0,0,0.06)"]
  );
  const navbarHeight = useTransform(scrollY, [0, 80], ["4.5rem", "3.75rem"]);
  const logoScale = useTransform(scrollY, [0, 80], [1, 0.9]);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (v) => setScrolled(v > 20));
    return () => unsubscribe();
  }, [scrollY]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchOverlay(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const categoriesRef = useRef<HTMLLIElement>(null);

  const categoryLinks = [
    { label: "All Categories", href: "/browse", icon: Globe },
    { label: "Fiction", href: "/fiction", icon: BookOpen },
    { label: "Non-Fiction", href: "/non-fiction", icon: Globe },
    { label: "Science & Tech", href: "/science", icon: FlaskConical },
    { label: "History", href: "/history", icon: History },
    { label: "Romance", href: "/romance", icon: HeartIcon },
    { label: "Mystery & Thriller", href: "/mystery", icon: Search },
    { label: "Self-Help", href: "/search?q=Self-Help", icon: Sparkles },
    { label: "Biography", href: "/biography", icon: User },
    { label: "Academic", href: "/academic", icon: GraduationCap },
    { label: "Poetry", href: "/poetry", icon: Quote },
    { label: "Children's", href: "/children", icon: BookOpen },
  ];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (categoriesRef.current && !categoriesRef.current.contains(e.target as Node)) {
        setCategoriesOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
  ];

  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);

  return (
    <>
      <motion.header
        style={{
          background: navbarBg,
          boxShadow: navbarShadow,
          height: navbarHeight,
        }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <motion.div style={{ scale: logoScale }} className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">BookHaven</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Home</Link>

              <li ref={categoriesRef} className="relative list-none">
                <button
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  aria-expanded={categoriesOpen}
                  aria-haspopup="true"
                >
                  Categories
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${categoriesOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {categoriesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50"
                    >
                      {categoryLinks.map((cat) => (
                        <Link
                          key={cat.label}
                          href={cat.href}
                          onClick={() => setCategoriesOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                        >
                          <cat.icon className="w-4 h-4 text-gray-400" />
                          {cat.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
              <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">About</Link>
              <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Blog</Link>
            </nav>
          </motion.div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block relative" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setShowSearchOverlay(true); }}
                  onFocus={() => { if (searchQuery.trim()) setShowSearchOverlay(true); }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                    }
                  }}
                  className="w-48 lg:w-56 pl-9 pr-3 py-2 bg-gray-100 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>
              {showSearchOverlay && searchQuery.trim() && (
                <SearchOverlay query={searchQuery} onClose={() => setShowSearchOverlay(false)} />
              )}
            </div>

            <div className="hidden md:flex items-center gap-1">
              {isSignedIn ? (
                <UserButton
                  appearance={{
                    elements: { userButtonAvatarBox: "w-8 h-8" },
                  }}
                >
                  <UserButton.MenuItems>
                    <UserButton.Link label="My Profile" labelIcon={<i className="ri-user-line" />} href="/profile" />
                    <UserButton.Link label="Order History" labelIcon={<i className="ri-file-list-line" />} href="/orders" />
                    <UserButton.Link label="Wishlist" labelIcon={<i className="ri-heart-line" />} href="/wishlist" />
                    <UserButton.Action label="manageAccount" />
                    <UserButton.Action label="signOut" />
                  </UserButton.MenuItems>
                </UserButton>
              ) : (
                <Link
                  href="/sign-in"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 transition-colors"
                >
                  Sign In
                </Link>
              )}

              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Heart className={`w-5 h-5 ${wishlistCount > 0 ? "text-red-500" : "text-gray-600"}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setCartDrawerOpen(true)}
                aria-label="Shopping cart"
                className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ShoppingBag className="w-5 h-5 text-gray-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blue-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <Link
                href="/search"
                className="hidden lg:inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-lg md:hidden"
          >
            <div className="px-4 py-4 space-y-1">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                      setMobileMenuOpen(false);
                    }
                  }}
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-100 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-0.5">
                <button
                  onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                  className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> Categories</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${mobileCategoriesOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileCategoriesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-2 pl-3 border-l-2 border-gray-100 space-y-0.5 pb-1">
                        {categoryLinks.map((cat) => (
                          <Link
                            key={cat.label}
                            href={cat.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <cat.icon className="w-3.5 h-3.5 text-gray-400" />
                            {cat.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <hr className="my-2 border-gray-100" />
              <div className="flex items-center gap-3 px-3 py-2">
                {isSignedIn ? (
                  <>
                    <UserButton
                      appearance={{ elements: { userButtonAvatarBox: "w-7 h-7" } }}
                    />
                    <Link href="/profile" className="text-sm font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                      Profile
                    </Link>
                  </>
                ) : (
                  <Link href="/sign-in" className="text-sm font-medium text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                    Sign In
                  </Link>
                )}
                <Link href="/wishlist" className="text-sm font-medium text-gray-700 ml-auto" onClick={() => setMobileMenuOpen(false)}>
                  Wishlist ({wishlistCount})
                </Link>
                <button onClick={() => { setCartDrawerOpen(true); setMobileMenuOpen(false); }} className="text-sm font-medium text-gray-700">
                  Cart ({cartCount})
                </button>
              </div>
              <Link
                href="/search"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full mt-2 px-3 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold text-center hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer open={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
    </>
  );
}
