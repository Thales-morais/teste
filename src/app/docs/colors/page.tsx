"use client";

import React from "react";
import { motion } from "framer-motion";

const colorPalette = [
  {
    category: "Backgrounds",
    colors: [
      { name: "bg-primary", value: "#000000", label: "Primary BG" },
      { name: "bg-secondary", value: "#0A0A0A", label: "Secondary BG" },
      { name: "bg-tertiary", value: "#141414", label: "Tertiary BG" },
      { name: "bg-elevated", value: "#1C1C1E", label: "Elevated BG" },
    ],
  },
  {
    category: "Accent",
    colors: [
      { name: "accent-blue", value: "#0066FF", label: "Blue" },
      { name: "accent-blue-light", value: "#338AFF", label: "Blue Light" },
      { name: "accent-blue-dark", value: "#0052CC", label: "Blue Dark" },
      { name: "accent-cyan", value: "#00D4FF", label: "Cyan" },
    ],
  },
  {
    category: "Text",
    colors: [
      { name: "text-primary", value: "#FFFFFF", label: "Primary" },
      { name: "text-secondary", value: "rgba(255,255,255,0.6)", label: "Secondary" },
      { name: "text-tertiary", value: "rgba(255,255,255,0.3)", label: "Tertiary" },
      { name: "text-quaternary", value: "rgba(255,255,255,0.15)", label: "Quaternary" },
    ],
  },
  {
    category: "Semantic",
    colors: [
      { name: "success", value: "#30D158", label: "Success" },
      { name: "warning", value: "#FFD60A", label: "Warning" },
      { name: "error", value: "#FF453A", label: "Error" },
      { name: "info", value: "#0066FF", label: "Info" },
    ],
  },
];

function ColorSwatch({ name, value, label }: { name: string; value: string; label: string }) {
  return (
    <div className="group">
      <div
        className="h-16 w-full rounded-xl mb-2.5 border border-white/10"
        style={{ background: value }}
      />
      <div className="text-xs font-medium text-white mb-0.5">{label}</div>
      <div className="text-[0.65rem] text-white/35 font-mono">{value}</div>
      <div className="text-[0.65rem] text-white/25 font-mono">--nova-{name}</div>
    </div>
  );
}

export default function ColorsPage() {
  return (
    <div className="min-h-screen bg-[#000000]">
      <div className="border-b border-white/[0.06] bg-[#0A0A0A]">
        <div className="container-nova py-5 flex items-center gap-3 text-sm text-white/40">
          <a href="/docs" className="hover:text-white transition-colors">Docs</a>
          <span>/</span>
          <span className="text-white">Colors</span>
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
          <h1 className="heading-xl text-4xl text-white mt-3 mb-3">Color System</h1>
          <p className="text-white/50 text-base max-w-2xl leading-relaxed">
            NOVA uses CSS custom properties for all colors, enabling consistent theming
            and easy customization. All values support RGBA with opacity control.
          </p>
        </motion.div>

        {colorPalette.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: gi * 0.1 }}
            className="mb-12"
          >
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-5">
              {group.category}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {group.colors.map((color) => (
                <ColorSwatch key={color.name} {...color} />
              ))}
            </div>
          </motion.div>
        ))}

        {/* Gradient showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8"
        >
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-5">
            Gradients
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <div
                className="h-20 w-full rounded-xl mb-2.5"
                style={{ background: "linear-gradient(135deg, #0066FF 0%, #00D4FF 100%)" }}
              />
              <div className="text-xs font-medium text-white mb-0.5">Nova Accent Gradient</div>
              <div className="text-[0.65rem] text-white/35 font-mono">--nova-accent-gradient</div>
            </div>
            <div>
              <div
                className="h-20 w-full rounded-xl mb-2.5"
                style={{ background: "linear-gradient(180deg, #000000 0%, #0A0A0A 50%, #141414 100%)" }}
              />
              <div className="text-xs font-medium text-white mb-0.5">Nova Dark Gradient</div>
              <div className="text-[0.65rem] text-white/35 font-mono">--nova-gradient-dark</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
