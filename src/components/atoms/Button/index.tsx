"use client";

import React, { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";
import { useMagneticEffect } from "@/animations/hooks/useMagneticEffect";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  magnetic?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  children?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-gradient-to-r from-[#0066FF] to-[#00D4FF]",
    "text-white font-semibold",
    "hover:shadow-[0_0_30px_rgba(0,102,255,0.5)]",
    "active:scale-[0.98]",
    "border border-transparent",
  ].join(" "),
  secondary: [
    "bg-white/10 hover:bg-white/15",
    "text-white font-medium",
    "border border-white/10 hover:border-white/20",
    "backdrop-blur-sm",
  ].join(" "),
  ghost: [
    "bg-transparent hover:bg-white/8",
    "text-white/70 hover:text-white",
    "border border-transparent",
  ].join(" "),
  outline: [
    "bg-transparent",
    "text-[#0066FF] font-semibold",
    "border border-[#0066FF]/60 hover:border-[#0066FF]",
    "hover:bg-[#0066FF]/10",
  ].join(" "),
  danger: [
    "bg-gradient-to-r from-[#FF453A] to-[#FF6B6B]",
    "text-white font-semibold",
    "hover:shadow-[0_0_30px_rgba(255,69,58,0.4)]",
    "border border-transparent",
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-4 text-sm rounded-lg gap-1.5",
  md: "h-10 px-5 text-sm rounded-xl gap-2",
  lg: "h-12 px-6 text-base rounded-xl gap-2.5",
  xl: "h-14 px-8 text-base rounded-2xl gap-3",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (
    {
      variant = "primary",
      size = "md",
      magnetic = false,
      loading = false,
      icon,
      iconPosition = "left",
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    _ref // eslint-disable-line @typescript-eslint/no-unused-vars
  ) => {
    const magneticHook = useMagneticEffect<HTMLButtonElement>({ strength: 0.3 });

    const buttonRef = magnetic ? magneticHook.ref : undefined;
    const extraHandlers = magnetic
      ? {
          onMouseMove: magneticHook.onMouseMove,
          onMouseLeave: magneticHook.onMouseLeave,
        }
      : {};

    return (
      <motion.button
        ref={buttonRef}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "relative inline-flex items-center justify-center",
          "select-none cursor-pointer",
          "transition-all duration-300",
          "focus-ring",
          "overflow-hidden",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          (disabled || loading) && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
        disabled={disabled || loading}
        {...extraHandlers}
        {...props}
      >
        {/* Shimmer on primary */}
        {variant === "primary" && (
          <span className="absolute inset-0 overflow-hidden rounded-inherit">
            <span
              className="absolute inset-0 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite]"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
              }}
            />
          </span>
        )}

        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </span>
        )}

        <span
          className={cn(
            "relative flex items-center",
            sizeStyles[size].includes("gap") ? "" : "gap-2",
            loading && "invisible",
            "gap-2"
          )}
        >
          {icon && iconPosition === "left" && (
            <span className="shrink-0">{icon}</span>
          )}
          {children}
          {icon && iconPosition === "right" && (
            <span className="shrink-0">{icon}</span>
          )}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";
