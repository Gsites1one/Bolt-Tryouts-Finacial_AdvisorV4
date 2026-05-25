import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp } from "../../lib/motion";

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Trigger animation only once when entering viewport (default true). */
  once?: boolean;
}

/**
 * Wrap any block in a fade-up reveal that triggers when it enters the viewport.
 * Honors prefers-reduced-motion (renders content immediately, no animation).
 */
export function RevealOnScroll({
  children,
  delay = 0,
  className,
  once = true,
}: RevealOnScrollProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "0px 0px -80px 0px" }}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
