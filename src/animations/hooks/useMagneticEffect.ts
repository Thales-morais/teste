"use client";

import { useRef, useCallback } from "react";

interface MagneticOptions {
  strength?: number;
  ease?: number;
}

export function useMagneticEffect<T extends HTMLElement>(
  options: MagneticOptions = {}
) {
  const ref = useRef<T>(null);
  const { strength = 0.4, ease = 0.15 } = options;
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const targetX = (e.clientX - centerX) * strength;
      const targetY = (e.clientY - centerY) * strength;

      cancelAnimationFrame(rafRef.current);
      const animate = () => {
        posRef.current.x += (targetX - posRef.current.x) * ease;
        posRef.current.y += (targetY - posRef.current.y) * ease;

        if (ref.current) {
          ref.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
        }

        if (
          Math.abs(targetX - posRef.current.x) > 0.1 ||
          Math.abs(targetY - posRef.current.y) > 0.1
        ) {
          rafRef.current = requestAnimationFrame(animate);
        }
      };
      rafRef.current = requestAnimationFrame(animate);
    },
    [strength, ease]
  );

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const resetAnimation = () => {
      posRef.current.x += (0 - posRef.current.x) * 0.1;
      posRef.current.y += (0 - posRef.current.y) * 0.1;

      if (ref.current) {
        ref.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      }

      if (
        Math.abs(posRef.current.x) > 0.1 ||
        Math.abs(posRef.current.y) > 0.1
      ) {
        rafRef.current = requestAnimationFrame(resetAnimation);
      } else {
        if (ref.current) {
          ref.current.style.transform = "translate(0px, 0px)";
        }
        posRef.current = { x: 0, y: 0 };
      }
    };
    rafRef.current = requestAnimationFrame(resetAnimation);
  }, []);

  return { ref, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
}
