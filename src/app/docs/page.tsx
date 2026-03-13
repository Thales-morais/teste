"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icons } from "@/components/atoms/Icon";
import { staggerContainer, staggerItem } from "@/animations/variants";

const sections = [
  {
    href: "/docs/colors",
    title: "Colors",
    description: "The complete NOVA color system — backgrounds, accents, text, and semantic tokens.",
    icon: <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00D4FF]" />,
    tag: "Tokens",
  },
  {
    href: "/docs/typography",
    title: "Typography",
    description: "Type scale, font families, weights, and display styles for NOVA.",
    icon: <span className="text-white font-bold text-lg leading-none">Aa</span>,
    tag: "Tokens",
  },
  {
    href: "/docs/components",
    title: "Components",
    description: "Live demos and usage of all atoms, molecules, and organisms.",
    icon: <Icons.Layers className="h-5 w-5 text-[#0066FF]" />,
    tag: "Components",
  },
  {
    href: "/docs/animations",
    title: "Animations",
    description: "Animation variants, hooks, and usage examples with Framer Motion and GSAP.",
    icon: <Icons.Zap className="h-5 w-5 text-[#FFD60A]" />,
    tag: "Motion",
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Header */}
      <div className="border-b border-white/[0.06] bg-[#0A0A0A]">
        <div className="container-nova py-6 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00D4FF] flex items-center justify-center">
              <Icons.Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-bold text-lg text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
              NOVA
            </span>
            <span className="text-white/20 mx-1">/</span>
            <span className="text-sm text-white/50">Docs</span>
          </a>

          <a
            href="/"
            className="text-sm text-white/40 hover:text-white transition-colors"
          >
            ← Back to showcase
          </a>
        </div>
      </div>

      <div className="container-nova py-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="label-overline">Documentation</span>
          <h1 className="heading-xl text-5xl md:text-6xl text-white mt-3 mb-4">
            NOVA Design System
          </h1>
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
            Everything you need to build with NOVA. Browse tokens, components,
            animations, and patterns.
          </p>
        </motion.div>

        {/* Sections grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {sections.map((section) => (
            <motion.a
              key={section.title}
              href={section.href}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={cn(
                "group relative rounded-2xl p-6 cursor-pointer",
                "bg-white/[0.03] hover:bg-white/[0.06]",
                "border border-white/[0.06] hover:border-white/[0.12]",
                "transition-colors duration-300",
                "overflow-hidden"
              )}
            >
              {/* Top line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-white/[0.06] border border-white/[0.06] flex items-center justify-center shrink-0">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-base font-semibold text-white">{section.title}</h2>
                    <span className="text-[0.65rem] px-2 py-0.5 rounded-md bg-[#0066FF]/15 text-[#0066FF] font-medium border border-[#0066FF]/20">
                      {section.tag}
                    </span>
                  </div>
                  <p className="text-sm text-white/45 leading-relaxed">{section.description}</p>
                </div>
                <Icons.ChevronRight className="h-4 w-4 text-white/25 group-hover:text-white/60 shrink-0 mt-0.5 transition-colors" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Quick start */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
        >
          <h3 className="text-base font-semibold text-white mb-3">Quick Start</h3>
          <pre className="text-sm font-mono text-[#00D4FF] bg-[#0A0A0A] rounded-xl p-4 overflow-x-auto">
            <code>{`# Install dependencies
npm install framer-motion gsap embla-carousel-react
npm install @radix-ui/react-dialog @radix-ui/react-accordion

# Import styles
import '@nova/styles/globals.css'

# Use a component
import { Button } from '@nova/components'
<Button variant="primary" magnetic>Get started</Button>`}</code>
          </pre>
        </motion.div>
      </div>
    </div>
  );
}
