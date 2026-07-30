"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download, ShieldCheck, CreditCard, BookOpen, Wifi, Sparkles } from "lucide-react";

const features = [
  {
    icon: Download,
    title: "Fast Download",
    description: "Instant access to your purchases. Download and start reading in seconds.",
  },
  {
    icon: ShieldCheck,
    title: "Lifetime Access",
    description: "Buy once, keep forever. Your library stays with you across all devices.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Protected by industry-standard encryption. Your data is always safe.",
  },
  {
    icon: BookOpen,
    title: "Multiple Formats",
    description: "Compatible with Kindle, iPad, Kobo, and all major reading devices.",
  },
  {
    icon: Wifi,
    title: "Offline Reading",
    description: "Download books to read anywhere, even without an internet connection.",
  },
  {
    icon: Sparkles,
    title: "Premium Quality",
    description: "Handpicked titles with professional formatting and beautiful covers.",
  },
];

export function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Why Choose BookHaven</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Everything you need for the perfect reading experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group p-6 sm:p-8 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors duration-500 mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
