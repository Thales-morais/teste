"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icons } from "@/components/atoms/Icon";
import { overlayVariants, modalVariants } from "@/animations/variants";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeStyles = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
  className,
}: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-[400] bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[401] flex items-center justify-center p-4">
            <motion.div
              key="modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                "relative w-full rounded-2xl",
                "bg-[#0A0A0A] border border-white/10",
                "shadow-[0_24px_80px_rgba(0,0,0,0.8)]",
                "p-6",
                sizeStyles[size],
                className
              )}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? "modal-title" : undefined}
            >
              {/* Top line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-t-2xl" />

              {/* Header */}
              {(title || description) && (
                <div className="mb-5">
                  {title && (
                    <h2
                      id="modal-title"
                      className="text-lg font-semibold text-white tracking-tight"
                    >
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="mt-1 text-sm text-white/50">{description}</p>
                  )}
                </div>
              )}

              {/* Close */}
              <button
                onClick={onClose}
                className={cn(
                  "absolute top-4 right-4",
                  "h-7 w-7 rounded-lg flex items-center justify-center",
                  "bg-white/5 hover:bg-white/10 border border-white/[0.06]",
                  "text-white/40 hover:text-white",
                  "transition-all duration-200",
                  "focus-ring"
                )}
                aria-label="Close modal"
              >
                <Icons.X className="h-3.5 w-3.5" />
              </button>

              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
