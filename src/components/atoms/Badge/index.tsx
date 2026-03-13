import React from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "default" | "primary" | "success" | "warning" | "danger" | "outline";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-white/10 text-white/80 border border-white/10",
  primary: "bg-[#0066FF]/20 text-[#338AFF] border border-[#0066FF]/30",
  success: "bg-[#30D158]/15 text-[#30D158] border border-[#30D158]/25",
  warning: "bg-[#FFD60A]/15 text-[#FFD60A] border border-[#FFD60A]/25",
  danger: "bg-[#FF453A]/15 text-[#FF453A] border border-[#FF453A]/25",
  outline: "bg-transparent text-white/60 border border-white/15",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "text-[0.65rem] px-2 py-0.5 rounded-md tracking-wide",
  md: "text-xs px-2.5 py-1 rounded-lg tracking-wide",
  lg: "text-sm px-3 py-1.5 rounded-lg",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-white/60",
  primary: "bg-[#0066FF]",
  success: "bg-[#30D158]",
  warning: "bg-[#FFD60A]",
  danger: "bg-[#FF453A]",
  outline: "bg-white/40",
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  dot = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full shrink-0",
            dotColors[variant],
            variant === "success" && "animate-pulse"
          )}
        />
      )}
      {children}
    </span>
  );
}
