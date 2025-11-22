"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorSize, setCursorSize] = useState(20);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => window.innerWidth < 768;
    setIsMobile(checkIsMobile());

    const handleResize = () => setIsMobile(checkIsMobile());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setCursorSize(28);
    const handleMouseLeave = () => setCursorSize(20);

    // Add listeners to interactive elements
    const updateListeners = () => {
      const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, textarea, select');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    updateListeners();

    // Use MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(updateListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      className="custom-cursor"
      style={{
        transform: `translate(${cursorPos.x - cursorSize / 2}px, ${cursorPos.y - cursorSize / 2}px)`,
        width: `${cursorSize}px`,
        height: `${cursorSize}px`,
      }}
    />
  );
}