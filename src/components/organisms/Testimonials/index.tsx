"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Avatar } from "@/components/atoms/Avatar";
import { Icons } from "@/components/atoms/Icon";

const testimonials = [
  {
    id: 1,
    quote:
      "NOVA completely transformed how our team builds products. The animation system alone saves us weeks of work every sprint.",
    name: "Sarah Chen",
    role: "Lead Designer @ Vercel",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "The attention to detail is incredible. Every component just works — accessible, animated, and perfectly typed.",
    name: "Marcus Webb",
    role: "Frontend Engineer @ Stripe",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "We rebuilt our entire design system using NOVA tokens. The consistency it brings across 12 products is unmatched.",
    name: "Elena Rodriguez",
    role: "Head of Product @ Linear",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "The glassmorphism cards with 3D tilt effect got our stakeholders more excited than anything we've shipped in months.",
    name: "James Park",
    role: "Creative Director @ Figma",
    rating: 5,
  },
];

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section className="section-nova py-32">
      <div className="container-nova">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="label-overline">Testimonials</span>
          <h2 className="heading-xl text-4xl md:text-5xl text-white mt-3">
            Loved by builders
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((t) => (
              <div key={t.id} className="flex-none w-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={cn(
                    "mx-auto max-w-2xl",
                    "glass rounded-2xl p-8 md:p-10",
                    "border border-white/[0.08]",
                    "text-center"
                  )}
                >
                  {/* Stars */}
                  <div className="flex items-center justify-center gap-1 mb-6">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Icons.Star key={i} className="h-4 w-4 text-[#FFD60A]" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl md:text-2xl text-white/80 font-medium leading-relaxed mb-8 tracking-tight">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center justify-center gap-3">
                    <Avatar name={t.name} size="md" />
                    <div className="text-left">
                      <div className="text-sm font-semibold text-white">{t.name}</div>
                      <div className="text-xs text-white/40">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={cn(
                "rounded-full transition-all duration-300",
                i === selectedIndex
                  ? "w-6 h-1.5 bg-[#0066FF]"
                  : "w-1.5 h-1.5 bg-white/20"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
