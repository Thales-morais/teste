"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icons } from "@/components/atoms/Icon";
import { staggerContainer, staggerItem } from "@/animations/variants";

const footerLinks = {
  Product: ["Components", "Tokens", "Animations", "Documentation", "Changelog"],
  Developers: ["Getting Started", "API Reference", "TypeScript", "Figma Kit", "GitHub"],
  Resources: ["Blog", "Tutorials", "Community", "Support", "Status"],
  Company: ["About", "Careers", "Press", "Privacy", "Terms"],
};

export function Footer() {
  return (
    <footer className="section-nova border-t border-white/[0.06] bg-[#0A0A0A]">
      <div className="container-nova py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12"
        >
          {/* Brand */}
          <motion.div variants={staggerItem} className="col-span-2 md:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00D4FF] flex items-center justify-center">
                <Icons.Sparkles className="h-3.5 w-3.5 text-white" />
              </div>
              <span
                className="font-bold text-lg text-white tracking-tight"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                NOVA
              </span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-[160px]">
              A design system built for the modern web.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2 mt-5">
              {["GitHub", "X", "Discord"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className={cn(
                    "h-8 w-8 rounded-lg flex items-center justify-center",
                    "bg-white/5 hover:bg-white/10 border border-white/[0.06]",
                    "text-white/40 hover:text-white",
                    "transition-all duration-200 text-xs font-medium"
                  )}
                  aria-label={social}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div key={category} variants={staggerItem}>
              <h4 className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/35 hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © 2025 NOVA Design System. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-white/20">
            Built with
            <span className="text-[#FF453A] mx-0.5">♥</span>
            and obsessive attention to detail
          </div>
        </div>
      </div>
    </footer>
  );
}
