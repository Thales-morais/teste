"use client";

import { useEffect, useRef } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/animations/gsap";

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  opacity?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  ease?: string;
  start?: string;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    registerGSAP();
    if (!ref.current) return;

    const el = ref.current;
    const {
      y = 50,
      x = 0,
      opacity = 0,
      duration = 0.8,
      stagger = 0.1,
      delay = 0,
      ease = "power3.out",
      start = "top 85%",
    } = options;

    // If the element has children to stagger, animate them
    const children = el.querySelectorAll("[data-reveal]");
    const targets = children.length > 0 ? children : [el];

    gsap.fromTo(
      targets,
      { y, x, opacity },
      {
        y: 0,
        x: 0,
        opacity: 1,
        duration,
        stagger,
        delay,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === el) st.kill();
      });
    };
  }, []);

  return ref;
}

export function useScrollRevealChildren<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    registerGSAP();
    if (!ref.current) return;

    const el = ref.current;
    const {
      y = 40,
      opacity = 0,
      duration = 0.7,
      stagger = 0.12,
      ease = "power3.out",
      start = "top 80%",
    } = options;

    const children = el.children;

    gsap.fromTo(
      children,
      { y, opacity },
      {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === el) st.kill();
      });
    };
  }, []);

  return ref;
}
