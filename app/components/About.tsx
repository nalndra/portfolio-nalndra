"use client";

import React from "react";
import ModelViewer from "./ModelViewer";
import { site } from "../config/site.config";

export default function About() {
  return (
    <section id="about" className="site-section relative overflow-hidden">
      {/* 3D model as full background */}
      <div className="absolute inset-0 z-0">
        <ModelViewer />
      </div>

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
      
      {/* Content overlay with section-inner for consistency */}
      <div className="section-inner relative z-10">
        <div className="max-w-[700px] w-full px-4 md:px-0">
          <h2 className="mt-0 text-[var(--light)] text-left text-3xl md:text-4xl mb-6 md:mb-8 font-light tracking-tight">
            About Me
          </h2>
          <p className="text-sm md:text-base leading-loose text-[var(--text-secondary)] font-light text-left m-0">
            <span 
              className="bg-gray-800/50 px-1.5 py-1 rounded-sm"
              style={{
                boxDecorationBreak: 'clone',
                WebkitBoxDecorationBreak: 'clone',
                wordSpacing: '0.15em',
              }}
            >
              I'm a curious learner diving into AI, ML, LLMs, and Blockchain. Always excited to understand how new technologies actually work and how they can be applied in the real world. Along the way, I’ve built experience in mobile, web, and game development, and I love mixing hands-on building with continuous learning to create useful and innovative projects.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

