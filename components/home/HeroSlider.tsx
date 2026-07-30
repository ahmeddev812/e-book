"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface Slide {
  bgImage: string;
  title: string;
  subtitle: string;
  badge?: string;
  oldPrice?: string;
  price?: string;
  btnText: string;
}

const slides: Slide[] = [
  {
    bgImage: "https://readdy.ai/api/search-image?query=a%20beautiful%20bookstore%20with%20dramatic%20lighting%2C%20showing%20bookshelves%20filled%20with%20colorful%20books%2C%20warm%20ambient%20lighting%2C%20a%20cozy%20reading%20area%20with%20comfortable%20chairs%2C%20people%20browsing%20books%2C%20high%20quality%20professional%20photography&width=1280&height=500&seq=1&orientation=landscape",
    title: "Summer Reading Collection",
    subtitle: "Discover the perfect books for your summer getaway",
    badge: "30% OFF",
    oldPrice: "$29.99",
    price: "$20.99",
    btnText: "Shop Now",
  },
  {
    bgImage: "https://readdy.ai/api/search-image?query=a%20modern%20library%20interior%20with%20people%20reading%20books%2C%20large%20windows%20with%20natural%20light%20streaming%20in%2C%20contemporary%20architecture%2C%20organized%20bookshelves%2C%20reading%20tables%2C%20digital%20displays%2C%20high%20quality%20professional%20photography&width=1280&height=500&seq=2&orientation=landscape",
    title: "New York Times Bestsellers",
    subtitle: "The most talked-about books of 2025",
    badge: "Buy 2 Get 1 Free",
    btnText: "Explore Collection",
  },
  {
    bgImage: "https://readdy.ai/api/search-image?query=a%20person%20reading%20a%20book%20in%20a%20cozy%20setting%2C%20soft%20blanket%2C%20cup%20of%20coffee%20nearby%2C%20bookshelves%20in%20background%2C%20warm%20lighting%2C%20comfortable%20armchair%2C%20window%20with%20rain%20outside%2C%20high%20quality%20professional%20photography&width=1280&height=500&seq=3&orientation=landscape",
    title: "Children's Book Festival",
    subtitle: "Magical stories to inspire young minds",
    badge: "Up to 40% OFF",
    btnText: "View Collection",
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const moveTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => clearInterval(intervalRef.current);
  }, [next]);

  const pauseAutoplay = () => clearInterval(intervalRef.current);
  const resumeAutoplay = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 5000);
  };

  return (
    <section
      className="hero-slider mb-12"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      <div
        className="slider-container"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="slide"
            style={{
              backgroundImage: `url('${slide.bgImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="slide-content">
              <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
              <p className="text-xl mb-6">{slide.subtitle}</p>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold mr-4">{slide.badge}</span>
                {slide.oldPrice && (
                  <span className="line-through text-gray-300">{slide.oldPrice}</span>
                )}
                {slide.price && (
                  <span className="text-xl font-bold ml-2">{slide.price}</span>
                )}
              </div>
              <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-button font-medium inline-flex items-center whitespace-nowrap">
                {slide.btnText}
                <i className="ri-arrow-right-line ml-2"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="slider-nav">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`slider-dot ${i === current ? "active" : ""}`}
            onClick={() => moveTo(i)}
          />
        ))}
      </div>
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-800 hover:bg-white"
      >
        <i className="ri-arrow-left-s-line text-xl"></i>
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-800 hover:bg-white"
      >
        <i className="ri-arrow-right-s-line text-xl"></i>
      </button>
    </section>
  );
}
