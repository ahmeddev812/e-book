"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight, Clock, Bookmark, MessageCircle, ChevronLeft, ChevronRight, Mail, Star } from "lucide-react";

const categories = ["All", "Reviews", "Interviews", "Guides", "News", "Community"];

const posts = [
  { title: "The Future of Digital Reading: How E-Books Are Transforming Literature", excerpt: "How e-books are transforming the way we consume literature and why BookHaven is at the forefront of this revolution. The publishing industry has seen more change in the last decade than in the previous century.", author: "Sarah Chen", authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", date: "Jun 15, 2026", slug: "future-of-digital-reading", image: "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=1200&h=600&fit=crop", category: "Guides", readingTime: "8 min read", comments: 24, featured: true, trending: true },
  { title: "Top 10 Must-Read Books of 2026", excerpt: "Our editors pick the most captivating reads of the year across every genre — from gripping thrillers to life-changing non-fiction.", author: "Marcus Webb", authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", date: "Jun 10, 2026", slug: "top-10-books-2026", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&h=600&fit=crop", category: "Reviews", readingTime: "6 min read", comments: 18, featured: false, trending: true },
  { title: "How to Build a Reading Habit That Sticks", excerpt: "Simple strategies to make reading a daily part of your life, backed by science and recommended by our community of avid readers.", author: "Dr. Emily Torres", authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", date: "Jun 5, 2026", slug: "build-reading-habit", image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&h=600&fit=crop", category: "Guides", readingTime: "5 min read", comments: 31, featured: false, trending: false },
  { title: "Genre Spotlight: Why Science Fiction Matters Now More Than Ever", excerpt: "Science fiction isn't just entertainment — it's a lens through which we explore the future of humanity, technology, and our place in the cosmos.", author: "Alex Rivera", authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", date: "May 28, 2026", slug: "sci-fi-spotlight", image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&h=600&fit=crop", category: "Reviews", readingTime: "7 min read", comments: 14, featured: false, trending: false },
  { title: "Interview: Bestselling Author Isabella Montague on Love, Loss, and Writing", excerpt: "We sit down with the author of 'Whispers of Love' to discuss her writing process, creative inspiration, and what readers can expect next.", author: "BookHaven Team", authorAvatar: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100&h=100&fit=crop", date: "May 20, 2026", slug: "isabella-montague-interview", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&h=600&fit=crop", category: "Interviews", readingTime: "10 min read", comments: 42, featured: false, trending: true },
  { title: "The Rise of Audiobooks: Why 2026 Is the Year of Digital Audio", excerpt: "Audiobook consumption has doubled since 2024. Here's why digital audio is becoming the preferred format for modern readers on the go.", author: "Jordan Park", authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", date: "May 12, 2026", slug: "rise-of-audiobooks", image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=1200&h=600&fit=crop", category: "News", readingTime: "4 min read", comments: 9, featured: false, trending: false },
  { title: "Community Spotlight: How Our Readers Are Redefining Book Clubs", excerpt: "Book clubs have gone digital — and our community is leading the charge with innovative virtual reading groups and discussions.", author: "Maya Patel", authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", date: "May 5, 2026", slug: "community-book-clubs", image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200&h=600&fit=crop", category: "Community", readingTime: "5 min read", comments: 27, featured: false, trending: false },
  { title: "Behind the Scenes: Curating the Perfect Reading List", excerpt: "Ever wonder how our editorial team picks their monthly recommendations? We're pulling back the curtain on our curation process.", author: "BookHaven Team", authorAvatar: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100&h=100&fit=crop", date: "Apr 28, 2026", slug: "curation-process", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=600&fit=crop", category: "Community", readingTime: "6 min read", comments: 15, featured: false, trending: false },
  { title: "The Art of the Unreliable Narrator: Books That Play With Perspective", excerpt: "From Gone Girl to The Silent Patient, unreliable narrators keep us guessing. Here are the best books that master this literary device.", author: "Sarah Chen", authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", date: "Apr 20, 2026", slug: "unreliable-narrators", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1200&h=600&fit=crop", category: "Reviews", readingTime: "7 min read", comments: 22, featured: false, trending: false },
];

const CATEGORY_COLORS: Record<string, string> = {
  Reviews: "bg-blue-100 text-blue-700",
  Interviews: "bg-purple-100 text-purple-700",
  Guides: "bg-emerald-100 text-emerald-700",
  News: "bg-amber-100 text-amber-700",
  Community: "bg-rose-100 text-rose-700",
};

export default function BlogPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const [email, setEmail] = useState("");

  useEffect(() => { setMounted(true); document.title = "Blog — BookHaven"; }, []);

  const featured = posts[0];

  const filtered = useMemo(
    () => (selectedCategory === "All" ? posts : posts.filter((p) => p.category === selectedCategory)),
    [selectedCategory]
  );

  const visiblePosts = useMemo(() => filtered.slice(1, 1 + visibleCount), [filtered, visibleCount]);
  const hasMore = filtered.length - 1 > visibleCount;

  const popularPosts = useMemo(() => [...posts].sort((a, b) => b.comments - a.comments).slice(0, 3), []);

  if (!mounted) return <div className="min-h-screen bg-white flex items-center justify-center"><div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" role="status"><span className="sr-only">Loading...</span></div></div>;

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* Breadcrumb & Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-gray-600">Home</Link><span>/</span>
            <span className="text-gray-900 font-medium">Blog</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">The BookHaven Blog</h1>
          <p className="text-gray-500 mt-2 text-base">Stories, insights, and recommendations for book lovers</p>
        </motion.div>

        {/* Hero Featured Post */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl mb-12 group cursor-pointer"
        >
          <Link href={`/blog/${featured.slug}`}>
            <div className="relative aspect-[21/9] sm:aspect-[3/1] rounded-3xl overflow-hidden">
              <Image src={featured.image} alt={featured.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full"><Star className="w-3 h-3 fill-white" /> Featured Story</span>
                <span className="text-white/60 text-xs flex items-center gap-1"><Clock className="w-3 h-3" /> {featured.readingTime}</span>
              </div>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-2 max-w-3xl">{featured.title}</h2>
              <p className="text-white/70 text-sm sm:text-base max-w-2xl line-clamp-2 mb-4">{featured.excerpt}</p>
              <div className="flex items-center gap-3 text-white/60 text-xs sm:text-sm">
                <span className="flex items-center gap-2"><Image src={featured.authorAvatar} alt="" width={24} height={24} className="rounded-full" unoptimized /> {featured.author}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {featured.date}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> {featured.comments}</span>
              </div>
            </div>
          </Link>
        </motion.article>

        {/* Category Pills */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative mb-8">
          <button onClick={() => { const el = document.getElementById("category-scroll"); if (el) el.scrollBy({ left: -200, behavior: "smooth" }); }} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-gray-50 hidden sm:flex" aria-label="Scroll left"><ChevronLeft className="w-4 h-4 text-gray-500" /></button>
          <div id="category-scroll" className="flex gap-2 overflow-x-auto scrollbar-none py-2 px-0 sm:px-10">
            {categories.map((cat, i) => (
              <motion.button
                key={cat} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.04 }}
                onClick={() => { setSelectedCategory(cat); setVisibleCount(6); }}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${selectedCategory === cat ? "bg-gray-900 text-white shadow-lg" : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"}`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
          <button onClick={() => { const el = document.getElementById("category-scroll"); if (el) el.scrollBy({ left: 200, behavior: "smooth" }); }} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-gray-50 hidden sm:flex" aria-label="Scroll right"><ChevronRight className="w-4 h-4 text-gray-500" /></button>
        </motion.div>

        {/* Featured Row (first 3 non-featured) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {posts.slice(1, 4).map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.06 }} className="flex md:flex-col gap-4 items-start bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-full md:aspect-[16/9] md:h-auto rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold mb-2 ${CATEGORY_COLORS[post.category] || "bg-gray-100 text-gray-600"}`}>{post.category}</span>
                  <h3 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                    <span>{post.date}</span><span>·</span><span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readingTime}</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Main content: grid + sidebar */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Blog Grid */}
          <div className="flex-1">
            {visiblePosts.length === 0 ? (
              <div className="text-center py-16"><p className="text-gray-400">No posts in this category yet.</p></div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {visiblePosts.map((post, i) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link href={`/blog/${post.slug}`} className="group block">
                      <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-blue-200">
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
                          {post.trending && <span className="absolute top-3 left-3 px-2 py-0.5 bg-orange-500 text-white text-[10px] font-bold rounded-md">Trending</span>}
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${CATEGORY_COLORS[post.category] || "bg-gray-100 text-gray-600"}`}>{post.category}</span>
                            <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{post.readingTime}</span>
                          </div>
                          <h3 className="text-base font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">{post.title}</h3>
                          <p className="text-sm text-gray-500 line-clamp-2 mb-3">{post.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Image src={post.authorAvatar} alt="" width={22} height={22} className="rounded-full" unoptimized />
                              <span className="text-xs text-gray-500">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                              <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />{post.comments}</span>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            {hasMore && (
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-10 text-center">
                <button onClick={() => setVisibleCount((p) => p + 4)} className="px-8 py-3 bg-gray-900 text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg">
                  Load More Posts
                </button>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0 space-y-6">
            <div className="lg:sticky lg:top-28 space-y-6">
              {/* Popular Posts */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-4">Popular Posts</h3>
                <div className="space-y-4">
                  {popularPosts.map((post, i) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="flex gap-3 group">
                      <span className="text-2xl font-bold text-gray-200 w-6 flex-shrink-0">{i + 1}</span>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">{post.title}</h4>
                        <span className="text-xs text-gray-400">{post.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-4"><Mail className="w-5 h-5" /></div>
                <h3 className="font-bold text-lg mb-1">Weekly Newsletter</h3>
                <p className="text-white/80 text-sm mb-4">Get book recommendations, author interviews, and reading tips delivered to your inbox.</p>
                <form onSubmit={(e) => { e.preventDefault(); setEmail(""); }} className="space-y-2">
                  <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/30" />
                  <button type="submit" className="w-full py-2.5 bg-white text-blue-700 rounded-xl text-sm font-bold hover:bg-white/90 transition-colors">Subscribe</button>
                </form>
                <p className="text-white/50 text-xs mt-3">Join 10,000+ readers. No spam, unsubscribe anytime.</p>
              </div>

              {/* Author Spotlight */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-4">Meet Our Editors</h3>
                <div className="space-y-3">
                  {["Sarah Chen", "Marcus Webb", "Alex Rivera"].map((name) => (
                    <div key={name} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                        {name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{name}</p>
                        <p className="text-xs text-gray-400">Senior Editor</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.slice(1).map((cat) => (
                    <button key={cat} onClick={() => { setSelectedCategory(cat); setVisibleCount(6); }} className="flex items-center justify-between w-full text-sm text-gray-600 hover:text-gray-900 py-1.5 transition-colors group">
                      <span>{cat}</span>
                      <span className="text-xs text-gray-400 group-hover:text-gray-600">{posts.filter((p) => p.category === cat).length}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
