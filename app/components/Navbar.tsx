"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = 0;
    let ticking = false;
    let scrollTimeout: NodeJS.Timeout;

    const onScroll = () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(lastScrollY > 20);
          ticking = false;
        });
        ticking = true;
      }

      // Throttle scroll events
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        ticking = false;
      }, 16); // ~60fps
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-400"
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          background: "rgba(var(--primary-rgb), 0.5)",
          boxShadow: "none",
          willChange: "background",
        }}
      >
        <div className="px-4 md:px-12 py-3 md:py-4">
          <div className="flex items-center justify-between max-w-[1400px] mx-auto relative min-h-[50px] md:min-h-[70px]">
            {/* CENTER LOGO */}
            <button
              onClick={() => scrollToSection("home")}
              className="absolute left-1/2 -translate-x-1/2 bg-transparent border-0 cursor-pointer p-0 transition-transform duration-300 z-10 hover:scale-110"
            >
              <Image
                src="/logos/logo_nln_white.png"
                alt="Logo"
                width={50}
                height={50}
                priority
                className="w-10 md:w-12 lg:w-[70px] drop-shadow-lg"
              />
            </button>

            {/* DESKTOP NAVIGATION */}
            <ul className="hidden md:flex gap-4 lg:gap-8 list-none m-0 p-0 items-center ml-auto pl-4">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About" },
                { id: "tech", label: "Tech" },
                { id: "projects", label: "Projects" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="nav-link bg-transparent border-0 text-[var(--light)] text-xs md:text-sm font-normal tracking-wide cursor-pointer py-2 px-0 relative transition-all duration-300"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* MOBILE HAMBURGER */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden ml-auto z-20 bg-transparent border-0 cursor-pointer p-2 flex flex-col gap-1.5"
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-[var(--light)] transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-[var(--light)] transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-[var(--light)] transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Gradient White Line Separator - Inside Nav */}
        <div
          className="w-[90%] md:w-4/5 max-w-[1200px] h-0.5 mx-auto transition-opacity duration-400"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(var(--light-rgb), 0.3) 20%, rgba(var(--light-rgb), 0.6) 50%, rgba(var(--light-rgb), 0.3) 80%, transparent 100%)",
            opacity: scrolled ? 0.4 : 0.6,
          }}
        />
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden fixed top-[66px] left-0 right-0 z-[999] transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          background: "rgba(var(--primary-rgb), 0.95)",
          borderBottom: "1px solid rgba(var(--light-rgb), 0.1)",
        }}
      >
        <ul className="flex flex-col list-none m-0 p-0">
          {[
            { id: "home", label: "Home" },
            { id: "about", label: "About" },
            { id: "tech", label: "Tech" },
            { id: "projects", label: "Projects" },
            { id: "contact", label: "Contact" },
          ].map((item, idx) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className="w-full text-left bg-transparent border-0 text-[var(--light)] text-base font-normal tracking-wide cursor-pointer py-4 px-6 transition-all duration-300 hover:bg-[rgba(var(--light-rgb),0.05)]"
                style={{
                  borderBottom: idx < 4 ? "1px solid rgba(var(--light-rgb), 0.05)" : "none",
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

