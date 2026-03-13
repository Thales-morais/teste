export const typography = {
  fonts: {
    display: "'Sora', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  sizes: {
    "2xs": "0.625rem",   // 10px
    xs: "0.75rem",       // 12px
    sm: "0.875rem",      // 14px
    base: "1rem",        // 16px
    lg: "1.125rem",      // 18px
    xl: "1.25rem",       // 20px
    "2xl": "1.5rem",     // 24px
    "3xl": "1.875rem",   // 30px
    "4xl": "2.25rem",    // 36px
    "5xl": "3rem",       // 48px
    "6xl": "3.75rem",    // 60px
    "7xl": "4.5rem",     // 72px
    "8xl": "6rem",       // 96px
    "9xl": "8rem",       // 128px
  },
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeights: {
    none: 1,
    tight: 1.05,
    snug: 1.1,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacings: {
    tighter: "-0.04em",
    tight: "-0.02em",
    normal: "0em",
    wide: "0.04em",
    wider: "0.08em",
    widest: "0.12em",
  },
} as const;
