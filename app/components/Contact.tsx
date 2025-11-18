"use client";

import React, { useState } from "react";
import Section from "./Section";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<null | string>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const site = require("../config/site.config")
    .site as typeof import("../config/site.config").site;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const recipient = site.email || "you@example.com";
    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(
      "Contact from portfolio"
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    )}`;
    window.location.href = mailto;
    setStatus("Opening mail client...");
  }

  const isFormInteracted = name || email || message || focusedField;

  return (
    <Section id="contact">
      <div className="w-full flex flex-col items-center">
        <h2 className="text-center mb-5 text-3xl md:text-4xl">Get in Touch</h2>

        <p className="text-center max-w-[650px] mx-auto mb-8 md:mb-12 text-[var(--text-secondary)] text-sm md:text-base leading-relaxed font-light px-4">
          Have a project in mind or want to collaborate? Drop me a message and I'll get back to you promptly.
        </p>

        <div className="w-full max-w-[820px] px-4 md:px-6 mx-auto">
        {/* Glow wrapper */}
        <div
          className="relative rounded-[10px] p-0.5 transition-all duration-500"
          style={{
            background: isFormInteracted
              ? "linear-gradient(135deg, rgba(255,255,255,0.3), rgba(200,200,200,0.2))"
              : "transparent",
            boxShadow: isFormInteracted
              ? "0 0 40px rgba(0,0,0,0.15), inset 0 0 15px rgba(255,255,255,0.1)"
              : "0 0 0 rgba(0,0,0,0)",
          }}
        >
          {/* Form Container */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 md:gap-7 p-6 md:p-12 rounded-[9px] border transition-all duration-300"
            style={{
              background: "rgba(var(--secondary-rgb), 1)",
              borderColor: "rgba(var(--light-rgb), 0.15)",
            }}
          >
            {/* Full Name */}
            <div>
              <label className="block mb-2.5 text-xs font-medium tracking-wider uppercase transition-colors duration-300"
                style={{
                  color: focusedField === "name" ? "var(--light)" : "var(--text-secondary)",
                }}>
                Full Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter your full name"
                required
                className="w-full px-3.5 py-3 rounded-md text-[var(--light)] text-sm md:text-base font-light transition-all duration-300 outline-none"
                style={{
                  background: "rgba(var(--primary-rgb), 0.4)",
                  border: focusedField === "name"
                    ? "1.5px solid rgba(var(--light-rgb), 0.3)"
                    : "1px solid rgba(var(--light-rgb), 0.15)",
                  boxShadow: focusedField === "name"
                    ? `0 0 12px rgba(var(--light-rgb), 0.1), inset 0 0 6px rgba(var(--light-rgb), 0.05)`
                    : "none",
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2.5 text-xs font-medium tracking-wider uppercase transition-colors duration-300"
                style={{
                  color: focusedField === "email" ? "var(--light)" : "var(--text-secondary)",
                }}>
                Email Address
              </label>

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                type="email"
                placeholder="Enter your email address"
                required
                className="w-full px-3.5 py-3 rounded-md text-[var(--light)] text-sm md:text-base font-light transition-all duration-300 outline-none"
                style={{
                  background: "rgba(var(--primary-rgb), 0.4)",
                  border: focusedField === "email"
                    ? "1.5px solid rgba(var(--light-rgb), 0.3)"
                    : "1px solid rgba(var(--light-rgb), 0.15)",
                  boxShadow: focusedField === "email"
                    ? `0 0 12px rgba(var(--light-rgb), 0.1), inset 0 0 6px rgba(var(--light-rgb), 0.05)`
                    : "none",
                }}
              />
            </div>

            {/* Message */}
            <div>
              <label className="block mb-2.5 text-xs font-medium tracking-wider uppercase transition-colors duration-300"
                style={{
                  color: focusedField === "message" ? "var(--light)" : "var(--text-secondary)",
                }}>
                Message
              </label>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                rows={7}
                placeholder="Share your thoughts, project ideas, or any questions..."
                required
                className="w-full px-3.5 py-3 rounded-md text-[var(--light)] text-sm md:text-base leading-relaxed min-h-[150px] font-light transition-all duration-300 outline-none resize-y"
                style={{
                  background: "rgba(var(--primary-rgb), 0.4)",
                  border: focusedField === "message"
                    ? "1.5px solid rgba(var(--light-rgb), 0.3)"
                    : "1px solid rgba(var(--light-rgb), 0.15)",
                  boxShadow: focusedField === "message"
                    ? `0 0 12px rgba(var(--light-rgb), 0.1), inset 0 0 6px rgba(var(--light-rgb), 0.05)`
                    : "none",
                }}
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="self-start mt-2 px-6 md:px-8 py-3 text-sm md:text-base rounded-md font-normal uppercase tracking-wider transition-all duration-300 outline-none"
              style={{
                background: "rgba(0, 0, 0, 0.9)",
                color: "rgba(255, 255, 255, 0.95)",
                border: "1px solid rgba(0, 0, 0, 1)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0, 0, 0, 1)";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0, 0, 0, 0.9)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.3)";
              }}
            >
              Send Message
            </button>

            {status && (
              <p className="text-center text-[var(--text-secondary)] text-sm mt-2">
                {status}
              </p>
            )}
          </form>
        </div>

        {/* Social Links */}
        <div className="mt-12 md:mt-16 text-center pt-8 md:pt-9 border-t border-[rgba(var(--accent-rgb),0.15)]">
          <p className="mb-4 md:mb-5 text-[var(--text-secondary)] text-xs tracking-wider uppercase font-medium">
            Connect with me
          </p>

          <div className="flex gap-8 md:gap-10 justify-center items-center flex-wrap">
            <a
              href={site.socials.linkedin}
              target="_blank"
              className="opacity-70 transition-all duration-300 hover:opacity-100 hover:-translate-y-1"
              style={{ display: "block" }}
            >
              <img
                src="/logos/ln-logo.png"
                alt="LinkedIn"
                style={{ width: "40px", height: "40px", objectFit: "contain" }}
              />
            </a>

            <a
              href={site.socials.github}
              target="_blank"
              className="opacity-70 transition-all duration-300 hover:opacity-100 hover:-translate-y-1"
              style={{ display: "block" }}
            >
              <img
                src="/logos/githubLogo.png"
                alt="GitHub"
                style={{ width: "40px", height: "40px", objectFit: "contain" }}
              />
            </a>

            <a
              href={site.socials.instagram}
              target="_blank"
              className="opacity-70 transition-all duration-300 hover:opacity-100 hover:-translate-y-1"
              style={{ display: "block" }}
            >
              <img
                src="/logos/Instagram-Logo.png"
                alt="Instagram"
                style={{ width: "40px", height: "40px", objectFit: "contain" }}
              />
            </a>
          </div>
        </div>
        </div>
      </div>
    </Section>
  );
}
