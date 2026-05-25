import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight, Check } from "lucide-react";

/**
 * Floating glass mock of a "portfolio dashboard" card.
 * Appears in the hero on the right side.
 *
 * - Glass / frosted look
 * - Soft mint glow behind
 * - Asset-allocation donut with gradient segments + legend
 * - Tabular numbers in Geist Mono
 */
export function PortfolioCard() {
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

        {/* Allocation donut + legend */}
        <AllocationDonut />

        {/* Stats grid */}
        <div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/10 pt-5">
          <Stat label="Invested" value="€98.0K" />
          <Stat label="Gain" value="€25.4K" accent />
          <Stat label="Holdings" value="12" />
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

/* ──────────────────────── Allocation Donut ────────────────────── */

interface Segment {
  label: string;
  percent: number;
  value: string;
  gradId: string;
  swatch: string;
}

const SEGMENTS: Segment[] = [
  {
    label: "Equities",
    percent: 60,
    value: "€74.1k",
    gradId: "pc-grad-equities",
    swatch: "linear-gradient(135deg, #5BD0F4, #3FE5BA)",
  },
  {
    label: "Fixed income",
    percent: 30,
    value: "€37.0k",
    gradId: "pc-grad-bonds",
    swatch: "linear-gradient(135deg, #B66EFF, #5BD0F4)",
  },
  {
    label: "Cash & alts",
    percent: 10,
    value: "€12.3k",
    gradId: "pc-grad-cash",
    swatch:
      "linear-gradient(135deg, rgba(255,255,255,0.55), rgba(255,255,255,0.22))",
  },
];

function AllocationDonut() {
  const SIZE = 124;
  const STROKE = 14;
  const R = (SIZE - STROKE) / 2;
  const CIRC = 2 * Math.PI * R;
  const GAP = 4; // px gap between segments

  let cumulative = 0;
  const renderedSegs = SEGMENTS.map((s) => {
    const length = (s.percent / 100) * CIRC - GAP;
    const offset = -cumulative;
    cumulative += (s.percent / 100) * CIRC;
    return { ...s, length, offset };
  });

  return (
    <div className="mt-6 flex items-center gap-5">
      {/* Donut */}
      <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
        {/* Soft backlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-2 rounded-full opacity-60 blur-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(63,229,186,0.32), transparent 70%)",
          }}
        />

        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="relative -rotate-90"
          aria-label="Asset allocation"
        >
          <defs>
            <linearGradient
              id="pc-grad-equities"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop offset="0%" stopColor="#5BD0F4" />
              <stop offset="100%" stopColor="#3FE5BA" />
            </linearGradient>
            <linearGradient id="pc-grad-bonds" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#B66EFF" />
              <stop offset="100%" stopColor="#5BD0F4" />
            </linearGradient>
            <linearGradient id="pc-grad-cash" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.22" />
            </linearGradient>
          </defs>

          {/* Background track */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={STROKE}
            fill="none"
          />

          {/* Segments — each one draws in with a slight stagger */}
          {renderedSegs.map((s, i) => (
            <motion.circle
              key={s.label}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill="none"
              stroke={`url(#${s.gradId})`}
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={`${s.length} ${CIRC}`}
              initial={{ strokeDashoffset: CIRC }}
              animate={{ strokeDashoffset: s.offset }}
              transition={{
                duration: 0.9,
                delay: 0.4 + i * 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/40">
            Allocation
          </p>
          <p className="mt-1 font-display text-[15px] font-semibold leading-none text-white">
            Diversified
          </p>
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.4 }}
            className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-aurora-mint/15 px-1.5 py-0.5 text-[9px] font-medium text-aurora-mint ring-1 ring-aurora-mint/30"
          >
            <Check size={8} strokeWidth={3.5} />
            8.4 / 10
          </motion.span>
        </div>
      </div>

      {/* Legend */}
      <ul className="flex-1 space-y-3">
        {SEGMENTS.map((s, i) => (
          <motion.li
            key={s.label}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.55 + i * 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex items-baseline justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <span
                  aria-hidden="true"
                  className="inline-block h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-white/10"
                  style={{ background: s.swatch }}
                />
                <span className="truncate text-[12px] font-medium text-white/85">
                  {s.label}
                </span>
              </div>
              <span className="font-mono text-[12px] font-semibold tabular-nums text-white">
                {s.percent}%
              </span>
            </div>
            <p className="ml-[18px] font-mono text-[10px] tabular-nums text-white/40">
              {s.value}
            </p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
