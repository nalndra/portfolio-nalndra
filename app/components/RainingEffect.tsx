"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

const RAIN_ASSETS = [
  "/raining-assets/Odd27.png",
  "/raining-assets/Odds19.png",
  "/raining-assets/Odds34.png",
  "/raining-assets/Odds39.png",
  "/raining-assets/People18.png",
  "/raining-assets/Transportation16.png",
  "/raining-assets/Transportation6.png",
  "/raining-assets/Transportation9.png",
];

interface RainParticle {
  id: number;
  asset: string;
  delay: number;
  duration: number;
  startX: number;
  xOffset: number;
  scale: number;
  opacity: number;
  randomScaleFactor: number;
}

function generateParticles(count: number): RainParticle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    asset: RAIN_ASSETS[Math.floor(Math.random() * RAIN_ASSETS.length)],
    delay: (i / count) * 8, // Spread delays evenly across duration
    duration: 10 + Math.random() * 8, // 10-18 seconds for slower fall
    startX: Math.random() * 100,
    xOffset: 80 + Math.random() * 120, // Stronger left to right movement (80-200px)
    scale: 0.3 + Math.random() * 0.6, // Scale between 0.3 and 0.9
    opacity: 0.25 + Math.random() * 0.55, // Opacity between 0.25 and 0.8
    randomScaleFactor: 0.5 + Math.random() * 1.5, // Will be used to vary size
  }));
}

export default function RainingEffect() {
  const particles = useMemo(() => generateParticles(18), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.startX}%`,
            top: "-120px",
            width: "80px",
            height: "80px",
          }}
          initial={{ y: -120, opacity: 0, x: 0 }}
          animate={{
            y: "calc(100vh + 50px)",
            opacity: [0, particle.opacity, particle.opacity, 0],
            x: particle.xOffset,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <motion.img
            src={particle.asset}
            alt="rain"
            className="w-full h-full object-contain filter grayscale opacity-70"
            style={{
              scale: particle.scale * particle.randomScaleFactor,
              willChange: "transform",
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
