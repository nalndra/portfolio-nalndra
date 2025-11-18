import React, { useState, useEffect } from "react";
import { site } from "../config/site.config";

export default function Hero() {
  const roles = [
    "UI/UX Designer",
    "Mobile App Developer",
    "Web Developer",
    "Game Developer",
    "Game Designer",
    "Front End Developer",
    "Back End Developer",
    "2D Artist"
  ];

  const softSkills = [
    "Problem Solver",
    "Lifelong Learner",
    "Creative Thinker",
    "Innovative Creator",
    "Logical Explorer"
  ];

  const [currentRole, setCurrentRole] = useState(0);
  const [currentSkill, setCurrentSkill] = useState(0);

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(roleInterval);
  }, []);

  useEffect(() => {
    const skillInterval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % softSkills.length);
    }, 3000);
    return () => clearInterval(skillInterval);
  }, []);

  return (
    <section id="home" className="site-section relative overflow-hidden">
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
        <source src="/videos/stars.mp4" type="video/mp4" />
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

      {/* Content */}
      <div className="section-inner relative z-10 center-full" style={{ flexDirection: "column", gap: 24, marginTop: "-90px", zIndex: 10 }}>
        <h1 className="text-4xl md:text-5xl lg:text-6xl m-0 font-extralight tracking-tight leading-tight text-[#EAEFEF]" 
            style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)" }}>
          NALENDRA JATAYU
        </h1>

        {/* Profile Picture */}
        <div
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "3px solid rgba(234, 239, 239, 0.3)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
            marginBottom: "8px",
          }}
        >
          <img
            src="/logos/nalendraforprofile1x1.jpg"
            alt="Nalendra Jatayu"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Role and Soft Skills Row */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-24 mt-2 min-h-[60px]">
          {/* Left - Roles */}
          <div className="text-base md:text-xl lg:text-2xl text-[rgba(234,239,239,0.8)] font-light tracking-wide text-center md:text-right"
               style={{ textShadow: "0 1px 4px rgba(0, 0, 0, 0.4)" }}>
            <span style={{
              display: "inline-block",
              animation: `fadeInOut 3s ease-in-out infinite`,
            }}>
              &lt;{roles[currentRole]}&gt;
            </span>
          </div>

          {/* Right - Soft Skills */}
          <div className="text-base md:text-xl lg:text-2xl text-[rgba(234,239,239,0.8)] font-light tracking-wide text-center md:text-left"
               style={{ textShadow: "0 1px 4px rgba(0, 0, 0, 0.4)" }}>
            <span style={{
              display: "inline-block",
              animation: `fadeInOut 3s ease-in-out infinite`,
            }}>
              &lt;{softSkills[currentSkill]}&gt;
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}

