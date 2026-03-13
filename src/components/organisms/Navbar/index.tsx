"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { Button } from "@/components/atoms/Button";
import { Icons } from "@/components/atoms/Icon";

const navLinks = [
  { label: "Design", href: "#design" },
  { label: "Components", href: "#components" },
  { label: "Animations", href: "#animations" },
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
            ? { backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(24px)" }
            : { backgroundColor: "rgba(0,0,0,0)", backdropFilter: "blur(0px)" }
        }
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[200]",
          "border-b",
          scrolled ? "border-white/[0.06]" : "border-transparent"
        )}
      >
        <div className="container-nova flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00D4FF] flex items-center justify-center">
              <Icons.Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-white">
              NOVA
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
                  "transition-all duration-200"
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
            <Button variant="primary" size="sm" magnetic>
              Get started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Icons.Menu />
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
              "bg-black/95 backdrop-blur-2xl border-b border-white/[0.06]",
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
            <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-white/[0.06]">
              <Button variant="secondary" size="md" fullWidth>
                Sign in
              </Button>
              <Button variant="primary" size="md" fullWidth>
                Get started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
