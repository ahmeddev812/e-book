"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CategoryCarouselProps } from "@/types/category";

export function CategoryCarousel({
  categories,
  autoRotate = false,
  rotateInterval = 5000,
}: CategoryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  const goToNext = useCallback(() => {
    goToSlide((currentIndex + 1) % categories.length);
  }, [currentIndex, goToSlide, categories.length]);

  const goToPrev = useCallback(() => {
    goToSlide((currentIndex - 1 + categories.length) % categories.length);
  }, [currentIndex, goToSlide, categories.length]);

  useEffect(() => {
    if (!autoRotate || isPaused || categories.length === 0) return;
    const timer = setInterval(goToNext, rotateInterval);
    return () => clearInterval(timer);
  }, [autoRotate, isPaused, goToNext, rotateInterval, categories.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrev, goToNext]);

  if (categories.length === 0) return null;

  const currentCategory = categories[currentIndex];

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeInOut" as const } },
    exit: (d: number) => ({ x: d < 0 ? "100%" : "-100%", opacity: 0, scale: 0.95, transition: { duration: 0.6, ease: "easeInOut" as const } }),
  };

  return (
    <div
      className="relative overflow-hidden rounded-3xl shadow-2xl bg-white mx-4 sm:mx-6 lg:mx-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured categories"
    >
      <div className="relative aspect-[16/7] md:aspect-[16/6]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${currentIndex + 1} of ${categories.length}: ${currentCategory.name}`}
          >
            <div className="absolute inset-0">
              <Image src={currentCategory.image} alt="" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>

            <div className="relative h-full flex items-center p-6 md:p-12">
              <div className="max-w-xl text-white">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                    Featured Collection
                  </span>
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3">{currentCategory.name}</h2>
                  <p className="text-white/90 text-sm md:text-base mb-4 max-w-md">{currentCategory.desc}</p>
                  <div className="flex items-center gap-4">
                    <span className="text-white/70 text-sm">{currentCategory.count} titles</span>
                    <Link
                      href={currentCategory.href}
                      className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 group"
                    >
                      Explore Collection
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>

                {currentCategory.bookIds.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex gap-2 mt-6"
                    aria-hidden="true"
                  >
                    {currentCategory.bookIds.slice(0, 4).map((id) => (
                      <div key={id} className="w-12 h-16 bg-white/20 rounded-lg backdrop-blur-sm border border-white/10" />
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={goToPrev}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center transition-all duration-300"
          aria-label="Previous category"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center transition-all duration-300"
          aria-label="Next category"
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {categories.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${index === currentIndex ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/70"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
