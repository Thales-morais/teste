"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icons } from "@/components/atoms/Icon";

interface CarouselSlide {
  id: number;
  title: string;
  description: string;
  tag: string;
  gradient: string;
  accent: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    title: "Motion Design",
    description: "Fluent animations that breathe life into your interface. Every transition tells a story.",
    tag: "Animation",
    gradient: "from-[#0066FF]/30 via-[#0066FF]/10 to-transparent",
    accent: "#0066FF",
  },
  {
    id: 2,
    title: "Glass Morphism",
    description: "Elegant frosted glass surfaces that create depth and hierarchy in your layouts.",
    tag: "Visual",
    gradient: "from-[#00D4FF]/30 via-[#00D4FF]/10 to-transparent",
    accent: "#00D4FF",
  },
  {
    id: 3,
    title: "Type System",
    description: "A harmonious type scale that brings clarity and rhythm to every piece of content.",
    tag: "Typography",
    gradient: "from-[#7C3AED]/30 via-[#7C3AED]/10 to-transparent",
    accent: "#7C3AED",
  },
  {
    id: 4,
    title: "Color Tokens",
    description: "A semantic color system that scales across themes, components, and brands.",
    tag: "Tokens",
    gradient: "from-[#30D158]/30 via-[#30D158]/10 to-transparent",
    accent: "#30D158",
  },
  {
    id: 5,
    title: "Micro Interactions",
    description: "Magnetic buttons, tilt cards, hover reveals — details that delight your users.",
    tag: "Interaction",
    gradient: "from-[#FF453A]/30 via-[#FF453A]/10 to-transparent",
    accent: "#FF453A",
  },
];

export function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section id="animations" className="section-nova py-32 bg-[#0A0A0A]">
      <div className="container-nova">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <span className="label-overline">Showcase</span>
          <div className="flex items-end justify-between mt-3">
            <h2 className="heading-xl text-4xl md:text-5xl text-white max-w-lg">
              Explore what&apos;s possible
            </h2>

            {/* Navigation arrows */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className={cn(
                  "h-10 w-10 rounded-xl flex items-center justify-center",
                  "glass border border-white/10",
                  "text-white/60 hover:text-white",
                  "transition-all duration-200",
                  "disabled:opacity-30 disabled:cursor-not-allowed"
                )}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={scrollNext}
                disabled={!canScrollNext}
                className={cn(
                  "h-10 w-10 rounded-xl flex items-center justify-center",
                  "glass border border-white/10",
                  "text-white/60 hover:text-white",
                  "transition-all duration-200",
                  "disabled:opacity-30 disabled:cursor-not-allowed"
                )}
              >
                <Icons.ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Embla Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4" style={{ touchAction: "pan-y pinch-zoom" }}>
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="flex-none w-[85%] sm:w-[55%] md:w-[40%] lg:w-[32%]"
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={cn(
                    "relative h-64 rounded-2xl overflow-hidden",
                    "border border-white/[0.08] cursor-pointer",
                    "bg-[#141414]"
                  )}
                >
                  {/* Gradient background */}
                  <div
                    className={cn("absolute inset-0 bg-gradient-to-br", slide.gradient)}
                  />

                  {/* Grid pattern */}
                  <div className="absolute inset-0 grid-pattern opacity-40" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div
                      className="self-start text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        background: `${slide.accent}20`,
                        color: slide.accent,
                        border: `1px solid ${slide.accent}30`,
                      }}
                    >
                      {slide.tag}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                        {slide.title}
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed">
                        {slide.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover border glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"
                    style={{ boxShadow: `inset 0 0 0 1px ${slide.accent}30` }}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={cn(
                "rounded-full transition-all duration-300",
                i === selectedIndex
                  ? "w-6 h-1.5 bg-[#0066FF]"
                  : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
