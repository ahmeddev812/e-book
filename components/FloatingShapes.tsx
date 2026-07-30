"use client";

import { motion } from "framer-motion";

const shapes = [
  { size: 300, x: "10%", y: "20%", color: "rgba(37,99,235,0.08)", duration: 20, delay: 0 },
  { size: 200, x: "80%", y: "30%", color: "rgba(99,102,241,0.06)", duration: 25, delay: 2 },
  { size: 250, x: "60%", y: "70%", color: "rgba(37,99,235,0.05)", duration: 18, delay: 1 },
  { size: 150, x: "30%", y: "80%", color: "rgba(139,92,246,0.06)", duration: 22, delay: 3 },
  { size: 180, x: "90%", y: "10%", color: "rgba(37,99,235,0.04)", duration: 15, delay: 4 },
];

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            background: `radial-gradient(circle, ${shape.color} 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 30, -20, 40, 0],
            y: [0, -40, 20, -30, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        />
      ))}
    </div>
  );
}
