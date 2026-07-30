"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BookOpen } from "lucide-react";

interface LoadingScreenProps {
  isLoading: boolean;
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
        >
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 flex items-center justify-center"
          >
            <div className="absolute w-16 h-16 rounded-full border-2 border-blue-100 border-t-blue-600 animate-spin" />
            <BookOpen className="w-7 h-7 text-blue-600" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 text-gray-500 text-sm font-medium tracking-wide"
          >
            Loading your library...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
