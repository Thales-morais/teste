"use client";

import { useRef, useCallback } from "react";

interface TiltOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  glare?: boolean;
  maxGlare?: number;
}

export function useTiltCard<T extends HTMLElement>(options: TiltOptions = {}) {
  const ref = useRef<T>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);

  const {
    maxTilt = 10,
    perspective = 1000,
    scale = 1.02,
    speed = 400,
    glare = true,
    maxGlare = 0.3,
  } = options;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * maxTilt;
      const rotateX = -((y - centerY) / centerY) * maxTilt;

      ref.current.style.transition = `transform ${speed * 0.001}s ease-out`;
      ref.current.style.transform = `
        perspective(${perspective}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(${scale})
      `;

      // Glare effect
      if (glare && glareRef.current) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glareRef.current.style.opacity = String(maxGlare);
        glareRef.current.style.background = `
          radial-gradient(
            circle at ${glareX}% ${glareY}%,
            rgba(255,255,255,${maxGlare}) 0%,
            transparent 60%
          )
        `;
      }
    },
    [maxTilt, perspective, scale, speed, glare, maxGlare]
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transition = `transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)`;
    ref.current.style.transform = `
      perspective(${perspective}px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
    if (glare && glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  }, [perspective, glare]);

  return {
    ref,
    glareRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
}
