"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

const navLinks = [
  { label: "Marca", href: "/brand" },
  { label: "Componentes", href: "/components" },
  { label: "Diretrizes", href: "/guidelines" },
  { label: "Kit Criativos", href: "/kit-branding" },
  { label: "Docs", href: "/docs" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        animate={
          scrolled
            ? { backgroundColor: "rgba(6,6,15,0.92)", backdropFilter: "blur(24px)" }
            : { backgroundColor: "rgba(6,6,15,0)", backdropFilter: "blur(0px)" }
        }
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[200]",
          "border-b",
          scrolled ? "border-purple-500/10" : "border-transparent"
        )}
      >
        <div className="container-nova flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#2563EB] flex items-center justify-center shadow-lg shadow-purple-500/25">
              <span className="text-white font-black text-sm">C</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-white">
              Criatis
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium",
                  "text-white/60 hover:text-white",
                  "hover:bg-white/[0.06]",
                  "transition-all duration-200",
                  link.label === "Kit Criativos" && "text-orange-400/80 hover:text-orange-300"
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/docs"
              className="px-4 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.06] transition-all"
            >
              Ver Docs
            </a>
            <a
              href="/kit-branding"
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20"
            >
              Kit Criativos
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed top-16 left-0 right-0 z-[199]",
              "bg-[#06060F]/95 backdrop-blur-2xl border-b border-purple-500/10",
              "p-4 flex flex-col gap-1"
            )}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/[0.06] transition-all"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
