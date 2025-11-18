"use client";

export default function PrivateRepo() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--primary)",
      padding: "40px 20px",
    }}>
      <div style={{
        maxWidth: "600px",
        textAlign: "center",
        background: "rgba(var(--secondary-rgb), 0.8)",
        padding: "60px 40px",
        borderRadius: "8px",
        border: "1px solid rgba(var(--accent-rgb), 0.3)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
      }}>
        <div style={{
          fontSize: "64px",
          marginBottom: "24px",
          opacity: 0.6,
        }}>
          🔧
        </div>
        
        <h1 style={{
          fontSize: "2rem",
          fontWeight: 300,
          color: "var(--light)",
          marginBottom: "16px",
          letterSpacing: "-0.5px",
        }}>
          Project Under Maintenance
        </h1>
        
        <p style={{
          fontSize: "1.1rem",
          color: "var(--text-secondary)",
          lineHeight: "1.6",
          marginBottom: "32px",
        }}>
          This project's repository or product is currently in maintenance. 
          <br />
          For more information, please contact Nalendra. Thank you.
        </p>
        
        <a
          href="/"
          style={{
            display: "inline-block",
            padding: "12px 32px",
            background: "var(--accent)",
            color: "var(--light)",
            textDecoration: "none",
            borderRadius: "4px",
            fontSize: "0.95rem",
            fontWeight: 400,
            letterSpacing: "0.5px",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(var(--accent-rgb), 0.8)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--accent)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Back to Portfolio
        </a>
      </div>
    </div>
  );
}
