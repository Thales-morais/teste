"use client";

import React from "react";
import { motion } from "framer-motion";

const typeScale = [
  { size: "9xl", px: "128px", class: "text-8xl", label: "Display / Hero" },
  { size: "8xl", px: "96px", class: "text-7xl", label: "Display Large" },
  { size: "7xl", px: "72px", class: "text-6xl", label: "Display Medium" },
  { size: "6xl", px: "60px", class: "text-5xl", label: "Display Small" },
  { size: "5xl", px: "48px", class: "text-4xl", label: "Heading XL" },
  { size: "4xl", px: "36px", class: "text-3xl", label: "Heading LG" },
  { size: "3xl", px: "30px", class: "text-2xl", label: "Heading MD" },
  { size: "2xl", px: "24px", class: "text-xl", label: "Heading SM" },
  { size: "xl", px: "20px", class: "text-lg", label: "Body Large" },
  { size: "base", px: "16px", class: "text-base", label: "Body" },
  { size: "sm", px: "14px", class: "text-sm", label: "Small" },
  { size: "xs", px: "12px", class: "text-xs", label: "Caption" },
];

export default function TypographyPage() {
  return (
    <div className="min-h-screen bg-[#000000]">
      <div className="border-b border-white/[0.06] bg-[#0A0A0A]">
        <div className="container-nova py-5 flex items-center gap-3 text-sm text-white/40">
          <a href="/docs" className="hover:text-white transition-colors">Docs</a>
          <span>/</span>
          <span className="text-white">Typography</span>
        </div>
      </div>

      <div className="container-nova py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <span className="label-overline">Design Tokens</span>
          <h1 className="heading-xl text-4xl text-white mt-3 mb-3">Typography</h1>
          <p className="text-white/50 text-base max-w-2xl leading-relaxed">
            NOVA uses a curated font stack. <strong className="text-white/80">Sora</strong> for
            display headings, <strong className="text-white/80">Inter</strong> for UI body text,
            and <strong className="text-white/80">JetBrains Mono</strong> for code.
          </p>
        </motion.div>

        {/* Font families */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {[
            { name: "Sora", use: "Display / Headlines", weight: "700/800", sample: "Design", fontFamily: "'Sora', sans-serif" },
            { name: "Inter", use: "UI / Body", weight: "300–600", sample: "Interface", fontFamily: "'Inter', sans-serif" },
            { name: "JetBrains Mono", use: "Code / Labels", weight: "400/500", sample: "const x = 1", fontFamily: "'JetBrains Mono', monospace" },
          ].map((font, i) => (
            <motion.div
              key={font.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
            >
              <div className="text-3xl font-bold text-white mb-3" style={{ fontFamily: font.fontFamily }}>
                {font.sample}
              </div>
              <div className="text-sm font-semibold text-white mb-1">{font.name}</div>
              <div className="text-xs text-white/40">{font.use}</div>
              <div className="text-xs text-white/25 mt-1">Weight {font.weight}</div>
            </motion.div>
          ))}
        </div>

        {/* Type scale */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-6">
            Type Scale
          </h2>
          <div className="space-y-6">
            {typeScale.slice(0, 8).map((item) => (
              <div key={item.size} className="flex items-baseline gap-6 group">
                <div className="w-24 shrink-0">
                  <div className="text-xs text-white/30 font-mono">{item.px}</div>
                  <div className="text-[0.65rem] text-white/20 font-mono">{item.label}</div>
                </div>
                <div
                  className="heading-display text-white/90 leading-none"
                  style={{ fontSize: item.px }}
                >
                  Nova
                </div>
              </div>
            ))}
          </div>

          {/* Body scale */}
          <div className="mt-10 space-y-4 border-t border-white/[0.06] pt-8">
            {typeScale.slice(8).map((item) => (
              <div key={item.size} className="flex items-center gap-6">
                <div className="w-24 shrink-0">
                  <div className="text-xs text-white/30 font-mono">{item.px}</div>
                  <div className="text-[0.65rem] text-white/20 font-mono">{item.label}</div>
                </div>
                <div className={`${item.class} text-white/80`}>
                  The quick brown fox jumps over the lazy dog
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
