"use client";

import { useRef, useEffect, useState } from "react";
import { registerGSAP, gsap } from "@/animations/gsap";

interface CountUpOptions {
  end: number;
  start?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function useCountUp(options: CountUpOptions) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(options.start ?? 0);
  const {
    end,
    start = 0,
    duration = 2,
    prefix = "",
    suffix = "",
    decimals = 0,
  } = options;

  useEffect(() => {
    registerGSAP();
    if (!ref.current) return;

    const el = ref.current;
    const obj = { val: start };

    const tween = gsap.to(obj, {
      val: end,
      duration,
      ease: "power2.out",
      onUpdate() {
        setValue(obj.val);
      },
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [end, start, duration]);

  const formatted = `${prefix}${value.toFixed(decimals)}${suffix}`;

  return { ref, formatted };
}
