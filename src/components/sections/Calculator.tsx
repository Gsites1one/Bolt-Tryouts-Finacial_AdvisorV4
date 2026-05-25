import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { RevealOnScroll } from "../primitives/RevealOnScroll";
import { AnimatedCounter } from "../primitives/AnimatedCounter";

/* ───────────────────────────── Math ───────────────────────────── */

interface Inputs {
  initial: number;
  monthly: number;
  years: number;
  rate: number;
}

interface YearPoint {
  year: number;
  balance: number;
  contributed: number;
}

interface Result {
  finalBalance: number;
  totalContributed: number;
  interestEarned: number;
  history: YearPoint[];
}

function compute({ initial, monthly, years, rate }: Inputs): Result {
  const months = years * 12;
  const r = rate / 100 / 12;
  let balance = initial;
  let contributed = initial;
  const history: YearPoint[] = [
    { year: 0, balance: initial, contributed: initial },
  ];
  for (let m = 1; m <= months; m++) {
    balance = balance * (1 + r) + monthly;
    contributed += monthly;
    if (m % 12 === 0) history.push({ year: m / 12, balance, contributed });
  }
  return {
    finalBalance: balance,
    totalContributed: contributed,
    interestEarned: balance - contributed,
    history,
  };
}

const fmtEur = (n: number) =>
  "€" + Math.round(n).toLocaleString("en-US", { maximumFractionDigits: 0 });

/* ─────────────────────────── Component ─────────────────────────── */

export function Calculator() {
  const [inputs, setInputs] = useState<Inputs>({
    initial: 10000,
    monthly: 300,
    years: 20,
    rate: 6,
  });

  const result = useMemo(() => compute(inputs), [inputs]);

  return (
    <section
      id="calculator"
      className="section relative overflow-hidden bg-aurora-base text-white"
    >
      {/* Aurora hint — softer than hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[10%] top-[-30%] h-[600px] w-[600px] rounded-full opacity-40 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(91,208,244,0.65), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[5%] top-[20%] h-[700px] w-[700px] rounded-full opacity-35 blur-[160px]"
        style={{
          background:
            "radial-gradient(circle, rgba(63,229,186,0.65), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[20%] left-[30%] h-[700px] w-[700px] rounded-full opacity-30 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(182,110,255,0.6), transparent 70%)",
        }}
      />

      {/* Dot grid mask */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%)",
        }}
      />

      <div className="container-page relative">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <RevealOnScroll>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-white/85 backdrop-blur-md">
              <Sparkles size={12} className="text-aurora-mint" />
              The math, live
            </span>
          </RevealOnScroll>
          <RevealOnScroll delay={0.05}>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-[2.5rem]">
              See what consistency does.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/65">
              Move the sliders. The chart and final balance update in real
              time. This is the same compounding math behind every plan I
              build.
            </p>
          </RevealOnScroll>
        </div>

        {/* Calculator panel */}
        <RevealOnScroll delay={0.15}>
          <div className="relative mt-14">
            {/* Outer glow */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[32px] opacity-50 blur-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(63,229,186,0.4), rgba(91,208,244,0.25) 50%, rgba(182,110,255,0.3))",
              }}
            />

            <div className="relative grid grid-cols-1 gap-0 overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.03] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.5)] backdrop-blur-2xl lg:grid-cols-[5fr_6fr]">
              {/* ─── LEFT: Sliders ──────────────────────────────────── */}
              <div className="border-b border-white/10 p-7 lg:border-b-0 lg:border-r lg:p-9">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
                  Your inputs
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-white">
                  Play with the numbers
                </h3>

                <div className="mt-7 space-y-7">
                  <Slider
                    label="Initial deposit"
                    value={inputs.initial}
                    onChange={(v) => setInputs({ ...inputs, initial: v })}
                    min={0}
                    max={100000}
                    step={500}
                    format={fmtEur}
                  />
                  <Slider
                    label="Monthly contribution"
                    value={inputs.monthly}
                    onChange={(v) => setInputs({ ...inputs, monthly: v })}
                    min={0}
                    max={2000}
                    step={25}
                    format={fmtEur}
                  />
                  <Slider
                    label="Time horizon"
                    value={inputs.years}
                    onChange={(v) => setInputs({ ...inputs, years: v })}
                    min={1}
                    max={40}
                    step={1}
                    format={(v) => `${v} years`}
                  />
                  <Slider
                    label="Annual return"
                    value={inputs.rate}
                    onChange={(v) => setInputs({ ...inputs, rate: v })}
                    min={2}
                    max={12}
                    step={0.5}
                    format={(v) => `${v}%`}
                  />
                </div>
              </div>

              {/* ─── RIGHT: Results ─────────────────────────────────── */}
              <div className="p-7 lg:p-9">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
                  Projected final balance
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <motion.span
                    key={Math.round(result.finalBalance)}
                    initial={{ opacity: 0.4, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="font-mono text-[44px] font-semibold tabular-nums text-white sm:text-[56px]"
                  >
                    {fmtEur(result.finalBalance)}
                  </motion.span>
                </div>
                <p className="mt-2 text-sm text-white/55">
                  in {inputs.years} years, at {inputs.rate}% annual return.
                </p>

                {/* Chart */}
                <GrowthChart history={result.history} />

                {/* Split bar */}
                <div className="mt-6">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
                    How that breaks down
                  </p>
                  <SplitBar
                    contributed={result.totalContributed}
                    interest={result.interestEarned}
                    total={result.finalBalance}
                  />
                </div>

                {/* CTA */}
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link to="/contact">
                    <Button size="md" className="group">
                      Plan this with an advisor
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </Button>
                  </Link>
                  <p className="text-xs text-white/40">
                    Illustrative only — assumes constant return, no taxes/fees.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* Slider styles — scoped via .aura-slider class */}
      <style>{`
        .aura-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 20px;
          background: transparent;
          cursor: pointer;
        }
        .aura-slider::-webkit-slider-runnable-track {
          height: 4px;
          border-radius: 9999px;
          background: linear-gradient(
            to right,
            #3FE5BA 0%,
            #3FE5BA var(--p, 50%),
            rgba(255,255,255,0.12) var(--p, 50%),
            rgba(255,255,255,0.12) 100%
          );
        }
        .aura-slider::-moz-range-track {
          height: 4px;
          border-radius: 9999px;
          background: linear-gradient(
            to right,
            #3FE5BA 0%,
            #3FE5BA var(--p, 50%),
            rgba(255,255,255,0.12) var(--p, 50%),
            rgba(255,255,255,0.12) 100%
          );
        }
        .aura-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 9999px;
          background: white;
          border: 2px solid #3FE5BA;
          box-shadow: 0 4px 20px rgba(63,229,186,0.5);
          margin-top: -8px;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .aura-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 9999px;
          background: white;
          border: 2px solid #3FE5BA;
          box-shadow: 0 4px 20px rgba(63,229,186,0.5);
        }
        .aura-slider:hover::-webkit-slider-thumb,
        .aura-slider:focus::-webkit-slider-thumb {
          transform: scale(1.15);
          box-shadow: 0 4px 28px rgba(63,229,186,0.7);
        }
        .aura-slider:focus { outline: none; }
      `}</style>
    </section>
  );
}

/* ───────────────────────── Slider primitive ───────────────────── */

interface SliderProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <label className="text-sm font-medium text-white/85">{label}</label>
        <span className="font-mono text-base font-semibold text-aurora-mint tabular-nums">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        className="aura-slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ ["--p" as string]: `${pct}%` } as React.CSSProperties}
      />
      <div className="mt-1.5 flex justify-between text-[11px] text-white/35">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

/* ───────────────────────────── Chart ──────────────────────────── */

function GrowthChart({ history }: { history: YearPoint[] }) {
  const W = 600;
  const H = 200;
  const PAD_TOP = 14;
  const PAD_BOTTOM = 22;
  const maxVal = Math.max(...history.map((p) => p.balance));
  const lastIdx = history.length - 1 || 1;
  const yearLabel = (i: number) => Math.round((i / lastIdx) * history[lastIdx].year);

  const toXY = (val: number, i: number) => {
    const x = (i / lastIdx) * W;
    const y = PAD_TOP + (1 - val / maxVal) * (H - PAD_TOP - PAD_BOTTOM);
    return [x, y] as const;
  };

  const balancePath = history
    .map((p, i) => {
      const [x, y] = toXY(p.balance, i);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  const contribPath = history
    .map((p, i) => {
      const [x, y] = toXY(p.contributed, i);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  const lastBalance = toXY(history[lastIdx].balance, lastIdx);
  const areaPath = `${balancePath} L ${W} ${H - PAD_BOTTOM} L 0 ${H - PAD_BOTTOM} Z`;

  return (
    <div className="mt-6">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-48 w-full"
        preserveAspectRatio="none"
        aria-label="Projected growth chart"
      >
        <defs>
          <linearGradient id="calc-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3FE5BA" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3FE5BA" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="calc-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5BD0F4" />
            <stop offset="100%" stopColor="#3FE5BA" />
          </linearGradient>
        </defs>

        {/* Horizontal guidelines */}
        {[0.25, 0.5, 0.75].map((t) => (
          <line
            key={t}
            x1={0}
            x2={W}
            y1={PAD_TOP + t * (H - PAD_TOP - PAD_BOTTOM)}
            y2={PAD_TOP + t * (H - PAD_TOP - PAD_BOTTOM)}
            stroke="rgba(255,255,255,0.06)"
            strokeDasharray="3 4"
          />
        ))}

        {/* Area */}
        <path d={areaPath} fill="url(#calc-area)" />

        {/* Contributed line (dimmer, dashed) */}
        <path
          d={contribPath}
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          strokeLinecap="round"
        />

        {/* Balance line */}
        <path
          d={balancePath}
          fill="none"
          stroke="url(#calc-line)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Endpoint dot */}
        <circle cx={lastBalance[0]} cy={lastBalance[1]} r={5} fill="#3FE5BA" />
        <circle
          cx={lastBalance[0]}
          cy={lastBalance[1]}
          r={11}
          fill="#3FE5BA"
          opacity="0.25"
        />

        {/* X-axis labels */}
        {[0, Math.floor(lastIdx / 2), lastIdx].map((i) => {
          const [x] = toXY(history[i].balance, i);
          return (
            <text
              key={i}
              x={x}
              y={H - 4}
              textAnchor={i === 0 ? "start" : i === lastIdx ? "end" : "middle"}
              fontFamily="Geist Mono, ui-monospace, monospace"
              fontSize="10"
              fill="rgba(255,255,255,0.4)"
            >
              {yearLabel(i)}y
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-white/55">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-4 rounded-full bg-gradient-to-r from-aurora-cyan to-aurora-mint" />
          Balance
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            className="h-px w-4"
            style={{ background: "rgba(255,255,255,0.45)" }}
          />
          Total contributed
        </span>
      </div>
    </div>
  );
}

/* ───────────────────────── Split bar ───────────────────────── */

function SplitBar({
  contributed,
  interest,
  total,
}: {
  contributed: number;
  interest: number;
  total: number;
}) {
  const contribPct = total > 0 ? (contributed / total) * 100 : 0;
  const interestPct = 100 - contribPct;

  return (
    <div className="mt-3">
      <div className="flex h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full bg-white/40 transition-[width] duration-500 ease-out-quart"
          style={{ width: `${contribPct}%` }}
        />
        <div
          className="h-full transition-[width] duration-500 ease-out-quart"
          style={{
            width: `${interestPct}%`,
            background:
              "linear-gradient(to right, #5BD0F4, #3FE5BA)",
          }}
        />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-4">
        <div>
          <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-white/50">
            <span className="h-2 w-2 rounded-full bg-white/40" />
            You contribute
          </p>
          <p className="mt-1 font-mono text-base font-semibold tabular-nums text-white">
            <AnimatedCounter to={Math.round(contributed)} duration={800} />
            <span className="text-white/50"> €</span>
          </p>
        </div>
        <div>
          <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-white/50">
            <span className="h-2 w-2 rounded-full bg-aurora-mint" />
            Interest earns
          </p>
          <p className="mt-1 font-mono text-base font-semibold tabular-nums text-aurora-mint">
            <AnimatedCounter to={Math.round(interest)} duration={800} />
            <span className="text-aurora-mint/60"> €</span>
          </p>
        </div>
      </div>
    </div>
  );
}
