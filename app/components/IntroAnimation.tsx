"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Start transition after 1.5s
    const timer = setTimeout(() => {
      setIsAnimating(false);
      // Complete animation after transition finishes
      setTimeout(() => {
        onComplete();
      }, 1000); // Match the CSS transition duration
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`intro-overlay ${!isAnimating ? "intro-animating" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "var(--primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        transition: "opacity 0.5s ease 0.5s",
        opacity: isAnimating ? 1 : 0,
        pointerEvents: isAnimating ? "auto" : "none",
      }}
    >
      <div
        className={`intro-logo ${!isAnimating ? "intro-logo-shrink" : ""}`}
        style={{
          position: isAnimating ? "fixed" : "absolute",
          top: isAnimating ? "50%" : "24px",
          left: "50%",
          transform: isAnimating 
            ? "translate(-50%, -50%) scale(1)" 
            : "translate(-50%, 0) scale(0.35)",
          transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)",
          width: "200px",
          height: "auto",
          zIndex: 10000,
        }}
      >
        <Image
          src="/logos/logo_nln_white.png"
          alt="Logo"
          width={200}
          height={200}
          priority
          style={{
            width: "100%",
            height: "auto",
            filter: "drop-shadow(0 8px 24px rgba(0, 0, 0, 0.3))",
          }}
        />
      </div>
    </div>
  );
}
