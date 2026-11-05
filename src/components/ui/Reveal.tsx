"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { riseIn, stagger, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  variants?: Variants;
}

/**
 * Scroll-triggered reveal. Honours prefers-reduced-motion by rendering the
 * content in its final state with no transition.
 */
export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  variants = riseIn,
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  gap?: number;
  delayChildren?: number;
}

/** Parent wrapper that staggers `RevealItem` children. */
export function RevealGroup({
  children,
  className,
  as = "div",
  gap = 0.08,
  delayChildren = 0,
}: RevealGroupProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={stagger(gap, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  variants = riseIn,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div className={cn(className)} variants={variants}>
      {children}
    </motion.div>
  );
}
