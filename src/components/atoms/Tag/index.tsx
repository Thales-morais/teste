import React from "react";
import { cn } from "@/lib/cn";

interface TagProps {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}

export function Tag({ children, onClick, active = false, className }: TagProps) {
  const isInteractive = !!onClick;

  return (
    <span
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={isInteractive ? (e) => e.key === "Enter" && onClick?.() : undefined}
      className={cn(
        "inline-flex items-center",
        "text-xs font-medium px-3 py-1.5 rounded-full",
        "border transition-all duration-200",
        active
          ? "bg-[#0066FF]/20 text-[#338AFF] border-[#0066FF]/40"
          : "bg-white/5 text-white/50 border-white/10",
        isInteractive && [
          "cursor-pointer select-none",
          "hover:bg-white/10 hover:text-white/80 hover:border-white/20",
          "focus-ring",
        ],
        className
      )}
    >
      {children}
    </span>
  );
}
