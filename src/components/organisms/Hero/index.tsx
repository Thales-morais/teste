"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { Icons } from "@/components/atoms/Icon";
import { staggerContainer, staggerItem } from "@/animations/variants";

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 4,
  duration: Math.random() * 4 + 4,
}));

const floatingOrbs = [
  { x: "15%", y: "25%", size: 300, color: "rgba(0,102,255,0.12)", delay: 0 },
  { x: "75%", y: "60%", size: 400, color: "rgba(0,212,255,0.08)", delay: 1 },
  { x: "50%", y: "80%", size: 250, color: "rgba(0,102,255,0.1)", delay: 2 },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className={cn(
        "relative min-h-screen flex flex-col items-center justify-center",
        "overflow-hidden dot-pattern"
      )}
    >
      {/* Background orbs */}
      {floatingOrbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 6 + i * 2,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white/20"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Top gradient vignette */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* Hero content */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative container-nova flex flex-col items-center text-center gap-8 pt-24 pb-16"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Badge variant="primary" dot className="backdrop-blur-sm">
            Introducing NOVA Design System
          </Badge>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="heading-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl max-w-5xl"
        >
          <span className="text-white">Design beyond</span>
          <br />
          <span className="text-gradient">imagination.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed"
        >
          A complete design system built for the modern web. Crafted with obsessive
          attention to detail — animations, components, and tokens that elevate
          every interface.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 flex-wrap justify-center"
        >
          <Button variant="primary" size="xl" magnetic icon={<Icons.ArrowRight />} iconPosition="right">
            Explore system
          </Button>
          <Button variant="secondary" size="xl" icon={<Icons.Play className="h-3.5 w-3.5" />}>
            Watch demo
          </Button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex items-center gap-6 text-sm text-white/30"
        >
          <span className="flex items-center gap-2">
            <Icons.Check className="text-[#30D158] h-3.5 w-3.5" />
            Built with TypeScript
          </span>
          <span className="flex items-center gap-2">
            <Icons.Check className="text-[#30D158] h-3.5 w-3.5" />
            Fully accessible
          </span>
          <span className="flex items-center gap-2">
            <Icons.Check className="text-[#30D158] h-3.5 w-3.5" />
            Dark mode first
          </span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/20 tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-[1px] bg-gradient-to-b from-white/20 to-transparent"
          />
        </motion.div>
      </motion.div>

      {/* Feature pills */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative container-nova pb-16 grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        {[
          { icon: <Icons.Zap />, label: "60fps Animations" },
          { icon: <Icons.Shield />, label: "Fully Accessible" },
          { icon: <Icons.Layers />, label: "50+ Components" },
          { icon: <Icons.Code />, label: "TypeScript First" },
        ].map((pill) => (
          <motion.div
            key={pill.label}
            variants={staggerItem}
            className={cn(
              "flex items-center gap-2.5",
              "px-4 py-3 rounded-xl",
              "glass border border-white/[0.06]",
              "text-sm text-white/60"
            )}
          >
            <span className="text-[#0066FF]">{pill.icon}</span>
            {pill.label}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
