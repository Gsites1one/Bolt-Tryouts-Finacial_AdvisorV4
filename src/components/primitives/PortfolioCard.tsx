import { useEffect, useMemo, useState } from "react";
import { TrendingUp, ArrowUpRight } from "lucide-react";

/**
 * Floating glass mock of a "portfolio dashboard" card.
 * Appears in the hero on the right side.
 *
 * - Glass / frosted look
 * - Soft mint glow behind
 * - Live-redrawing SVG line chart (regenerates every 8s for ambient motion)
 * - Tabular numbers in Geist Mono
 */
export function PortfolioCard() {
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSeed((s) => s + 1), 8000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative">
      {/* Outer glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[36px] opacity-70 blur-3xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(63,229,186,0.35) 0%, rgba(91,208,244,0.2) 50%, rgba(182,110,255,0.25) 100%)",
        }}
      />

      {/* Card */}
      <div className="relative rounded-[28px] border border-white/15 bg-white/[0.04] p-6 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/40">
              Portfolio overview
            </p>
            <p className="mt-1.5 text-xs text-white/55">Demo · real-time mock</p>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-aurora-mint/15 px-2.5 py-1 text-[11px] font-medium text-aurora-mint ring-1 ring-aurora-mint/30">
            <span className="h-1.5 w-1.5 rounded-full bg-aurora-mint motion-safe:animate-pulse-dot" />
            Live
          </div>
        </div>

        {/* Balance */}
        <div className="mt-6">
          <p className="font-mono text-[40px] font-semibold leading-none text-white tabular-nums">
            €123,450
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-aurora-mint/15 px-2 py-0.5 text-xs font-medium text-aurora-mint">
              <TrendingUp size={12} strokeWidth={2.5} />
              +12.4%
            </span>
            <span className="text-xs text-white/45">YTD performance</span>
          </div>
        </div>

        {/* Chart */}
        <PortfolioChart key={seed} />

        {/* Stats grid */}
        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-5">
          <Stat label="Invested" value="€98.0K" />
          <Stat label="Gain" value="€25.4K" accent />
          <Stat label="Asset mix" value="60/30/10" />
        </div>

        {/* Footer hint */}
        <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
          <div>
            <p className="text-xs font-medium text-white/85">Next review</p>
            <p className="text-[11px] text-white/45">Quarterly check-in · Q2 2026</p>
          </div>
          <ArrowUpRight size={16} className="text-white/50" />
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">
        {label}
      </p>
      <p
        className={
          "mt-1 font-mono text-sm font-semibold tabular-nums " +
          (accent ? "text-aurora-mint" : "text-white/90")
        }
      >
        {value}
      </p>
    </div>
  );
}

/**
 * Generated each remount (seed change) for ambient variation.
 * Always trends up (positive demo).
 */
function PortfolioChart() {
  const { path, areaPath, endX, endY } = useMemo(() => {
    const W = 320;
    const H = 96;
    const N = 24;
    const points: [number, number][] = [];
    let y = H - 22;
    for (let i = 0; i < N; i++) {
      const t = i / (N - 1);
      // Bias toward an upward trend with small wiggles
      const drift = -32 * t;
      const noise = (Math.random() - 0.5) * 9;
      y = Math.max(10, Math.min(H - 8, H - 22 + drift + noise));
      // Force final point to be near the top
      if (i === N - 1) y = Math.max(8, 22 + (Math.random() - 0.5) * 6);
      points.push([t * W, y]);
    }
    const p = points
      .map(([x, yy], i) => (i === 0 ? `M${x},${yy}` : `L${x},${yy}`))
      .join(" ");
    const ap = `${p} L${W},${H} L0,${H} Z`;
    return {
      path: p,
      areaPath: ap,
      endX: points[points.length - 1][0],
      endY: points[points.length - 1][1],
    };
  }, []);

  return (
    <div className="mt-5 -mx-1">
      <svg viewBox="0 0 320 96" className="h-24 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chart-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3FE5BA" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3FE5BA" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="chart-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5BD0F4" />
            <stop offset="100%" stopColor="#3FE5BA" />
          </linearGradient>
        </defs>

        {/* Area fill */}
        <path d={areaPath} fill="url(#chart-area)" />

        {/* Line — draws in from left to right */}
        <path
          d={path}
          fill="none"
          stroke="url(#chart-line)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 1000,
            strokeDashoffset: 1000,
            animation: "draw-line 2s cubic-bezier(0.22, 1, 0.36, 1) forwards",
          }}
        />

        {/* Endpoint dot */}
        <circle
          cx={endX - 3}
          cy={endY}
          r="4"
          fill="#3FE5BA"
          style={{
            opacity: 0,
            animation: "fade-up 0.4s ease-out 1.8s forwards",
          }}
        />
        <circle
          cx={endX - 3}
          cy={endY}
          r="9"
          fill="#3FE5BA"
          opacity="0.25"
          style={{
            opacity: 0,
            animation: "fade-up 0.6s ease-out 1.8s forwards",
          }}
        />
      </svg>
    </div>
  );
}
