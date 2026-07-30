"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Plus, Star, BookOpen } from "lucide-react";
import { bookDatabase } from "@/data/books";

const carouselBooks = [
  bookDatabase.new1,
  bookDatabase.best1,
  bookDatabase.new2,
  bookDatabase.best2,
  bookDatabase.new3,
  bookDatabase.new4,
].filter(Boolean);

const heroCategories = [
  { label: "Fiction", href: "/fiction" },
  { label: "Non-Fiction", href: "/non-fiction" },
  { label: "Science", href: "/science" },
  { label: "History", href: "/history" },
  { label: "Romance", href: "/romance" },
  { label: "Mystery", href: "/mystery" },
];

function Particles() {
  const particles = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => {
      const s = (n: number) => ((i * 9301 + n * 49297 + 233280) % 233280) / 233280;
      return {
        id: i,
        x: s(1) * 100,
        y: s(2) * 100,
        size: 2 + s(3) * 4,
        delay: s(4) * 5,
        duration: 4 + s(5) * 6,
        driftX: (s(6) - 0.5) * 40,
        driftY: (s(7) - 0.5) * 30,
      };
    }), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-500/20"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
          }}
          animate={{
            x: [0, p.driftX, 0],
            y: [0, p.driftY, 0],
            opacity: [0.1, 0.35, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

function GeometricShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute -top-20 -right-20 w-72 h-72 border border-blue-200/30 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -bottom-32 -left-20 w-96 h-96 border border-indigo-200/20 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/3 -right-10 w-16 h-16 border border-blue-300/20 rotate-45"
        animate={{ rotate: 405, scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-[15%] w-10 h-10 border border-purple-300/20 rounded-lg"
        animate={{ rotate: -45, scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function BookCarousel() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((p) => (p + 1) % carouselBooks.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const bookPositions = useMemo(() => {
    return carouselBooks.map((_, i) => {
      const angle = (i / carouselBooks.length) * Math.PI * 2 - Math.PI / 2;
      return {
        x: Math.cos(angle) * 90,
        y: Math.sin(angle) * 30,
        rotate: (i - 1) * 8,
        scale: 1 - Math.abs(i - activeIndex) * 0.08,
        zIndex: carouselBooks.length - Math.abs(i - activeIndex),
      };
    });
  }, [activeIndex]);

  return (
    <div className="relative w-full h-[420px] sm:h-[480px] flex items-center justify-center">
      {/* Gradient glow */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-blue-400/25 via-indigo-400/20 to-purple-400/25 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s" }} />

      <div className="relative w-[300px] h-[400px] sm:w-[340px] sm:h-[460px]">
        {carouselBooks.map((book, i) => (
          <motion.div
            key={book.id}
            className="absolute inset-0 cursor-pointer"
            initial={false}
            animate={{
              x: bookPositions[i].x,
              y: bookPositions[i].y,
              rotate: bookPositions[i].rotate,
              scale: bookPositions[i].scale,
              zIndex: bookPositions[i].zIndex,
              opacity: Math.abs(i - activeIndex) > 2 ? 0 : 1,
            }}
            transition={{ type: "spring", stiffness: 80, damping: 16 }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{ transformStyle: "preserve-3d", perspective: 800 }}
          >
            <motion.div
              className="w-full h-full rounded-2xl overflow-hidden shadow-2xl relative"
              animate={{
                rotateY: hoveredIndex === i ? 4 : 0,
                boxShadow: hoveredIndex === i
                  ? "0 30px 60px rgba(37, 99, 235, 0.25), 0 10px 30px rgba(0, 0, 0, 0.12)"
                  : "0 20px 40px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <Image
                src={book.image}
                alt={book.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 300px, 340px"
                unoptimized
              />

              {/* Hover overlay */}
              <AnimatePresence>
                {hoveredIndex === i && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4"
                  >
                    <p className="text-white font-bold text-sm leading-tight">{book.title}</p>
                    <p className="text-white/70 text-xs mt-0.5">{book.author}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-white/80 text-xs ml-1">{book.rating}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Indicator dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {carouselBooks.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`rounded-full transition-all duration-300 ${i === activeIndex ? "w-6 h-2 bg-blue-600" : "w-2 h-2 bg-gray-300 hover:bg-gray-400"}`}
            aria-label={`Go to book ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-white via-blue-50/40 to-white"
      aria-label="Hero"
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(37, 99, 235, 0.08) 0%, transparent 70%)",
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99, 102, 241, 0.08) 0%, transparent 70%)",
            "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(37, 99, 235, 0.08) 0%, transparent 70%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <Particles />
      <GeometricShapes />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center lg:text-left"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs sm:text-sm font-semibold border border-blue-100/60 shadow-sm">
                <BookOpen className="w-3.5 h-3.5" />
                Premium Digital Library
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.08] tracking-tight mt-6"
            >
              Where{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent">
                Great Stories
              </span>{" "}
              Begin
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-5 text-base sm:text-lg text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Explore our curated collection of premium eBooks from the world&rsquo;s best authors. Read anywhere, anytime.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Link
                href="/library"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-300/50 hover:-translate-y-0.5"
              >
                Browse Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/library"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-gray-700 rounded-xl font-semibold text-sm border border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/30 transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Discover Books
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-2 justify-center lg:justify-start"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-purple-500 shadow-sm"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-2">
                <strong className="text-gray-900">Join 500,000+</strong> readers
              </span>
            </motion.div>
          </motion.div>

          {/* Right - Book Carousel */}
          <motion.div
            style={{ y, opacity }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 w-full max-w-md lg:max-w-none"
          >
            <BookCarousel />
          </motion.div>
        </div>

        {/* Bottom: Categories + Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 sm:mt-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center lg:justify-start"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {heroCategories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all shadow-sm"
              >
                {cat.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-semibold">4.9/5</span>
            <span className="text-amber-500">from 10,000+ reviews</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
