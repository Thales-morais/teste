"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Icons } from "@/components/atoms/Icon";

export function MediaSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.92, 1]);

  return (
    <section ref={ref} className="section-nova py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="container-nova">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <Badge variant="primary" dot className="mb-4">
              Scroll Experience
            </Badge>
            <h2 className="heading-xl text-4xl md:text-5xl text-white mb-6">
              Scroll animations that{" "}
              <span className="text-gradient">wow your users</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              NOVA leverages GSAP ScrollTrigger for cinematic scroll experiences.
              Parallax layers, pinned sections, and synchronized timelines create
              narratives that draw users deeper into your story.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Parallax backgrounds and foregrounds",
                "Pinned scroll sections",
                "Synchronized multi-element timelines",
                "Scrub-based animations",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-white/60">
                  <span className="h-5 w-5 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/30 flex items-center justify-center shrink-0">
                    <Icons.Check className="h-2.5 w-2.5 text-[#0066FF]" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <Button variant="outline" size="lg" icon={<Icons.ArrowRight />} iconPosition="right">
              Learn more
            </Button>
          </motion.div>

          {/* Visual — parallax card */}
          <motion.div
            style={{ opacity, scale }}
            className="relative"
          >
            <motion.div
              style={{ y }}
              className={cn(
                "relative h-80 rounded-3xl overflow-hidden",
                "border border-white/[0.08]"
              )}
            >
              {/* Main gradient BG */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0066FF]/10 to-[#00D4FF]/5" />
              <div className="absolute inset-0 grid-pattern opacity-30" />

              {/* Floating elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Orbiting rings */}
                {[1, 2, 3].map((ring) => (
                  <motion.div
                    key={ring}
                    animate={{ rotate: 360 * (ring % 2 === 0 ? -1 : 1) }}
                    transition={{
                      duration: 8 + ring * 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute rounded-full border border-white/5"
                    style={{
                      width: `${ring * 100 + 100}px`,
                      height: `${ring * 100 + 100}px`,
                      borderColor: `rgba(0,102,255,${0.08 + ring * 0.03})`,
                    }}
                  />
                ))}

                {/* Center orb */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="h-20 w-20 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #0066FF, #00D4FF)",
                    boxShadow: "0 0 60px rgba(0,102,255,0.4)",
                  }}
                >
                  <Icons.Sparkles className="h-8 w-8 text-white" />
                </motion.div>
              </div>

              {/* Top overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />

              {/* Label */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-sm font-semibold text-white mb-1">Scroll-driven animations</div>
                <div className="text-xs text-white/40">GSAP ScrollTrigger + Framer Motion</div>
              </div>
            </motion.div>

            {/* Decorative glow */}
            <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-gradient-to-br from-[#0066FF] to-[#00D4FF] rounded-3xl scale-90" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
