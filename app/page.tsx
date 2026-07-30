"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import nextDynamic from "next/dynamic";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ReadingExperience } from "@/components/home/ReadingExperience";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";
import { MarqueeBooks } from "@/components/home/MarqueeBooks";
import { newArrivals, bestSellers } from "@/data/books";
import type { Book } from "@/types";

const QuickViewModal = nextDynamic(
  () => import("@/components/books/QuickViewModal").then((m) => m.QuickViewModal)
);

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [quickViewBook, setQuickViewBook] = useState<Book | null>(null);
  const [showQuickView, setShowQuickView] = useState(false);

  useEffect(() => {
    document.title = "BookHaven - Premium Digital Bookstore";
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />

      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <MarqueeBooks title="New Arrivals" bookIds={newArrivals} speed={35} />
      <MarqueeBooks title="Best Sellers" bookIds={bestSellers} speed={30} />
      <WhyChooseUs />
      <ReadingExperience />
      <Testimonials />
      <CTASection />

      {showQuickView && quickViewBook && (
        <QuickViewModal
          book={quickViewBook}
          onClose={() => {
            setShowQuickView(false);
            setQuickViewBook(null);
          }}
        />
      )}
    </>
  );
}
