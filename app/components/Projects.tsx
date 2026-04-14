"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";


const projects = [
  {
    id: 1,
    title: "Peak of Ceres",
    category: "Roblox Game Project",
    description: "Skill-based Roblox climbing game with dynamic obstacles and a progressive journey to reach the peak of Ceres.",
    link: "https://www.roblox.com/games/79933209909543/Mount-Ceres-Peak-of-Ceres-ALPHA",
    imageUrl: "/logos/peakofcereslogo.jpg",
    videoUrl: "/videos/peakofcerestrailer.mp4",
  },
  {
    id: 2,
    title: "GiziAI Kaisa",
    category: "AI based nutrition tracker and chatbot",
    description: "AI-powered nutrition assistant that provides personalized diet recommendations and meal planning.",
    link: "https://github.com/nalndra/GiziAI",
    imageUrl: "/logos/GiziAILogo.png",
    videoUrl: "/videos/stars.mp4",
  },
  {
    id: 3,
    title: "Nullify",
    category: "GameJam submission",
    description: "Content moderation simulation where you balance public trust and app rating by reviewing posts. Survive 7 days of increasing chaos.",
    link: "https://nalndra.itch.io/nullify",
    imageUrl: "/logos/nullify_logo.png",
    videoUrl: "/videos/nullifyclip.mp4",
  },
  {
    id: 4,
    title: "RE:member",
    category: "gamified portfolio web game",
    description: "A retro-styled game with simple yet deep lore about life's memories and experiences. Explore the journey through pixelated nostalgia.",
    link: "https://github.com/nalndra/REmember-Child-of-Memory",
    imageUrl: "/logos/ChildofMemory.png",
    videoUrl: "/videos/stars.mp4",
  },
];

// ─── Carousel (Mobile) ────────────────────────────────────────────────────────

function Carousel({
  items,
  activeMobileId,
  setActiveMobileId,
}: {
  items: typeof projects;
  activeMobileId: number | null;
  setActiveMobileId: (id: number | null) => void;
}) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [width, setWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const update = () => containerRef.current && setWidth(containerRef.current.offsetWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scheduleAuto = useCallback(() => {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    autoTimerRef.current = setTimeout(
      () => setIndex((p) => (p + 1) % items.length),
      10_000
    );
  }, [items.length]);

  useEffect(() => {
    scheduleAuto();
    return () => { if (autoTimerRef.current) clearTimeout(autoTimerRef.current); };
  }, [index, scheduleAuto]);

  const go = (dir: "left" | "right") => {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    setIndex((p) =>
      dir === "left" ? Math.min(p + 1, items.length - 1) : Math.max(p - 1, 0)
    );
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto overflow-hidden select-none">
      <motion.div
        ref={containerRef}
        className="flex"
        drag="x"
        dragConstraints={{ left: -width * (items.length - 1), right: 0 }}
        dragElastic={0.2}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          if (info.offset.x < -50) go("left");
          if (info.offset.x > 50) go("right");
        }}
        animate={{ x: -index * width }}
        transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="min-w-full flex items-center justify-center px-2"
            style={{ height: 420 }}
          >
            <ProjectCard
              project={item}
              isMobile
              isActive={i === index}
              currentIndex={index}
              isDragging={isDragging}
              activeMobileId={activeMobileId}
              setActiveMobileId={setActiveMobileId}
            />
          </div>
        ))}
      </motion.div>

      <div className="flex justify-center mt-4 gap-3">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
              setIndex(i);
            }}
            className={`w-1.5 h-1.5 rounded-full transition-all border ${
              i === index ? "bg-white border-white" : "border-gray-500 bg-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeMobileId, setActiveMobileId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Two rows of 2 projects each
  const rows = [projects.slice(0, 2), projects.slice(2, 4)];

  const rowTemplate = (rowIndex: number) => {
    if (!hoveredId) return "1fr 1fr";
    const hoveredRow = Math.floor((hoveredId - 1) / 2);
    if (rowIndex !== hoveredRow) return "1fr 1fr";
    const col = (hoveredId - 1) % 2;
    return col === 0 ? "1.8fr 1fr" : "1fr 1.8fr";
  };

  return (
    <section id="projects" className="site-section relative">
      {/* Background gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.85) 30%, rgba(15,15,15,0.4) 60%, transparent 94%)",
          zIndex: 0,
        }}
      />
      <div
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{
          height: "20%",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)",
          zIndex: 1,
        }}
      />

      <div className="section-inner relative" style={{ zIndex: 2 }}>
        <h2 className="text-center mb-4 text-3xl md:text-4xl font-extralight text-[var(--light)]">
          Personal Projects
        </h2>
        <p className="text-center mb-20 text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
          Explore my creative journey through innovative game and AI projects.
        </p>

        {/* Desktop grid */}
        {!isMobile && (
          <div className="flex flex-col gap-6 max-w-[1000px] mx-auto">
            {rows.map((rowProjects, rowIndex) => (
              <div
                key={rowIndex}
                className="grid gap-6"
                style={{
                  gridTemplateColumns: rowTemplate(rowIndex),
                  transition: "grid-template-columns 0.32s cubic-bezier(0.4,0,0.2,1)",
                  willChange: "grid-template-columns",
                  transform: "translateZ(0)",
                }}
              >
                {rowProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    hoveredId={hoveredId}
                    onHover={setHoveredId}
                    activeMobileId={activeMobileId}
                    setActiveMobileId={setActiveMobileId}
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Mobile carousel */}
        {isMobile && (
          <Carousel
            items={projects}
            activeMobileId={activeMobileId}
            setActiveMobileId={setActiveMobileId}
          />
        )}
      </div>
    </section>
  );
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  hoveredId,
  onHover,
  isMobile = false,
  isActive = false,
  currentIndex,
  isDragging = false,
  activeMobileId,
  setActiveMobileId,
}: {
  project: (typeof projects)[0];
  hoveredId?: number | null;
  onHover?: (id: number | null) => void;
  isMobile?: boolean;
  isActive?: boolean;
  currentIndex?: number;
  isDragging?: boolean;
  activeMobileId?: number | null;
  setActiveMobileId?: (id: number | null) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [videoVisible, setVideoVisible] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const isHovered = !isMobile && hoveredId === project.id;
  const isMobileActive = isMobile && activeMobileId === project.id;
  const showVideo = isHovered || isMobileActive;

  // ── Preload video via IntersectionObserver ──────────────────────────────
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Kick off metadata load as soon as card is near viewport
          if (videoRef.current && videoRef.current.readyState === 0) {
            videoRef.current.preload = "metadata";
            videoRef.current.load();
          }
        }
      },
      { rootMargin: "200px", threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ── Play / pause on hover or mobile-tap ────────────────────────────────
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    if (showVideo) {
      // Reset video to start and play
      vid.currentTime = 0;
      
      // Ensure enough is loaded, then play
      const tryPlay = () => {
        vid.play().catch(() => {
          // If not ready yet, wait for canplay
          vid.addEventListener("canplay", () => vid.play().catch(() => {}), { once: true });
        });
      };

      if (vid.readyState >= 3) {
        tryPlay();
      } else {
        // Upgrade preload to full and wait
        vid.preload = "auto";
        vid.load();
        vid.addEventListener("canplay", () => vid.play().catch(() => {}), { once: true });
      }

      setVideoVisible(true);
    } else {
      vid.pause();
      vid.currentTime = 0;
      setVideoVisible(false);
    }
  }, [showVideo]);

  // ── Reset on carousel swipe ─────────────────────────────────────────────
  useEffect(() => {
    if (!isMobile) return;
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;
    setVideoVisible(false);
    setActiveMobileId?.(null);
  }, [currentIndex]);

  const handleMouseEnter = () => {
    onHover?.(project.id);
  };
  const handleMouseLeave = () => {
    onHover?.(null);
  };
  const handleClick = () => {
    if (!isMobile || !setActiveMobileId) return;
    if (isMobileActive) {
      setActiveMobileId(null);
    } else {
      setActiveMobileId(project.id);
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 8,
        cursor: "pointer",
        height: isMobile ? 420 : 350,
        background: "rgba(10, 10, 12, 0.85)",
        border: `1px solid rgba(255,255,255,${isHovered ? 0.18 : 0.07})`,
        transition: isDragging
          ? "none"
          : "border-color 0.32s ease, box-shadow 0.32s ease",
        boxShadow: isHovered
          ? "0 12px 40px rgba(0,0,0,0.55)"
          : "0 2px 8px rgba(0,0,0,0.25)",
        willChange: isHovered || showVideo ? "transform" : "auto",
        contain: "paint",
        pointerEvents: isDragging ? "none" : "auto",
      }}
    >
      {/* Thumbnail image */}
      <img
        src={project.imageUrl}
        alt={project.title}
        loading="lazy"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          opacity: videoVisible && videoReady ? 0 : 1,
          transition: "opacity 0.3s ease",
          transform: "translateZ(0)",
        }}
      />

      {/* Video */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="none"
        poster={project.imageUrl}
        src={project.videoUrl}
        onCanPlay={() => setVideoReady(true)}
        onLoadedMetadata={() => setVideoReady(true)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          opacity: videoVisible && videoReady ? 1 : 0,
          transition: "opacity 0.28s ease",
          transform: "translateZ(0)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Overlay gradient — default state */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.15) 100%)",
          zIndex: 3,
          pointerEvents: "none",
          opacity: isHovered || isMobileActive ? 0 : 1,
          transition: "opacity 0.32s ease",
        }}
      />

      {/* Overlay gradient — hover state */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.25) 100%)",
          zIndex: 3,
          pointerEvents: "none",
          opacity: isHovered || isMobileActive ? 1 : 0,
          transition: "opacity 0.32s ease",
        }}
      />

      {/* Card content */}
      <div
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 24,
          zIndex: 10,
        }}
      >
        {/* Category tag */}
        <div
          style={{
            fontSize: "0.7rem",
            color: "rgba(200,200,200,0.7)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginBottom: 6,
            opacity: showVideo ? 0 : 1,
            transform: `translateY(${showVideo ? -6 : 0}px)`,
            transition: "opacity 0.28s ease, transform 0.28s ease",
          }}
        >
          {project.category}
        </div>

        {/* Title */}
        <h3
          style={{
            margin: 0,
            fontWeight: 300,
            color: "var(--light, #fff)",
            letterSpacing: "-0.01em",
            lineHeight: 1.05,
            fontSize: isMobile ? "clamp(1rem, 4vw, 1.25rem)" : "1.4rem",
            transform: `translateY(${showVideo ? 28 : isHovered ? 24 : 0}px)`,
            marginBottom: 10,
            transition: "transform 0.32s ease",
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          style={{
            margin: 0,
            marginBottom: 12,
            color: "#9ca3a2",
            fontSize: isMobile ? "clamp(0.8rem, 3.2vw, 0.92rem)" : "0.9rem",
            lineHeight: 1.55,
            fontWeight: 300,
            opacity: showVideo ? 0 : 1,
            transform: `translateY(${isHovered ? -8 : 0}px)`,
            transition: "opacity 0.28s ease, transform 0.28s ease",
            visibility: showVideo ? "hidden" : "visible",
          }}
        >
          {project.description}
        </p>

        {/* CTA */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: "#fff",
            fontSize: "0.78rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontWeight: 400,
            textDecoration: "none",
            textShadow: "0 0 12px rgba(255,255,255,0.7)",
            opacity: isHovered || isMobileActive ? 1 : 0.6,
            transform: `translateY(${showVideo ? 0 : isHovered ? 0 : 6}px)`,
            transition: "opacity 0.28s ease, transform 0.28s ease, gap 0.2s ease",
            pointerEvents: "auto",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.gap = "14px";
            (e.currentTarget as HTMLElement).style.textShadow = "0 0 18px rgba(255,255,255,1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.gap = "8px";
            (e.currentTarget as HTMLElement).style.textShadow = "0 0 12px rgba(255,255,255,0.7)";
          }}
          onClick={(e) => e.stopPropagation()}
        >
          View Project <span style={{ fontSize: "1.1rem" }}>→</span>
        </a>
      </div>

      {/* Hover border glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 8,
          border: `1.5px solid rgba(255,255,255,${isHovered ? 0.2 : 0})`,
          pointerEvents: "none",
          zIndex: 15,
          transition: "border-color 0.32s ease",
        }}
      />
    </div>
  );
}


