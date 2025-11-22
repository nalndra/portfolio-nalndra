import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nalendra Jatayu | Developer",
  description: "Portfolio of Nalendra Jatayu, a skilled developer specializing in mobile, web, and game development.",
  icons: {
    icon: { url: '/logos/logo_nln_black.png', type: 'image/png' },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <style>{`
          * {
            cursor: none !important;
          }
          .custom-cursor {
            position: fixed;
            top: 0;
            left: 0;
            border: 1px solid rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            background: transparent;
            pointer-events: none;
            z-index: 9999;
            transition: width 0.2s ease, height 0.2s ease, border-color 0.2s ease;
            mix-blend-mode: difference;
          }
        `}</style>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
