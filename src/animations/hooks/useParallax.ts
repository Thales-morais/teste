"use client";

import { useRef, useEffect } from "react";
import { registerGSAP, gsap } from "@/animations/gsap";

interface ParallaxOptions {
  speed?: number;
  direction?: "vertical" | "horizontal";
}

export function useParallax<T extends HTMLElement>(
  options: ParallaxOptions = {}
) {
  const ref = useRef<T>(null);
  const { speed = 0.3, direction = "vertical" } = options;

  useEffect(() => {
    registerGSAP();
    if (!ref.current) return;

    const el = ref.current;
    const tl = gsap.to(el, {
      y: direction === "vertical" ? `${speed * 100}%` : 0,
      x: direction === "horizontal" ? `${speed * 100}%` : 0,
      ease: "none",
      scrollTrigger: {
        trigger: el.parentElement || el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tl.kill();
    };
  }, [speed, direction]);

  return ref;
}
