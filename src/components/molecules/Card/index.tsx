"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useTiltCard } from "@/animations/hooks/useTiltCard";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
  glow?: boolean;
  glass?: boolean;
  onClick?: () => void;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  children,
  className,
  tilt = false,
  glow = false,
  glass = true,
  onClick,
  padding = "md",
}: CardProps) {
  const { ref, glareRef, onMouseMove, onMouseLeave } = useTiltCard<HTMLDivElement>({
    maxTilt: tilt ? 8 : 0,
    glare: tilt,
  });

  return (
    <motion.div
      ref={tilt ? ref : undefined}
      onMouseMove={tilt ? onMouseMove : undefined}
      onMouseLeave={tilt ? onMouseLeave : undefined}
      onClick={onClick}
      whileHover={!tilt && onClick ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "border transition-all duration-300",
        glass
          ? "bg-white/[0.04] backdrop-blur-xl border-white/[0.08]"
          : "bg-[#141414] border-white/[0.06]",
        glow && "hover:border-[#0066FF]/30 hover:shadow-[0_0_40px_rgba(0,102,255,0.12)]",
        onClick && "cursor-pointer",
        paddingStyles[padding],
        className
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glare overlay */}
      {tilt && (
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
          style={{ opacity: 0 }}
        />
      )}

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {children}
    </motion.div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}
export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}
export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={cn("text-lg font-semibold text-white tracking-tight", className)}>
      {children}
    </h3>
  );
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}
export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn("text-sm text-white/50 leading-relaxed", className)}>
      {children}
    </p>
  );
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}
export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn("mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-3", className)}>
      {children}
    </div>
  );
}
