"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen, Heart, Star, ArrowRight, Quote, Sparkles,
  Shield, Globe, Users, ChevronLeft, ChevronRight,
   Mail, Download, Layers, Clock,
  Target, BookMarked
} from "lucide-react";

const team = [
  { name: "Sarah Mitchell", role: "CEO & Founder", badge: "Visionary", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", fact: "Reads 100+ books a year", social: { twitter: "#", linkedin: "#", email: "#" } },
  { name: "James Chen", role: "CTO", badge: "Tech Lead", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop", fact: "Built the reader engine", social: { twitter: "#", linkedin: "#", email: "#" } },
  { name: "Emily Davis", role: "Head of Content", badge: "Curator", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop", fact: "Former NYT editor", social: { twitter: "#", linkedin: "#", email: "#" } },
  { name: "Marcus Williams", role: "Lead Designer", badge: "Creative", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop", fact: "Loves typography", social: { twitter: "#", linkedin: "#", email: "#" } },
];

const values = [
  { icon: Star, title: "Quality First", desc: "Every title in our collection is meticulously curated by editors who are passionate about great literature, ensuring only the finest works make it to your shelf.", gradient: "from-amber-400 to-orange-500" },
  { icon: Heart, title: "Reader-Centric", desc: "From seamless browsing to immersive reading, every pixel and interaction is designed to put the reader's joy and comfort at the center of the experience.", gradient: "from-rose-400 to-pink-500" },
  { icon: Shield, title: "Trust & Privacy", desc: "Your reading data belongs to you. We believe in radical transparency, secure transactions, and protecting your privacy as fiercely as we protect our authors' work.", gradient: "from-emerald-400 to-teal-500" },
  { icon: Globe, title: "Global Access", desc: "Breaking down barriers to literature. Our platform works across devices, languages, and regions so that anyone, anywhere can discover their next great read.", gradient: "from-blue-400 to-indigo-500" },
  { icon: Users, title: "Community First", desc: "Reading is personal but it doesn't have to be solitary. We're building tools for book clubs, discussions, and shared discovery that bring readers together.", gradient: "from-purple-400 to-violet-500" },
  { icon: Target, title: "Innovation Always", desc: "We push the boundaries of digital reading with adaptive typography, intelligent recommendations, and features that make reading better than ever imagined.", gradient: "from-cyan-400 to-sky-500" },
];

const testimonials = [
  { name: "Sarah Chen", role: "Reader since 2022", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", quote: "BookHaven has completely transformed how I discover and read books. The quality and curation are unmatched — it's like having a personal librarian who knows my taste perfectly.", rating: 5 },
  { name: "David Park", role: "Author", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", quote: "As an author, publishing on BookHaven gave my work the reach and presentation it deserved. The platform treats every book like a work of art — because that's what they are.", rating: 5 },
  { name: "Maria Rodriguez", role: "Book Club Organizer", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", quote: "Our book club moved to BookHaven and it was the best decision we ever made. The shared reading experience, notes, and discussions have brought our community closer together.", rating: 5 },
  { name: "James Wilson", role: "PhD, Literature", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", quote: "For academic research and pleasure reading alike, BookHaven's catalog depth and reading tools are exceptional. It's become an indispensable part of my daily routine.", rating: 5 },
];

const milestones = [
  { year: "2020", title: "The Idea", desc: "BookHaven was born from a simple belief that digital reading deserved better design and curation." },
  { year: "2021", title: "Launched", desc: "We opened our virtual doors with 1,000 hand-picked titles and a vision for the future of reading." },
  { year: "2023", title: "100K Readers", desc: "Our community grew to 100,000 readers across 50 countries, and we expanded our catalog to 20,000+ titles." },
  { year: "2025", title: "New Heights", desc: "Reached 500,000 readers, 50,000 titles, and launched our revolutionary adaptive reading engine." },
  { year: "2026", title: "Global Platform", desc: "Today we serve millions of readers worldwide, partnering with top publishers and independent authors alike." },
];

function AnimatedCounter({ end, suffix = "", inView }: { end: number; suffix?: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); return; }
      setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [end, inView]);

  return <>{count.toLocaleString()}{suffix}</>;
}

function FloatingBooks() {
  const books = useMemo(() => [
    { emoji: "📚", x: "10%", y: "20%", delay: 0, size: 32 },
    { emoji: "📖", x: "80%", y: "15%", delay: 0.5, size: 28 },
    { emoji: "📕", x: "20%", y: "70%", delay: 1, size: 24 },
    { emoji: "📗", x: "70%", y: "75%", delay: 0.3, size: 30 },
    { emoji: "📘", x: "50%", y: "10%", delay: 0.8, size: 26 },
    { emoji: "📙", x: "85%", y: "50%", delay: 1.2, size: 22 },
    { emoji: "📓", x: "15%", y: "50%", delay: 0.6, size: 20 },
    { emoji: "📔", x: "40%", y: "85%", delay: 0.9, size: 28 },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {books.map((b, i) => (
        <motion.div
          key={i}
          className="absolute opacity-20"
          style={{ left: b.x, top: b.y, fontSize: b.size }}
          animate={{
            y: [0, -20, 0, 15, 0],
            rotate: [0, 10, -5, 8, 0],
          }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
        >
          {b.emoji}
        </motion.div>
      ))}
    </div>
  );
}

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => { setMounted(true); document.title = "About Us — BookHaven"; }, []);

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const nextTestimonial = useCallback(() => {
    setTestimonialIndex((p) => (p + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setTestimonialIndex((p) => (p - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextTestimonial]);

  if (!mounted) return <div className="min-h-screen bg-white flex items-center justify-center"><div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" role="status"><span className="sr-only">Loading...</span></div></div>;

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section className="relative pt-28 pb-20 sm:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/80 via-white to-white">
        <FloatingBooks />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-gray-600">Home</Link><span>/</span>
              <span className="text-gray-900 font-medium">About</span>
            </nav>
          </motion.div>

          <div className="max-w-4xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-6"
            >
              <Sparkles className="w-3 h-3" /> Our Story
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.08]"
            >
              <span className="text-gray-900">We&rsquo;re Building the</span><br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">Future of Digital Reading</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-500 max-w-2xl mt-6 leading-relaxed"
            >
              Since 2020, BookHaven has been reimagining how readers discover, experience, and connect with the books that shape their lives.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <Link href="#story" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-full text-sm font-semibold border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all">
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── BRAND STORY ─── */}
      <section id="story" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                A New Chapter in <span className="text-blue-600">Digital Reading</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="text-base sm:text-lg">
                  BookHaven was born from a simple idea: reading should be a premium experience.
                  We started in 2020 with a mission to build the world&apos;s most elegant digital bookstore.
                </p>
                <p className="text-base sm:text-lg">
                  Today, we serve over 500,000 readers with a curated collection of 50,000+ titles
                  across every genre imaginable. Our platform is designed for readers who appreciate
                  quality, design, and the joy of discovering their next favorite book.
                </p>
                <p className="text-base sm:text-lg">
                  We work directly with authors and publishers to bring you the best in digital publishing,
                  with professional formatting, beautiful covers, and a seamless reading experience.
                </p>
              </div>

              <div className="flex items-center gap-6 mt-8 p-5 bg-blue-50 rounded-2xl border border-blue-100">
                <Quote className="w-8 h-8 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-700 italic font-medium">&ldquo;A great book is a universe in your hands. We&rsquo;re here to help you find yours.&rdquo;</p>
                  <p className="text-xs text-gray-500 mt-1">— Sarah Mitchell, CEO</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative h-[400px] sm:h-[480px] rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1526243741027-444d633d7365?w=800&h=1000&fit=crop"
                  alt="BookHaven reading experience"
                  fill
                  className="object-cover mix-blend-overlay opacity-70"
                  unoptimized
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-3xl bg-white/90 backdrop-blur flex items-center justify-center shadow-lg mb-4">
                      <BookOpen className="w-10 h-10 text-blue-600" />
                    </div>
                    <p className="text-white font-semibold text-lg drop-shadow-lg">500,000+ Readers Strong</p>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 blur-3xl" />
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full opacity-20 blur-3xl" />
              </div>
            </motion.div>
          </div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-14">Our Journey</h3>
            <div className="relative">
              <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-200 via-indigo-300 to-purple-200 sm:-translate-x-px" />
              <div className="space-y-12">
                {milestones.map((m, i) => (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`relative flex flex-col sm:flex-row gap-4 sm:gap-8 items-start ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}
                  >
                    <div className={`flex-1 ${i % 2 === 0 ? "sm:text-right" : "sm:text-left"}`}>
                      <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 hover:shadow-md transition-shadow ${i % 2 === 0 ? "sm:mr-8" : "sm:ml-8"}`}>
                        <span className="inline-block px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-2">{m.year}</span>
                        <h4 className="text-lg font-bold text-gray-900">{m.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">{m.desc}</p>
                      </div>
                    </div>
                    <div className="absolute left-4 sm:left-1/2 w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow -translate-x-1/2 mt-6 z-10" />
                    <div className="flex-1 hidden sm:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-4">Why We Do What We Do</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">What We Stand For</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Six principles that guide every decision we make, every feature we build, and every book we curate.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group relative bg-white rounded-2xl border border-gray-100 p-7 hover:border-transparent transition-all duration-500 hover:-translate-y-1 hover:shadow-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${v.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <v.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                </div>
                <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${v.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full mb-4">The People Behind BookHaven</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Meet Our Team</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">A passionate group of book lovers, engineers, designers, and dreamers building the future of reading.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group text-center"
              >
                <div className="relative mx-auto mb-5 w-36 h-36 sm:w-40 sm:h-40">
                  <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-gray-100 group-hover:ring-blue-200 transition-all duration-500 shadow-md">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover transition-all duration-500 group-hover:scale-110" unoptimized />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-3">
                    <div className="flex gap-2">

                      <a href={t.social.email} className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors" aria-label={`Email ${t.name}`}><Mail className="w-3.5 h-3.5 text-gray-700" /></a>
                    </div>
                  </div>
                </div>
                <h3 className="text-base font-bold text-gray-900">{t.name}</h3>
                <span className="inline-block mt-1 px-2.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-semibold rounded-full">{t.badge}</span>
                <p className="text-sm text-gray-500 mt-2">{t.role}</p>
                <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-400">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{t.fact}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center mt-14"
          >
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-all shadow-lg">
              Join Our Team <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-purple-400 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-400 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-3 py-1 bg-white/10 text-white/80 text-xs font-semibold rounded-full mb-4 backdrop-blur">By the Numbers</span>
            <h2 className="text-3xl sm:text-4xl font-bold">Trusted by Readers Worldwide</h2>
            <p className="text-white/60 mt-3 max-w-xl mx-auto">Our community is growing every day, driven by a shared love for great books and beautiful design.</p>
          </motion.div>

          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, value: 500, suffix: "K+", label: "Readers" },
              { icon: BookMarked, value: 50, suffix: "K+", label: "Titles" },
              { icon: Layers, value: 10, suffix: "K+", label: "Authors" },
              { icon: Download, value: 1, suffix: "M+", label: "Downloads" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-6 h-6 text-blue-300" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold mb-1">
                  <AnimatedCounter end={s.value} inView={statsInView} />
                  {s.suffix}
                </div>
                <div className="text-sm text-white/60">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIAL CAROUSEL ─── */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full mb-4">What Readers Say</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Loved by Thousands</h2>
          </motion.div>

          <div
            className="relative bg-white rounded-3xl border border-gray-100 shadow-lg p-8 sm:p-12"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
              <Quote className="w-5 h-5 text-white" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
                className="text-center"
              >
                <div className="flex items-center justify-center gap-1 mb-6">
                  {Array.from({ length: testimonials[testimonialIndex].rating }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-lg sm:text-xl text-gray-700 leading-relaxed font-medium mb-8 max-w-2xl mx-auto">
                  &ldquo;{testimonials[testimonialIndex].quote}&rdquo;
                </blockquote>
                <div className="flex items-center justify-center gap-3">
                  <Image src={testimonials[testimonialIndex].avatar} alt="" width={48} height={48} className="rounded-full" unoptimized />
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-900">{testimonials[testimonialIndex].name}</p>
                    <p className="text-xs text-gray-400">{testimonials[testimonialIndex].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-3 mt-8">
              <button onClick={prevTestimonial} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors" aria-label="Previous testimonial">
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, j) => (
                  <button key={j} onClick={() => setTestimonialIndex(j)} className={`w-2 h-2 rounded-full transition-all duration-300 ${j === testimonialIndex ? "w-6 bg-blue-600" : "bg-gray-300 hover:bg-gray-400"}`} aria-label={`Go to testimonial ${j + 1}`} />
                ))}
              </div>
              <button onClick={nextTestimonial} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors" aria-label="Next testimonial">
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-amber-300 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 bg-white/10 text-white/80 text-xs font-semibold rounded-full mb-4 backdrop-blur">Join the Community</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Ready to Discover Your Next Great Read?
            </h2>
            <p className="text-blue-200 text-base sm:text-lg max-w-xl mx-auto mb-8">
              Join 500,000+ readers who trust BookHaven for the best digital reading experience.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); setEmail(""); }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
              <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="flex-1 px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur" />
              <button type="submit" className="px-6 py-3 bg-white text-blue-700 rounded-xl text-sm font-bold hover:bg-white/90 transition-colors whitespace-nowrap shadow-lg">
                Get Started Free
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-blue-200">
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> No spam, ever</span>
              <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> 500K+ readers</span>
              <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5" /> 4.9 avg rating</span>
              <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> Available everywhere</span>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
