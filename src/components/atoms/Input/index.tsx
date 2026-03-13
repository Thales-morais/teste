"use client";

import React, { forwardRef, useState } from "react";
import { cn } from "@/lib/cn";

type InputSize = "sm" | "md" | "lg";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  inputSize?: InputSize;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

const sizeStyles: Record<InputSize, string> = {
  sm: "h-9 text-sm px-3",
  md: "h-11 text-sm px-4",
  lg: "h-13 text-base px-5",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      inputSize = "md",
      icon,
      iconRight,
      fullWidth = false,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-white/70"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {icon && (
            <span className="absolute left-3.5 text-white/40 pointer-events-none">
              {icon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            onFocus={(e) => {
              setFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              props.onBlur?.(e);
            }}
            className={cn(
              "w-full rounded-xl bg-white/5 text-white",
              "border transition-all duration-300 outline-none",
              "placeholder:text-white/25",
              sizeStyles[inputSize],
              icon && "pl-10",
              iconRight && "pr-10",
              error
                ? "border-[#FF453A]/60 focus:border-[#FF453A] focus:ring-1 focus:ring-[#FF453A]/30"
                : focused
                ? "border-[#0066FF]/60 ring-1 ring-[#0066FF]/20 bg-white/8"
                : "border-white/10 hover:border-white/20",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              className
            )}
            {...props}
          />

          {iconRight && (
            <span className="absolute right-3.5 text-white/40 pointer-events-none">
              {iconRight}
            </span>
          )}
        </div>

        {(error || hint) && (
          <span
            className={cn(
              "text-xs",
              error ? "text-[#FF453A]" : "text-white/40"
            )}
          >
            {error ?? hint}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
