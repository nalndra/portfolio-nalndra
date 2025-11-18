"use client";

import React, { useState, useEffect } from "react";

import IntroAnimation from "./components/IntroAnimation";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (showIntro) return;

    const handleScroll = () => {
      const contactSection = document.getElementById("contact");
      if (!contactSection) return;

      const contactTop = contactSection.offsetTop;
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Start transition only when Contact section is about to appear
      const transitionStart = contactTop - windowHeight * 0.8;
      const transitionEnd = contactTop - windowHeight * 0.2;

      let progress = 0;

      if (scrollPosition < transitionStart) {
        progress = 0; // Dark theme
      } else if (scrollPosition > transitionEnd) {
        progress = 1; // Light theme
      } else {
        // Calculate progress (0 to 1)
        progress = (scrollPosition - transitionStart) / (transitionEnd - transitionStart);
      }

      // Smooth easing
      progress = Math.min(1, Math.max(0, progress));
      const eased = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      // Interpolate colors
      const darkPrimary = [15, 15, 15];
      const lightPrimary = [160, 160, 165]; // Even darker light gray background

      const darkSecondary = [26, 26, 30];
      const lightSecondary = [180, 180, 185]; // Even darker light gray surface

      const darkAccent = [74, 85, 104];
      const lightAccent = [70, 75, 85]; // More muted accent

      const darkLight = [232, 234, 237];
      const lightLight = [15, 15, 20]; // Much darker text for light background

      const interpolate = (start: number[], end: number[], progress: number) => {
        return start.map((s, i) => Math.round(s + (end[i] - s) * progress));
      };

      const newPrimary = interpolate(darkPrimary, lightPrimary, eased);
      const newSecondary = interpolate(darkSecondary, lightSecondary, eased);
      const newAccent = interpolate(darkAccent, lightAccent, eased);
      const newLight = interpolate(darkLight, lightLight, eased);

      // Update CSS variables
      document.documentElement.style.setProperty('--primary-rgb', newPrimary.join(','));
      document.documentElement.style.setProperty('--secondary-rgb', newSecondary.join(','));
      document.documentElement.style.setProperty('--accent-rgb', newAccent.join(','));
      document.documentElement.style.setProperty('--light-rgb', newLight.join(','));

      // Update hex values
      const toHex = (rgb: number[]) => 
        '#' + rgb.map(v => v.toString(16).padStart(2, '0')).join('');
      
      document.documentElement.style.setProperty('--color-hex-primary', toHex(newPrimary));
      document.documentElement.style.setProperty('--color-hex-secondary', toHex(newSecondary));
      document.documentElement.style.setProperty('--color-hex-accent', toHex(newAccent));
      document.documentElement.style.setProperty('--color-hex-light', toHex(newLight));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showIntro]);

  return (
    <>
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      
      {!showIntro && (
        <>
          <Navbar />
          <div>
            <Hero />
            <About />
            <TechStack />
            <Projects />
            <Contact />
            <Footer />
          </div>
        </>
      )}
    </>
  );
}
