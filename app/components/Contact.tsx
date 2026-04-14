"use client";

import React from "react";
import Section from "./Section";
import RainingEffect from "./RainingEffect";

export default function Contact() {
  const site = require("../config/site.config")
    .site as typeof import("../config/site.config").site;

  return (
    <Section id="contact" className="relative">
      <RainingEffect />
      <div className="w-full flex flex-col items-center relative z-10">
        <h2 className="text-center mb-5 text-3xl md:text-4xl">Let's Connect</h2>

        <p className="text-center max-w-[650px] mx-auto mb-12 md:mb-16 text-[var(--text-secondary)] text-sm md:text-base leading-relaxed font-light px-4">
          Reach out through any of these channels. I'd love to hear from you!
        </p>

        {/* Social Links with Labels */}
        <div className="flex flex-col gap-8 md:gap-10 items-center">
          {/* Email */}
          <a
            href={`mailto:jatayu2211@gmail.com`}
            className="flex items-center gap-4 opacity-70 transition-all duration-300 hover:opacity-100 hover:-translate-y-1 group"
          >
            <img
              src="/logos/email-icon.svg"
              alt="Email"
              className="w-10 h-10 object-contain"
            />
            <span className="text-sm md:text-base text-[var(--light)] font-light group-hover:text-white">
              jatayu2211@gmail.com
            </span>
          </a>

          {/* LinkedIn */}
          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 opacity-70 transition-all duration-300 hover:opacity-100 hover:-translate-y-1 group"
          >
            <img
              src="/logos/ln-logo.png"
              alt="LinkedIn"
              className="w-10 h-10 object-contain"
            />
            <span className="text-sm md:text-base text-[var(--light)] font-light group-hover:text-white">
              Nalendra Magi Jatayu
            </span>
          </a>

          {/* Instagram */}
          <a
            href={site.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 opacity-70 transition-all duration-300 hover:opacity-100 hover:-translate-y-1 group"
          >
            <img
              src="/logos/Instagram-Logo.png"
              alt="Instagram"
              className="w-10 h-10 object-contain"
            />
            <span className="text-sm md:text-base text-[var(--light)] font-light group-hover:text-white">
              @nalndra
            </span>
          </a>

          {/* GitHub */}
          <a
            href={site.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 opacity-70 transition-all duration-300 hover:opacity-100 hover:-translate-y-1 group"
          >
            <img
              src="/logos/githubLogo.png"
              alt="GitHub"
              className="w-10 h-10 object-contain"
            />
            <span className="text-sm md:text-base text-[var(--light)] font-light group-hover:text-white">
              nalndra
            </span>
          </a>
        </div>
      </div>
    </Section>
  );
}
