import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface AuroraBackgroundProps {
  children?: ReactNode;
  className?: string;
  /** Show the bottom gradient fade that blends into the next section. */
  withBottomFade?: boolean;
}

/**
 * Multi-layered dynamic background for the hero.
 *
 * Stack (back to front):
 *   1. Solid near-black base
 *   2. Slow-rotating conic gradient ring (top center)
 *   3. Four blurred radial blobs drifting on independent timelines
 *   4. Vertical light beam through center
 *   5. Subtle dotted grid with radial mask
 *   6. SVG noise grain overlay
 *   7. Bottom edge fade to page background
 *
 * All CSS — no canvas, no WebGL. Respects `prefers-reduced-motion`.
 */
export function AuroraBackground({
  children,
  className,
  withBottomFade = true,
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-aurora-base",
        className,
      )}
    >
      {/* 1. Conic gradient rotating ring — top center, masked to a ring */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[35%] left-1/2 h-[1100px] w-[1100px] motion-safe:animate-spin-slow opacity-40"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(63,229,186,0.55) 60deg, transparent 120deg, rgba(91,208,244,0.45) 200deg, transparent 260deg, rgba(182,110,255,0.55) 340deg, transparent 360deg)",
          maskImage:
            "radial-gradient(closest-side at 50% 50%, transparent 35%, black 65%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(closest-side at 50% 50%, transparent 35%, black 65%, transparent 95%)",
          transform: "translate(-50%, 0)",
        }}
      />

      {/* 2. Aurora blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[10%] top-[-15%] h-[640px] w-[640px] rounded-full opacity-70 motion-safe:animate-aurora-a"
        style={{
          background:
            "radial-gradient(circle at center, rgba(182,110,255,0.85), transparent 70%)",
          filter: "blur(120px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-5%] top-[5%] h-[720px] w-[720px] rounded-full opacity-65 motion-safe:animate-aurora-b"
        style={{
          background:
            "radial-gradient(circle at center, rgba(91,208,244,0.85), transparent 70%)",
          filter: "blur(140px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[20%] left-[15%] h-[820px] w-[820px] rounded-full opacity-60 motion-safe:animate-aurora-c"
        style={{
          background:
            "radial-gradient(circle at center, rgba(63,229,186,0.85), transparent 70%)",
          filter: "blur(120px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[15%] top-[40%] h-[520px] w-[520px] rounded-full opacity-40 motion-safe:animate-aurora-d"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,107,181,0.85), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* 3. Vertical light beam through center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[700px] w-[2px] motion-safe:animate-beam-fall"
        style={{
          background:
            "linear-gradient(to bottom, rgba(63,229,186,0.65) 0%, rgba(63,229,186,0.15) 40%, transparent 100%)",
          filter: "blur(1px)",
        }}
      />

      {/* 4. Dotted grid overlay with radial mask */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage:
            "radial-gradient(ellipse 75% 60% at 50% 40%, black 20%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 60% at 50% 40%, black 20%, transparent 80%)",
        }}
      />

      {/* 5. Noise grain overlay (SVG fractal noise) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.08]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* 6. Bottom edge fade into page background */}
      {withBottomFade && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"
        />
      )}

      {/* Content slot */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
