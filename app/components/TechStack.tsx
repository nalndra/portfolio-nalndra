"use client";

import React, { useState, useEffect, useRef } from "react";
import { site } from "../config/site.config";

const techCategories = [
  {
    title: "Mobile Development",
    color: "rgba(232, 234, 237, 0.08)",
    borderColor: "rgba(232, 234, 237, 0.3)",
    accentColor: "#FFFFFF",
    techs: ["Flutter", "Firebase", "Dart", "GetX"],
  },
  {
    title: "Web Development",
    color: "rgba(232, 234, 237, 0.08)",
    borderColor: "rgba(232, 234, 237, 0.3)",
    accentColor: "#FFFFFF",
    techs: ["React", "Next.js", "TypeScript", "Tailwind", "HTML"],
  },
  {
    title: "Game Development",
    color: "rgba(232, 234, 237, 0.08)",
    borderColor: "rgba(232, 234, 237, 0.3)",
    accentColor: "#FFFFFF",
    techs: ["JavaScript", "Roblox Studio", "Lua", "Aseprite", "Three.js"],
  },
];

export default function TechStack() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Reset scroll when reaching the end of first set
      if (scrollPosition >= container.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      container.scrollLeft = scrollPosition;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Pause on hover/touch
    const handleInteractionStart = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

    const handleInteractionEnd = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    container.addEventListener('mouseenter', handleInteractionStart);
    container.addEventListener('mouseleave', handleInteractionEnd);
    container.addEventListener('touchstart', handleInteractionStart, { passive: true });
    container.addEventListener('touchend', handleInteractionEnd, { passive: true });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      container.removeEventListener('mouseenter', handleInteractionStart);
      container.removeEventListener('mouseleave', handleInteractionEnd);
      container.removeEventListener('touchstart', handleInteractionStart);
      container.removeEventListener('touchend', handleInteractionEnd);
    };
  }, [isMobile]);

  return (
    <section id="tech" className="site-section relative overflow-hidden">
      {/* Video Background - Optimized */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          willChange: "auto",
        }}
      >
        <source src="/videos/7513671-uhd_3840_2160_24fps.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4))",
          zIndex: 1,
        }}
      />

      {/* Top Vignette */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "25%",
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.8) 40%, transparent 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Bottom Vignette */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "30%",
          background: "linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.7) 40%, transparent 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Side Vignettes */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.5) 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div className="section-inner relative z-10" style={{ zIndex: 10 }}>
        <h2 className="text-center mb-6 text-[#EAEFEF] text-3xl md:text-4xl font-light tracking-tight"
          style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)" }}>
          Tech Stack
        </h2>

        <p className="text-center max-w-[600px] mx-auto mb-10 md:mb-14 text-[rgba(234,239,239,0.8)] text-sm md:text-base leading-relaxed"
          style={{ textShadow: "0 1px 4px rgba(0, 0, 0, 0.4)" }}>
          A collection of the tools and technologies I use to build ideas into real products.
        </p>

        {/* Desktop: Grid Layout */}
        {!isMobile && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1100px] mx-auto px-6">
            {techCategories.map((category, idx) => (
              <div key={idx} className={idx === 2 ? "md:col-span-2 md:flex md:justify-center" : ""}>
                <CategoryCard
                  category={category}
                  isHovered={hoveredCategory === idx}
                  onMouseEnter={() => setHoveredCategory(idx)}
                  onMouseLeave={() => setHoveredCategory(null)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Mobile: Auto-scrolling Carousel */}
        {isMobile && (
          <div className="relative w-full overflow-hidden">
            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-hidden px-4"
              style={{
                scrollBehavior: 'auto',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {/* Render items twice for seamless loop */}
              {[...techCategories, ...techCategories].map((category, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-[280px]"
                >
                  <CategoryCard
                    category={category}
                    isHovered={false}
                    onMouseEnter={() => {}}
                    onMouseLeave={() => {}}
                    isMobile={true}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// Separate component for category card
function CategoryCard({
  category,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  isMobile = false,
}: {
  category: typeof techCategories[0];
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isMobile?: boolean;
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="h-full"
      style={{
        padding: isMobile ? "24px 20px" : "28px 24px",
        background: isHovered 
          ? category.color 
          : "rgba(234, 239, 239, 0.06)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: `1px solid ${isHovered ? category.borderColor : "rgba(234, 239, 239, 0.15)"}`,
        borderRadius: "10px",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: isMobile ? "default" : "pointer",
        transform: isHovered && !isMobile ? "translateY(-4px)" : "translateY(0)",
        boxShadow: isHovered && !isMobile
          ? `0 12px 32px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(232, 234, 237, 0.08)`
          : "0 4px 12px rgba(0, 0, 0, 0.2)",
        willChange: "transform, background, box-shadow",
      }}
    >
      {/* Header dengan Icon */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <h3 className="m-0 text-base md:text-lg font-normal text-[#EAEFEF] tracking-wide">
          {category.title}
        </h3>
      </div>

      {/* Accent Line */}
      <div
        style={{
          height: "2px",
          background: "#FFFFFF",
          marginBottom: 18,
          borderRadius: "1px",
          opacity: isHovered && !isMobile ? 1 : 0.4,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Tech Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {category.techs.map((tech, techIdx) => (
          <span
            key={techIdx}
            className="inline-block px-3 py-1.5 text-xs md:text-sm font-light tracking-wide capitalize text-[#EAEFEF]"
            style={{
              background: isHovered && !isMobile
                ? "rgba(232, 234, 237, 0.12)"
                : "rgba(232, 234, 237, 0.06)",
              border: `0.5px solid rgba(232, 234, 237, ${isHovered && !isMobile ? "0.4" : "0.2"})`,
              borderRadius: "4px",
              transition: "all 0.2s ease",
              textShadow: "0 0.5px 2px rgba(0, 0, 0, 0.3)",
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.background = "rgba(232, 234, 237, 0.15)";
                e.currentTarget.style.borderColor = "rgba(232, 234, 237, 0.5)";
                e.currentTarget.style.transform = "scale(1.05)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.currentTarget.style.background = isHovered
                  ? "rgba(232, 234, 237, 0.12)"
                  : "rgba(232, 234, 237, 0.06)";
                e.currentTarget.style.borderColor = `rgba(232, 234, 237, ${isHovered ? "0.4" : "0.2"})`;
                e.currentTarget.style.transform = "scale(1)";
              }
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}


