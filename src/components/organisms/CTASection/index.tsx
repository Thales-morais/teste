"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Button } from "@/components/atoms/Button";
import { Icons } from "@/components/atoms/Icon";

export function CTASection() {
  return (
    <section className="section-nova py-32 overflow-hidden">
      <div className="container-nova">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "relative rounded-3xl overflow-hidden",
            "p-12 md:p-20 text-center"
          )}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/25 via-[#0A0A0A] to-[#00D4FF]/15" />
          <div className="absolute inset-0 grid-pattern opacity-20" />

          {/* Animated orbs */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-1/4 w-80 h-80 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(0,102,255,0.2) 0%, transparent 70%)" }}
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.25, 0.4, 0.25] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)" }}
          />

          {/* Border top line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0066FF]/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div
            className="absolute inset-0 rounded-3xl"
            style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }}
          />

          {/* Content */}
          <div className="relative">
            <span className="label-overline mb-4 inline-block">Get started today</span>

            <h2 className="heading-display text-5xl md:text-6xl lg:text-7xl text-white mb-6 max-w-3xl mx-auto">
              Build your next{" "}
              <span className="text-gradient">masterpiece</span>
            </h2>

            <p className="text-white/50 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
              Join thousands of designers and developers building with NOVA.
              Start free, scale effortlessly.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button
                variant="primary"
                size="xl"
                magnetic
                icon={<Icons.ArrowRight />}
                iconPosition="right"
              >
                Start building
              </Button>
              <Button variant="secondary" size="xl">
                View documentation
              </Button>
            </div>

            <p className="mt-6 text-sm text-white/25">
              No credit card required · Free forever plan available
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
