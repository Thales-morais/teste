"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Card } from "@/components/molecules/Card";
import { Badge } from "@/components/atoms/Badge";
import { Icons } from "@/components/atoms/Icon";
import { useScrollRevealChildren } from "@/animations/hooks/useScrollReveal";

const features = [
  {
    icon: <Icons.Zap className="h-5 w-5" />,
    badge: "Performance",
    title: "60fps animations",
    description:
      "Every animation runs at buttery-smooth 60fps. We use Framer Motion and GSAP with hardware-accelerated CSS properties for maximum performance.",
    color: "#0066FF",
    gradient: "from-[#0066FF]/20 to-transparent",
  },
  {
    icon: <Icons.Globe className="h-5 w-5" />,
    badge: "Accessibility",
    title: "Built for everyone",
    description:
      "Full keyboard navigation, screen reader support, ARIA attributes, and WCAG 2.1 AA compliance baked into every component.",
    color: "#00D4FF",
    gradient: "from-[#00D4FF]/20 to-transparent",
  },
  {
    icon: <Icons.Layers className="h-5 w-5" />,
    badge: "Components",
    title: "50+ components",
    description:
      "From atoms to organisms — a complete library of composable components that work together seamlessly across any project.",
    color: "#30D158",
    gradient: "from-[#30D158]/20 to-transparent",
  },
  {
    icon: <Icons.Code className="h-5 w-5" />,
    badge: "Developer DX",
    title: "TypeScript native",
    description:
      "Full TypeScript support with robust prop types, autocomplete, and inline documentation. Build faster with confidence.",
    color: "#FFD60A",
    gradient: "from-[#FFD60A]/20 to-transparent",
  },
  {
    icon: <Icons.Shield className="h-5 w-5" />,
    badge: "Design Tokens",
    title: "Consistent at scale",
    description:
      "A comprehensive token system for colors, typography, spacing, and motion. One source of truth for your entire brand.",
    color: "#7C3AED",
    gradient: "from-[#7C3AED]/20 to-transparent",
  },
  {
    icon: <Icons.Sparkles className="h-5 w-5" />,
    badge: "Dark Mode",
    title: "Beautiful in the dark",
    description:
      "Dark mode first approach with CSS variables. Seamlessly switch between themes without a flash of unstyled content.",
    color: "#FF453A",
    gradient: "from-[#FF453A]/20 to-transparent",
  },
];

export function FeatureSection() {
  const gridRef = useScrollRevealChildren<HTMLDivElement>({ y: 50, stagger: 0.1 });

  return (
    <section id="components" className="section-nova py-32 bg-[#0A0A0A]">
      <div className="container-nova">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="label-overline">Why NOVA</span>
          <h2 className="heading-xl text-4xl md:text-5xl text-white mt-3 mb-5">
            Everything you need to{" "}
            <span className="text-gradient">build faster</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            NOVA gives you all the building blocks to create world-class interfaces
            with the consistency and quality of the best products.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature) => (
            <Card
              key={feature.title}
              tilt
              glow
              className="group p-6 overflow-hidden"
            >
              {/* Background gradient */}
              <div
                className={cn(
                  "absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  `bg-gradient-radial ${feature.gradient}`
                )}
                style={{
                  background: `radial-gradient(circle, ${feature.color}15 0%, transparent 70%)`,
                }}
              />

              {/* Icon */}
              <div
                className="relative h-10 w-10 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: `${feature.color}15`,
                  border: `1px solid ${feature.color}25`,
                  color: feature.color,
                }}
              >
                {feature.icon}
              </div>

              {/* Badge */}
              <Badge variant="default" size="sm" className="mb-3">
                {feature.badge}
              </Badge>

              {/* Content */}
              <h3 className="text-base font-semibold text-white mb-2 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-white/45 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
