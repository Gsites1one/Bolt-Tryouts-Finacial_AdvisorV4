import type { Variants } from "framer-motion";

/**
 * Shared motion tokens — ONE system, reused across the whole site so every
 * animation feels like part of the same design language.
 *
 * Easing: cubic-bezier(0.22, 1, 0.36, 1) — "ease-out-quart" (also exposed in
 * tailwind.config.js as `ease-out-quart` for CSS-driven transitions).
 * Durations are in seconds. Reduced-motion is handled globally via
 * <MotionConfig reducedMotion="user"> (App.tsx) plus per-component guards.
 */

export const EASE_OUT_QUART = [0.22, 1, 0.36, 1] as const;

export const DUR = {
  hover: 0.2, // micro-interactions: buttons, nav underline, FAQ rows (Task 4 / R4)
  base: 0.3, // card / step hover lift, image zoom (Task 4 / R1)
  tween: 0.3, // calculator profile re-set — snappy (Task 10, tightened by R2)
  carousel: 0.55, // reviews cross-fade (Task 11)
  reveal: 0.6, // standard scroll fade-in (Task 3)
  ambient: 0.8, // lead-magnet page cross-fade (Task 12)
  draw: 0.9, // line / checkmark / accent-bar draw-ins (Tasks 9, 13)
  countUp: 1.6, // "By the numbers" count-up (Task 5)
} as const;

/**
 * Interaction accent (R0): ONE gold for every hover/active highlight on the
 * site — process numerals (R1), the FAQ `+` icon (R4), nav underline, links.
 * It is the Tailwind `accent` color (--accent, antique gold #B08A46); use
 * `text-accent` / `bg-accent` so all small interactions speak one language.
 *
 * Shared hover-lift: cards and process steps lift with the SAME translate,
 * SAME shadow and SAME duration so they feel like one deliberate system.
 */
export const HOVER_LIFT =
  "transition-[transform,box-shadow,background-color] duration-300 ease-out-quart hover:-translate-y-1 hover:shadow-md";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_QUART },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_OUT_QUART },
  },
};

export const staggerChildren = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_OUT_QUART },
  },
};
