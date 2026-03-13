import type { Variants } from "framer-motion";
import { animation } from "@/tokens";

const { easing, duration } = animation;

/* ── Fade ─────────────────────────────────────────── */

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.base, ease: easing.smooth },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.slow },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.slow },
  },
};

/* ── Slide ────────────────────────────────────────── */

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: easing.slow },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: easing.slow },
  },
};

/* ── Scale ────────────────────────────────────────── */

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.slow, ease: easing.slow },
  },
};

export const scaleInSpring: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: easing.spring,
  },
};

/* ── Stagger containers ────────────────────────────── */

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.slow },
  },
};

export const staggerItemFast: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: easing.smooth },
  },
};

/* ── Page transition ──────────────────────────────── */

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.slow },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: duration.base, ease: easing.smooth },
  },
};

/* ── Modal / overlay ──────────────────────────────── */

export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.base } },
  exit: { opacity: 0, transition: { duration: duration.fast } },
};

export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.slow },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: duration.fast },
  },
};

/* ── Tooltip ──────────────────────────────────────── */

export const tooltipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 4 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: duration.fast, ease: easing.smooth },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: duration.fast } },
};

/* ── Accordion ────────────────────────────────────── */

export const accordionContent: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: { duration: duration.slow, ease: easing.slow },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: duration.base, ease: easing.smooth },
  },
};

/* ── Hero text ────────────────────────────────────── */

export const heroTitle: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.025 },
  },
};

export const heroChar: Variants = {
  hidden: { opacity: 0, y: "100%", rotateX: -90 },
  visible: {
    opacity: 1,
    y: "0%",
    rotateX: 0,
    transition: { duration: 0.5, ease: easing.slow },
  },
};

/* ── Card hover ───────────────────────────────────── */

export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -6,
    transition: { duration: duration.base, ease: easing.smooth },
  },
};

/* ── Navbar ───────────────────────────────────────── */

export const navbarVariants: Variants = {
  top: { backgroundColor: "rgba(0,0,0,0)", backdropFilter: "blur(0px)" },
  scrolled: {
    backgroundColor: "rgba(0,0,0,0.8)",
    backdropFilter: "blur(20px)",
    transition: { duration: duration.base },
  },
};
