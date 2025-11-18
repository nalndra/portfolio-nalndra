import React from "react";

import { site } from "../config/site.config";

export default function Footer() {
  return (
    <footer style={{ 
      padding: "40px 24px", 
      textAlign: "center", 
      fontSize: 14,
      fontWeight: 300,
      color: "var(--text-secondary)",
      borderTop: "1px solid rgba(var(--accent-rgb), 0.2)",
      background: "var(--surface)",
      letterSpacing: "0.5px"
    }}>
      <small>© {new Date().getFullYear()} {site.name} — Built with Next.js & Three.js</small>
    </footer>
  );
}

