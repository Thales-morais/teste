export * from "./colors";
export * from "./typography";
export * from "./spacing";

export const animation = {
  easing: {
    smooth: [0.25, 0.46, 0.45, 0.94] as const,
    slow: [0.16, 1, 0.3, 1] as const,
    spring: { type: "spring" as const, stiffness: 300, damping: 30 },
    bounce: { type: "spring" as const, stiffness: 400, damping: 20 },
    snappy: [0.4, 0, 0.2, 1] as const,
  },
  duration: {
    instant: 0.1,
    fast: 0.15,
    base: 0.3,
    slow: 0.6,
    slower: 1.0,
    slowest: 1.5,
  },
} as const;
