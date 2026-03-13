export const colors = {
  bg: {
    primary: "#06060F",
    secondary: "#0D0D1A",
    tertiary: "#12121F",
    elevated: "#1A1A2E",
    glass: "rgba(124, 58, 237, 0.04)",
    glassHover: "rgba(124, 58, 237, 0.08)",
  },
  accent: {
    purple: "#7C3AED",
    purpleLight: "#9D5FF0",
    purpleDark: "#5B21B6",
    blue: "#2563EB",
    blueLight: "#3B82F6",
    orange: "#F97316",
    orangeLight: "#FB923C",
    gradient: "linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)",
    gradientOrange: "linear-gradient(135deg, #7C3AED 0%, #F97316 100%)",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "rgba(255, 255, 255, 0.65)",
    tertiary: "rgba(255, 255, 255, 0.35)",
    quaternary: "rgba(255, 255, 255, 0.15)",
  },
  border: {
    default: "rgba(124, 58, 237, 0.12)",
    hover: "rgba(124, 58, 237, 0.25)",
    accent: "rgba(124, 58, 237, 0.4)",
    glass: "rgba(255, 255, 255, 0.08)",
  },
  semantic: {
    success: "#22C55E",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",
  },
} as const;

export type ColorToken = typeof colors;
