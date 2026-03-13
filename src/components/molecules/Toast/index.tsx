"use client";

import React, { createContext, useContext, useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icons } from "@/components/atoms/Icon";

type ToastType = "default" | "success" | "error" | "warning" | "info";

interface ToastItem {
  id: string;
  message: string;
  description?: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextValue {
  toast: (opts: Omit<ToastItem, "id">) => void;
  success: (message: string, description?: string) => void;
  error: (message: string, description?: string) => void;
  warning: (message: string, description?: string) => void;
  info: (message: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const typeConfig: Record<ToastType, { icon: React.ReactNode; color: string }> = {
  default: { icon: null, color: "border-white/10" },
  success: { icon: <Icons.Check className="text-[#30D158]" />, color: "border-[#30D158]/30" },
  error: { icon: <Icons.X className="text-[#FF453A]" />, color: "border-[#FF453A]/30" },
  warning: { icon: <span className="text-[#FFD60A] text-sm">⚠</span>, color: "border-[#FFD60A]/30" },
  info: { icon: <span className="text-[#0066FF] text-sm">i</span>, color: "border-[#0066FF]/30" },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const add = useCallback(
    (opts: Omit<ToastItem, "id">) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { ...opts, id }]);
      setTimeout(() => remove(id), opts.duration ?? 4000);
    },
    [remove]
  );

  const value: ToastContextValue = {
    toast: add,
    success: (m, d) => add({ message: m, description: d, type: "success" }),
    error: (m, d) => add({ message: m, description: d, type: "error" }),
    warning: (m, d) => add({ message: m, description: d, type: "warning" }),
    info: (m, d) => add({ message: m, description: d, type: "info" }),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="fixed bottom-4 right-4 z-[500] flex flex-col gap-2 pointer-events-none"
        aria-live="polite"
      >
        <AnimatePresence>
          {toasts.map((t) => {
            const { icon, color } = typeConfig[t.type];
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 60, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 60, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={cn(
                  "pointer-events-auto",
                  "min-w-[280px] max-w-sm",
                  "rounded-xl px-4 py-3",
                  "bg-[#0A0A0A]/95 backdrop-blur-xl",
                  "border shadow-[0_8px_32px_rgba(0,0,0,0.6)]",
                  "flex items-start gap-3",
                  color
                )}
              >
                {icon && <span className="shrink-0 mt-0.5">{icon}</span>}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{t.message}</p>
                  {t.description && (
                    <p className="text-xs text-white/50 mt-0.5">{t.description}</p>
                  )}
                </div>
                <button
                  onClick={() => remove(t.id)}
                  className="shrink-0 text-white/30 hover:text-white transition-colors"
                >
                  <Icons.X className="h-3 w-3" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
