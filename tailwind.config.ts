import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--nova-bg-primary)",
        foreground: "var(--nova-text-primary)",
        nova: {
          "bg-primary": "var(--nova-bg-primary)",
          "bg-secondary": "var(--nova-bg-secondary)",
          "bg-tertiary": "var(--nova-bg-tertiary)",
          "bg-glass": "var(--nova-bg-glass)",
          "accent-blue": "var(--nova-accent-blue)",
          "accent-cyan": "var(--nova-accent-cyan)",
          "text-primary": "var(--nova-text-primary)",
          "text-secondary": "var(--nova-text-secondary)",
          "text-tertiary": "var(--nova-text-tertiary)",
          border: "var(--nova-border)",
          "border-accent": "var(--nova-border-accent)",
        },
      },
      fontFamily: {
        display: ["var(--font-sora)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
        "display-sm": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["3.75rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-lg": ["5rem", { lineHeight: "1", letterSpacing: "-0.04em" }],
        "display-xl": ["6rem", { lineHeight: "1", letterSpacing: "-0.04em" }],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "100": "25rem",
        "120": "30rem",
        "140": "35rem",
        "160": "40rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        "nova-sm": "0 2px 8px rgba(0,0,0,0.3)",
        "nova-md": "0 8px 24px rgba(0,0,0,0.4)",
        "nova-lg": "0 16px 48px rgba(0,0,0,0.5)",
        "nova-xl": "0 24px 64px rgba(0,0,0,0.6)",
        "nova-glow": "0 0 40px rgba(0,102,255,0.3)",
        "nova-glow-lg": "0 0 80px rgba(0,102,255,0.4)",
        "glass": "inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.4)",
      },
      backgroundImage: {
        "nova-gradient": "linear-gradient(135deg, var(--nova-accent-blue), var(--nova-accent-cyan))",
        "nova-gradient-dark": "linear-gradient(180deg, #000000 0%, #0A0A0A 100%)",
        "glass-gradient": "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
        "radial-glow": "radial-gradient(ellipse at center, rgba(0,102,255,0.15) 0%, transparent 70%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        "fade-in": "fade-in 0.5s ease forwards",
        "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,102,255,0.2)" },
          "50%": { boxShadow: "0 0 60px rgba(0,102,255,0.5)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      backdropBlur: {
        "xs": "2px",
        "4xl": "72px",
      },
      transitionTimingFunction: {
        "nova": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "nova-slow": "cubic-bezier(0.16, 1, 0.3, 1)",
        "nova-spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
