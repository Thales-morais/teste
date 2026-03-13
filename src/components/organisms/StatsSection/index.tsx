"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCountUp } from "@/animations/hooks/useCountUp";

interface StatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description: string;
  decimals?: number;
}

const stats: StatItem[] = [
  { value: 50, suffix: "+", label: "Components", description: "Production-ready UI components" },
  { value: 99, suffix: "%", label: "Accessibility", description: "WCAG 2.1 AA compliant" },
  { value: 60, suffix: "fps", label: "Animations", description: "Hardware-accelerated" },
  { value: 4.9, suffix: "/5", label: "Dev Score", description: "Based on feedback", decimals: 1 },
];

function StatCounter({ stat }: { stat: StatItem }) {
  const { ref, formatted } = useCountUp({
    end: stat.value,
    prefix: stat.prefix,
    suffix: stat.suffix,
    decimals: stat.decimals ?? 0,
    duration: 2,
  });

  return (
    <div className="relative text-center group">
      {/* Divider on left (except first) */}
      <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-12 w-px bg-white/[0.06]" />

      <span
        ref={ref}
        className="block heading-display text-5xl md:text-6xl text-gradient mb-2"
      >
        {formatted}
      </span>

      <div className="text-base font-semibold text-white mb-1">{stat.label}</div>
      <div className="text-sm text-white/40">{stat.description}</div>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="section-nova py-24">
      <div className="container-nova">
        {/* Divider line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-24" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="label-overline">By the numbers</span>
          <h2 className="heading-xl text-4xl md:text-5xl text-white mt-3">
            Numbers that matter
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <StatCounter stat={stat} />
            </motion.div>
          ))}
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mt-24" />
      </div>
    </section>
  );
}
