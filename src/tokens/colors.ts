export const colors = {
  bg: {
    primary: "#000000",
    secondary: "#0A0A0A",
    tertiary: "#141414",
    elevated: "#1C1C1E",
    glass: "rgba(255, 255, 255, 0.04)",
    glassHover: "rgba(255, 255, 255, 0.08)",
  },
  accent: {
    blue: "#0066FF",
    blueLight: "#338AFF",
    blueDark: "#0052CC",
    cyan: "#00D4FF",
    gradient: "linear-gradient(135deg, #0066FF 0%, #00D4FF 100%)",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "rgba(255, 255, 255, 0.6)",
    tertiary: "rgba(255, 255, 255, 0.3)",
    quaternary: "rgba(255, 255, 255, 0.15)",
  },
  border: {
    default: "rgba(255, 255, 255, 0.08)",
    hover: "rgba(255, 255, 255, 0.16)",
    accent: "rgba(0, 102, 255, 0.4)",
    glass: "rgba(255, 255, 255, 0.1)",
  },
  semantic: {
    success: "#30D158",
    warning: "#FFD60A",
    error: "#FF453A",
    info: "#0066FF",
  },
} as const;

export type ColorToken = typeof colors;
