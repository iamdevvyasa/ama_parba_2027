import type { Variants } from "framer-motion";

/**
 * Shared motion vocabulary. Durations and easings mirror the Tailwind tokens
 * so CSS transitions and Framer animations feel like one system.
 *
 * Reduced motion: components use Framer's own `useReducedMotion` rather than a
 * bespoke hook, and the global stylesheet collapses CSS transitions.
 */

export const ease = {
  editorial: [0.22, 1, 0.36, 1],
  entrance: [0.16, 1, 0.3, 1],
} as const;

export const duration = {
  fast: 0.18,
  base: 0.32,
  slow: 0.64,
  reveal: 0.9,
} as const;

/** Standard "rise into place" reveal, used by most sections. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.entrance },
  },
};

/** Same, but no vertical travel - for elements already in a tight layout. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: duration.slow, ease: ease.editorial } },
};

/** Parent that staggers its children's reveals. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Line-by-line headline reveal, clipped by an `overflow-hidden` wrapper. */
export const lineReveal: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: duration.reveal, ease: ease.entrance },
  },
};

/** Shared viewport config so every section triggers at the same point. */
export const viewportOnce = { once: true, amount: 0.25 } as const;
