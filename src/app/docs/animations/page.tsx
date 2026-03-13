"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/atoms/Button";
import {
  fadeUp,
  fadeIn,
  scaleIn,
  slideLeft,
  slideRight,
  staggerContainer,
  staggerItem,
} from "@/animations/variants";

const variantOptions = [
  { key: "fadeUp", label: "Fade Up", variant: fadeUp },
  { key: "fadeIn", label: "Fade In", variant: fadeIn },
  { key: "scaleIn", label: "Scale In", variant: scaleIn },
  { key: "slideLeft", label: "Slide Left", variant: slideLeft },
  { key: "slideRight", label: "Slide Right", variant: slideRight },
];

export default function AnimationsPage() {
  const [keys, setKeys] = useState<Record<string, number>>({});

  const replay = (key: string) => {
    setKeys((prev) => ({ ...prev, [key]: (prev[key] ?? 0) + 1 }));
  };

  return (
    <div className="min-h-screen bg-[#000000]">
      <div className="border-b border-white/[0.06] bg-[#0A0A0A]">
        <div className="container-nova py-5 flex items-center gap-3 text-sm text-white/40">
          <a href="/docs" className="hover:text-white transition-colors">Docs</a>
          <span>/</span>
          <span className="text-white">Animations</span>
        </div>
      </div>

      <div className="container-nova py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="label-overline">Motion System</span>
          <h1 className="heading-xl text-4xl text-white mt-3 mb-3">Animations</h1>
          <p className="text-white/50 text-base max-w-2xl leading-relaxed">
            NOVA ships with pre-built Framer Motion variants, custom animation hooks,
            and GSAP scroll utilities. Click replay to preview each variant.
          </p>
        </motion.div>

        {/* Variants showcase */}
        <section className="mb-16">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-6 pb-3 border-b border-white/[0.06]">
            Framer Motion Variants
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {variantOptions.map(({ key, label, variant }) => (
              <div
                key={key}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden"
              >
                <div className="h-24 flex items-center justify-center mb-4 rounded-xl bg-white/[0.03]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={keys[key] ?? 0}
                      variants={variant}
                      initial="hidden"
                      animate="visible"
                      className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#00D4FF]"
                    />
                  </AnimatePresence>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-white">{label}</div>
                    <div className="text-xs text-white/35 font-mono mt-0.5">{key}</div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => replay(key)}>
                    ↺ Replay
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stagger demo */}
        <section className="mb-16">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-6 pb-3 border-b border-white/[0.06]">
            Stagger Containers
          </h2>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-center gap-3 mb-5">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setKeys((p) => ({ ...p, stagger: (p.stagger ?? 0) + 1 }))}
              >
                ↺ Replay stagger
              </Button>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={keys.stagger ?? 0}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-4 sm:grid-cols-8 gap-2"
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    className="h-10 rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, hsl(${210 + i * 10}, 100%, ${40 + i * 3}%) 0%, hsl(${190 + i * 8}, 100%, 55%) 100%)`,
                    }}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Easing tokens */}
        <section className="mb-16">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-6 pb-3 border-b border-white/[0.06]">
            Easing Tokens
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "smooth", value: "[0.25, 0.46, 0.45, 0.94]", desc: "General purpose" },
              { name: "slow", value: "[0.16, 1, 0.3, 1]", desc: "Apple-style" },
              { name: "spring", value: "stiffness:300 damping:30", desc: "Natural spring" },
              { name: "bounce", value: "stiffness:400 damping:20", desc: "Bouncy spring" },
            ].map((e) => (
              <div key={e.name} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-sm font-semibold text-white mb-1">ease.{e.name}</div>
                <div className="text-[0.65rem] text-white/40 font-mono mb-2 break-all">{e.value}</div>
                <div className="text-xs text-white/30">{e.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Animation hooks */}
        <section>
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-6 pb-3 border-b border-white/[0.06]">
            Custom Hooks
          </h2>
          <div className="space-y-3">
            {[
              { hook: "useScrollReveal", path: "@/animations/hooks/useScrollReveal", desc: "GSAP ScrollTrigger reveal on viewport enter. Supports stagger on children." },
              { hook: "useMagneticEffect", path: "@/animations/hooks/useMagneticEffect", desc: "Magnetic cursor attraction. Elements follow cursor with configurable strength." },
              { hook: "useTiltCard", path: "@/animations/hooks/useTiltCard", desc: "3D perspective tilt on mouse move. Includes optional glare highlight." },
              { hook: "useParallax", path: "@/animations/hooks/useParallax", desc: "Scroll-driven parallax translation using Framer Motion useTransform." },
              { hook: "useCountUp", path: "@/animations/hooks/useCountUp", desc: "GSAP-powered number counter that triggers when element enters viewport." },
            ].map((h) => (
              <div key={h.hook} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <code className="text-sm text-[#00D4FF] font-mono shrink-0 mt-0.5">{h.hook}</code>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-white/30 font-mono mb-1">{h.path}</div>
                  <div className="text-sm text-white/50">{h.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
