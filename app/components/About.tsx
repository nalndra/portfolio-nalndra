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

      {/* Bottom Vignette */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "25%",
          background: "linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.8) 40%, transparent 100%)",
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
          <p className="text-base md:text-lg leading-loose text-[var(--text-secondary)] font-light text-left m-0">
            <span 
              className="bg-gray-800/50 px-1.5 py-1 rounded-sm"
              style={{
                boxDecorationBreak: 'clone',
                WebkitBoxDecorationBreak: 'clone',
                wordSpacing: '0.15em',
              }}
            >
              Computer Science/Informatics undergraduate specializing in multiplatform development. Experienced web, mobile, and game developer. Currently active as <strong>Website Developer</strong> at{" "}
              <a 
                href="https://www.tedxtelkomuniversity.online/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300"
                style={{
                  color: 'inherit',
                  textDecoration: 'underline',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textShadow = 'none';
                }}
              >
                <strong>TedX Telkom University</strong>
              </a>
              , building innovative digital experiences through modern technology and practical application.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

