import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  /** Final value to count to. */
  to: number;
  /** Starting value (default 0). */
  from?: number;
  /** Duration in ms (default 1600). */
  duration?: number;
  /** Decimal places (default 0). */
  decimals?: number;
  className?: string;
}

/**
 * Counts from `from` → `to` once when the element first enters the viewport.
 * Uses `requestAnimationFrame` with an ease-out-quart curve.
 * Honors `prefers-reduced-motion` (renders final value immediately).
 */
export function AnimatedCounter({
  to,
  from = 0,
  duration = 1600,
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : from);

  useEffect(() => {
    if (!inView || reduce) {
      setVal(to);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4); // ease-out-quart
      setVal(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, from, to, duration, reduce]);

  const formatted = val.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {formatted}
    </span>
  );
}
