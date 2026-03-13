"use client";

import React from "react";
import { motion } from "framer-motion";
import { Accordion } from "@/components/molecules/Accordion";

const faqs = [
  {
    id: "1",
    question: "What is NOVA Design System?",
    answer:
      "NOVA is a complete design system for the modern web, built with Next.js, TypeScript, Framer Motion, and GSAP. It includes 50+ components, a comprehensive token system, and a powerful animation library — all inspired by Apple's attention to detail.",
  },
  {
    id: "2",
    question: "How do I get started?",
    answer:
      "Install the NOVA package via npm, import the CSS tokens and component styles in your app root, and start importing components. Full documentation is available in the /docs section with live examples and code snippets.",
  },
  {
    id: "3",
    question: "Is NOVA accessible?",
    answer:
      "Yes. Every component in NOVA is built to WCAG 2.1 AA standards. We use Radix UI primitives for complex interactive components (Modal, Accordion, Tooltip, Dropdown) which provide robust keyboard navigation and screen reader support out of the box.",
  },
  {
    id: "4",
    question: "Can I customize the design tokens?",
    answer:
      "Absolutely. NOVA uses CSS custom properties (variables) for all tokens, making customization straightforward. Override any token globally in your CSS, or use the TypeScript token definitions to extend the theme in your Tailwind config.",
  },
  {
    id: "5",
    question: "Does NOVA support dark mode?",
    answer:
      "NOVA is dark mode first. All components, tokens, and animations are designed and optimized for dark interfaces. Light mode support can be added by overriding the CSS variables under a `.light` class selector.",
  },
  {
    id: "6",
    question: "Are the animations optimized for performance?",
    answer:
      "Yes. All animations use GPU-accelerated CSS properties (transform, opacity). Framer Motion handles most micro-interactions while GSAP ScrollTrigger powers complex scroll-driven animations. We never animate layout properties like width, height, or top/left.",
  },
];

export function FAQSection() {
  return (
    <section className="section-nova py-32 bg-[#0A0A0A]">
      <div className="container-nova max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="label-overline">FAQ</span>
          <h2 className="heading-xl text-4xl md:text-5xl text-white mt-3">
            Frequently asked questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <Accordion items={faqs} allowMultiple />
        </motion.div>
      </div>
    </section>
  );
}
