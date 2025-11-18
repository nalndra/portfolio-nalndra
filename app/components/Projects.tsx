"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Peak of Ceres",
    category: "Game Project",
    description: "Skill-based Roblox climbing game with dynamic obstacles and a progressive journey to reach the peak of Ceres.",
    link: "https://www.roblox.com/games/79933209909543/Mount-Ceres-Peak-of-Ceres-ALPHA",
    imageUrl: "/logos/peakofcereslogo.jpg",
    videoUrl: "/videos/peakofcerestrailer.mp4",
  },
  {
    id: 2,
    title: "GiziAI Kaisa",
    category: "Nutrition AI Chatbot",
    description: "AI-powered nutrition assistant that provides personalized diet recommendations and meal planning.",
    link: "/private-repo",
    imageUrl: "/logos/GiziAILogo.png",
    videoUrl: "/videos/stars.mp4", // Placeholder - ganti dengan video Kaisa
  },
  {
    id: 3,
    title: "Simple Crowdfunding",
    category: "CLI Program",
    description: "Command-line interface tool for managing crowdfunding campaigns with ease and efficiency.",
    link: "https://github.com/nalndra/Tubes-Crowdfunding-Sederhana-Go",
    imageUrl: "/logos/crowdfundsimpleLogo.png",
    videoUrl: "/videos/stars.mp4", // Placeholder - ganti dengan video Crowdfunding
  },
  {
    id: 4,
    title: "RE:member",
    category: "Retro Game",
    description: "A retro-styled game with simple yet deep lore about life's memories and experiences. Explore the journey through pixelated nostalgia.",
    link: "/private-repo",
    imageUrl: "/logos/ChildofMemory.png",
    videoUrl: "/videos/stars.mp4", // Placeholder - ganti dengan video RE:member
  },
];

function Carousel({ items, activeMobileId, setActiveMobileId }: { items: typeof projects, activeMobileId: number | null, setActiveMobileId: (id: number | null) => void }) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inactivityTimerRef = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [width, setWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      window.clearTimeout(inactivityTimerRef.current);
    }
    if (isPaused) return;
    inactivityTimerRef.current = window.setTimeout(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 10000);
  };

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) window.clearTimeout(inactivityTimerRef.current);
    };
  }, [index, isPaused]);

  const handleSwipe = (direction: string) => {
    setIsPaused(true);
    if (inactivityTimerRef.current) window.clearTimeout(inactivityTimerRef.current);
    if (direction === "left" && index < items.length - 1) setIndex(index + 1);
    if (direction === "right" && index > 0) setIndex(index - 1);
  };

  const goToIndex = (idx: number) => {
    setIsPaused(true);
    if (inactivityTimerRef.current) window.clearTimeout(inactivityTimerRef.current);
    setIndex(idx);
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto overflow-hidden select-none">
      <motion.div
        ref={containerRef}
        className="flex"
        style={{ willChange: 'transform' }}
        drag="x"
        dragConstraints={{ left: -width * (items.length - 1), right: 0 }}
        dragElastic={0.2}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(e, info) => {
          setIsDragging(false);
          if (info.offset.x < -50) handleSwipe("left");
          if (info.offset.x > 50) handleSwipe("right");
        }}
        animate={{ x: -index * width }}
        transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
      >
        {items.map((item, i) => (
          <div key={i} className="min-w-full flex items-center justify-center px-2" style={{ height: 420 }}>
            <ProjectCard
              project={item}
              index={item.id - 1}
              hoveredId={null}
              onHover={() => {}}
              isMobile={true}
              isActive={i === index}
              currentIndex={index}
              isDragging={isDragging}
              activeMobileId={activeMobileId}
              setActiveMobileId={setActiveMobileId}
              onCardClick={() => {
                setIsPaused(true);
                if (inactivityTimerRef.current) window.clearTimeout(inactivityTimerRef.current);
              }}
            />
          </div>
        ))}
      </motion.div>

      <div className="flex justify-center mt-4 gap-3">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => goToIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all border ${
              i === index ? "bg-white border-white" : "border-gray-500 bg-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeMobileId, setActiveMobileId] = useState<number | null>(null);

  const getGridTemplateForRow = (rowIndex: number, id: number | null) => {
    if (!id) return '1fr 1fr';
    
    const hoveredRow = Math.floor((id - 1) / 2);
    if (rowIndex !== hoveredRow) return '1fr 1fr'; // Cards not in hovered row stay normal
    
    const col = (id - 1) % 2; // 0 = left column, 1 = right column
    return col === 0 ? '2fr 1fr' : '1fr 2fr';
  };

  // Group projects by rows (2 per row)
  const rows = [];
  for (let i = 0; i < projects.length; i += 2) {
    rows.push(projects.slice(i, i + 2));
  }

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="projects" className="site-section relative">
      {/* Gradient Background - Black to Current Color (Ultra Smooth & Seamless) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom, #000000 0%, rgba(0, 0, 0, 0.99) 5%, rgba(0, 0, 0, 0.98) 8%, rgba(2, 2, 2, 0.96) 11%, rgba(4, 4, 4, 0.94) 14%, rgba(6, 6, 6, 0.92) 17%, rgba(8, 8, 8, 0.89) 20%, rgba(10, 10, 10, 0.86) 23%, rgba(11, 11, 11, 0.83) 26%, rgba(12, 12, 12, 0.79) 30%, rgba(13, 13, 13, 0.75) 34%, rgba(14, 14, 14, 0.7) 38%, rgba(15, 15, 15, 0.65) 42%, rgba(15, 15, 15, 0.58) 47%, rgba(15, 15, 15, 0.5) 52%, rgba(15, 15, 15, 0.42) 58%, rgba(15, 15, 15, 0.33) 64%, rgba(15, 15, 15, 0.24) 70%, rgba(15, 15, 15, 0.16) 76%, rgba(15, 15, 15, 0.1) 82%, rgba(15, 15, 15, 0.05) 88%, transparent 94%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Top Vignette */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "20%",
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div className="section-inner relative" style={{ zIndex: 2 }}>
        <h2 className="text-center mb-20 text-3xl md:text-4xl font-extralight text-[var(--light)]">
          Featured Projects
        </h2>

        {/* Desktop/grid layout */}
        {!isMobile && (
          <div className="flex flex-col gap-6 max-w-[1000px] mx-auto">
            {rows.map((rowProjects, rowIndex) => (
              <div
                key={rowIndex}
                className="grid gap-6"
                style={{
                  gridTemplateColumns: getGridTemplateForRow(rowIndex, hoveredId),
                  transition: 'grid-template-columns 0.5s ease-out',
                }}
              >
                {rowProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={project.id - 1}
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

        {isMobile && (
          <Carousel items={projects} activeMobileId={activeMobileId} setActiveMobileId={setActiveMobileId} />
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  hoveredId,
  onHover,
  isMobile = false,
  onCardClick,
  isActive = false,
  currentIndex,
  isDragging = false,
  activeMobileId,
  setActiveMobileId,
}: {
  project: (typeof projects)[0];
  index: number;
  hoveredId: number | null;
  onHover: (id: number | null) => void;
  isMobile?: boolean;
  onCardClick?: () => void;
  isActive?: boolean;
  currentIndex?: number;
  isDragging?: boolean;
  activeMobileId?: number | null;
  setActiveMobileId?: (id: number | null) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlayed, setVideoPlayed] = useState(false);
  const isHovered = hoveredId === project.id;
  const showVideo = isHovered || (isMobile && videoPlayed);
  const isMobileActive = isMobile && activeMobileId === project.id;
  
  // Reset video when index changes
  useEffect(() => {
    if (isMobile && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setVideoPlayed(false);
    }
    if (isMobile && setActiveMobileId) {
      setActiveMobileId(null);
    }
  }, [currentIndex, isMobile]);
  
  // Only shrink cards in the same row
  const hoveredRow = hoveredId ? Math.floor((hoveredId - 1) / 2) : null;
  const currentRow = Math.floor(index / 2);
  const isShrunk = hoveredId !== null && hoveredId !== project.id && hoveredRow === currentRow;
  
  const handleMouseEnter = () => {
    onHover(project.id);
    if (!isMobile && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  };

  const handleMouseLeave = () => {
    onHover(null);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleCardClick = () => {
    if (onCardClick) onCardClick();
    if (isMobile && setActiveMobileId) {
      if (videoPlayed) {
        // Stop video and reset UI
        if (videoRef.current) {
          videoRef.current.pause();
          setVideoPlayed(false);
        }
        setActiveMobileId(null);
      } else {
        // Start video and activate UI
        setActiveMobileId(project.id);
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
          setVideoPlayed(true);
        }
      }
    }
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg transition-all duration-500 ease-out cursor-pointer group"
      style={{
        background: "rgba(var(--secondary-rgb), 0.7)",
        backdropFilter: isDragging ? "none" : "blur(8px)",
        border: isMobile ? "2px solid rgba(var(--accent-rgb), 0.3)" : "1px solid rgba(var(--accent-rgb), 0.2)",
        height: isMobile ? "420px" : "350px",
        opacity: isShrunk ? 0.6 : 1,
        zIndex: isHovered ? 20 : 1,
        boxShadow: isDragging ? "none" : (isHovered
          ? "0 8px 32px rgba(0, 0, 0, 0.4)"
          : "0 2px 8px rgba(0, 0, 0, 0.2)"),
        pointerEvents: isDragging ? "none" : "auto",
        transition: isDragging ? "none" : "all 0.4s ease",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      {/* Default Image Background */}
      {project.imageUrl && (
        <img
          src={project.imageUrl}
          alt={project.title}
          className="absolute inset-0 w-full h-full transition-opacity duration-500"
          style={{
            opacity: showVideo ? 0 : 1,
            pointerEvents: 'none',
            objectFit: 'cover',
            objectPosition: 'center',
            backgroundColor: '#070707',
            transform: isHovered && !isMobile ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
        />
      )}

      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full transition-opacity duration-500"
        style={{
          opacity: showVideo && !isDragging ? 0.9 : 0,
          pointerEvents: 'none',
          objectFit: 'cover',
          objectPosition: 'center',
          backgroundColor: '#070707',
          zIndex: 5,
          transform: isHovered && !isMobile ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.5s ease',
        }}
        loop
        muted
        playsInline
        preload="none"
        src={project.videoUrl}
        onClick={() => {
          if (videoRef.current) {
            if (videoRef.current.paused) {
              videoRef.current.play().catch(() => {});
            } else {
              videoRef.current.pause();
              setVideoPlayed(false);
            }
          }
        }}
        onPlay={() => {
          if (onCardClick) onCardClick();
        }}
      />

      {/* Gradient Overlay (non-blocking) */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          pointerEvents: 'none',
          background: isHovered || (isMobile && isActive)
            ? "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 transition-all duration-500"
        style={{
          pointerEvents: 'auto',
          zIndex: 20,
          transition: isDragging ? "none" : "all 0.4s ease",
        }}
      >
        <div
          className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-2 font-normal transition-all duration-500"
          style={{
            opacity: isHovered || showVideo || isMobileActive ? 0 : 1,
            transform: isHovered ? "translateY(-10px)" : "translateY(0)",
          }}
        >
          {project.category}
        </div>
        
        <h3
          className="m-0 font-light text-[var(--light)] tracking-tight transition-all duration-500"
          style={{
            fontSize: isMobileActive
              ? "clamp(1.8rem, 7vw, 2.6rem)"
              : isHovered
              ? "clamp(1.25rem, 5vw, 2rem)"
              : isMobile
              ? "clamp(1rem, 4vw, 1.25rem)"
              : "1.5rem",
            transform: isMobileActive
              ? "translateY(20px)"
              : showVideo && !isMobile
              ? "translateY(30px)"
              : isHovered
              ? "translateY(20px)"
              : "translateY(0)",
            lineHeight: '1.05',
            marginBottom: isMobileActive ? "0px" : showVideo ? '20px' : '12px',
          }}
        >
          {project.title}
        </h3>

        <p
          className="m-0 mb-4 text-[#9ca3a2] leading-relaxed font-light transition-all duration-500"
          style={{
            fontSize: isMobile ? 'clamp(0.8rem, 3.2vw, 0.95rem)' : '0.95rem',
            opacity: isMobileActive ? 0 : showVideo ? 0 : 1,
            transform: isMobileActive ? "translateY(0)" : isHovered ? "translateY(-10px)" : "translateY(0)",
            maxHeight: isMobileActive ? "0px" : showVideo ? "0" : "200px",
          }}
        >
          {project.description}
        </p>

        <a
          href={project.link}
          className="inline-flex items-center gap-2 text-white text-sm uppercase tracking-wide font-normal no-underline transition-all duration-300 mt-4"
          style={{
            opacity: 1,
            transform: showVideo ? (isMobile ? "translateY(0)" : "translateY(20px)") : isHovered ? "translateY(0)" : "translateY(10px)",
            pointerEvents: 'auto',
            zIndex: 15,
            color: 'white',
            textShadow: "0 0 12px rgba(255, 255, 255, 0.8)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.gap = "12px";
            e.currentTarget.style.textShadow = "0 0 16px rgba(255, 255, 255, 1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.gap = "8px";
            e.currentTarget.style.textShadow = "0 0 12px rgba(255, 255, 255, 0.8)";
          }}
        >
          View Project
          <span style={{ fontSize: "1.2rem", color: 'white' }}>→</span>
        </a>
      </div>

      {/* Hover Border Effect */}
      <div
        className="absolute inset-0 border-2 transition-all duration-500 pointer-events-none rounded-lg"
        style={{
          borderColor: isHovered
            ? "rgba(var(--accent-rgb), 0.6)"
            : "transparent",
        }}
      />
    </div>
  );
}


