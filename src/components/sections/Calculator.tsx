import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { RevealOnScroll } from "../primitives/RevealOnScroll";
import { AnimatedCounter } from "../primitives/AnimatedCounter";
import { cn } from "../../lib/utils";

/* ───────────────────────────── Math ───────────────────────────── */

interface Inputs {
  initial: number;
  monthly: number;
  years: number;
  rate: number;
}

/**
 * Three sensible starting points. Each one snaps all four sliders to a
 * coherent profile so a visitor can engage in a single click — then tune.
 */
const PRESETS: Record<string, { label: string; sub: string; inputs: Inputs }> = {
  conservative: {
    label: "Conservative",
    sub: "Lower risk, steady",
    inputs: { initial: 5000, monthly: 200, years: 25, rate: 4 },
  },
  balanced: {
    label: "Balanced",
    sub: "Most common profile",
    inputs: { initial: 10000, monthly: 300, years: 20, rate: 6 },
  },
  aggressive: {
    label: "Aggressive",
    sub: "Higher risk, longer horizon",
    inputs: { initial: 15000, monthly: 500, years: 30, rate: 8 },
  },
};

function inputsEqual(a: Inputs, b: Inputs) {
  return (
    a.initial === b.initial &&
    a.monthly === b.monthly &&
    a.years === b.years &&
    a.rate === b.rate
  );
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
  const [inputs, setInputs] = useState<Inputs>(PRESETS.balanced.inputs);

  const result = useMemo(() => compute(inputs), [inputs]);

  // Build a query string so /contact can pre-fill the message with the
  // visitor's projection — turning the calculator into a soft lead step.
  const planLink = useMemo(() => {
    const params = new URLSearchParams({
      from: "calculator",
      initial: String(inputs.initial),
      monthly: String(inputs.monthly),
      years: String(inputs.years),
      rate: String(inputs.rate),
      projection: String(Math.round(result.finalBalance)),
    });
    return `/contact?${params.toString()}`;
  }, [inputs, result.finalBalance]);

  return (
    <section id="calculator" className="section bg-background">
      <div className="container-page">
        {/* Heading */}
        <div className="max-w-2xl">
          <RevealOnScroll>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              The math, live
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.05}>
            <h2 className="heading-section mt-4">
              See what consistency does.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="mt-5 max-w-xl text-lead">
              Move the sliders &mdash; the chart and projected balance update
              in real time. This is the same compounding math behind every plan
              we build.
            </p>
          </RevealOnScroll>
        </div>

        {/* Calculator panel */}
        <RevealOnScroll delay={0.15}>
          <div className="mt-12 grid grid-cols-1 overflow-hidden rounded-[0.5rem] border border-border bg-card shadow-sm lg:grid-cols-[5fr_6fr]">
            {/* ─── LEFT: Sliders ──────────────────────────────────── */}
            <div className="border-b border-border p-7 lg:border-b-0 lg:border-r lg:p-9">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Your inputs
              </p>
              <h3 className="mt-1 font-display text-xl font-medium text-foreground">
                Play with the numbers
              </h3>

              {/* Quick presets — single click engagement, then tune the sliders */}
              <div className="mt-5">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Start from a profile
                </p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {Object.entries(PRESETS).map(([key, preset]) => {
                    const active = inputsEqual(inputs, preset.inputs);
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setInputs(preset.inputs)}
                        aria-pressed={active}
                        className={cn(
                          "rounded-[0.5rem] border px-3 py-2.5 text-left transition-colors duration-150",
                          active
                            ? "border-primary bg-primary/[0.04] text-foreground"
                            : "border-border bg-card text-foreground/85 hover:border-foreground/30 hover:text-foreground",
                        )}
                      >
                        <span className="block text-[13px] font-medium leading-tight">
                          {preset.label}
                        </span>
                        <span className="mt-0.5 block text-[10px] leading-tight text-muted-foreground">
                          {preset.sub}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

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
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Projected final balance
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <motion.span
                  key={Math.round(result.finalBalance)}
                  initial={{ opacity: 0.5, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="font-mono text-4xl font-medium tabular-nums text-foreground sm:text-5xl"
                >
                  {fmtEur(result.finalBalance)}
                </motion.span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                in <span className="font-mono tabular-nums">{inputs.years}</span>{" "}
                years, at <span className="font-mono tabular-nums">{inputs.rate}%</span>{" "}
                annual return.
              </p>

              {/* Chart */}
              <GrowthChart history={result.history} />

              {/* Split bar */}
              <div className="mt-7">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  How that breaks down
                </p>
                <SplitBar
                  contributed={result.totalContributed}
                  interest={result.interestEarned}
                  total={result.finalBalance}
                />
              </div>

              {/* CTA — carries the current projection into the contact form */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to={planLink}>
                  <Button size="md" className="group">
                    Plan this with an advisor
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </Button>
                </Link>
                <p className="text-xs text-muted-foreground">
                  We&rsquo;ll pre-fill the message with your numbers.
                </p>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                This is an indicative projection, not personal advice. Assumes
                a constant annual return and excludes taxes, fees and inflation.
              </p>
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
          height: 3px;
          border-radius: 9999px;
          background: linear-gradient(
            to right,
            rgb(var(--accent)) 0%,
            rgb(var(--accent)) var(--p, 50%),
            rgb(var(--border)) var(--p, 50%),
            rgb(var(--border)) 100%
          );
        }
        .aura-slider::-moz-range-track {
          height: 3px;
          border-radius: 9999px;
          background: linear-gradient(
            to right,
            rgb(var(--accent)) 0%,
            rgb(var(--accent)) var(--p, 50%),
            rgb(var(--border)) var(--p, 50%),
            rgb(var(--border)) 100%
          );
        }
        .aura-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: rgb(var(--primary));
          border: 2px solid rgb(var(--bg));
          box-shadow: 0 0 0 1px rgb(var(--border));
          margin-top: -7.5px;
          transition: transform 0.15s ease;
        }
        .aura-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: rgb(var(--primary));
          border: 2px solid rgb(var(--bg));
          box-shadow: 0 0 0 1px rgb(var(--border));
        }
        .aura-slider:hover::-webkit-slider-thumb,
        .aura-slider:focus::-webkit-slider-thumb {
          transform: scale(1.12);
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
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="font-mono text-sm font-medium tabular-nums text-foreground">
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
      <div className="mt-1.5 flex justify-between text-[11px] font-mono tabular-nums text-muted-foreground">
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
            <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0.18" />
            <stop offset="100%" stopColor="rgb(var(--accent))" stopOpacity="0" />
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
            stroke="rgb(var(--border))"
            strokeDasharray="3 4"
          />
        ))}

        {/* Area */}
        <path d={areaPath} fill="url(#calc-area)" />

        {/* Contributed line (dimmer, dashed) */}
        <path
          d={contribPath}
          fill="none"
          stroke="rgb(var(--muted-foreground))"
          strokeOpacity="0.55"
          strokeWidth={1.25}
          strokeDasharray="4 4"
          strokeLinecap="round"
        />

        {/* Balance line */}
        <path
          d={balancePath}
          fill="none"
          stroke="rgb(var(--primary))"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Endpoint dot */}
        <circle cx={lastBalance[0]} cy={lastBalance[1]} r={4} fill="rgb(var(--accent))" />

        {/* X-axis labels */}
        {[0, Math.floor(lastIdx / 2), lastIdx].map((i) => {
          const [x] = toXY(history[i].balance, i);
          return (
            <text
              key={i}
              x={x}
              y={H - 4}
              textAnchor={i === 0 ? "start" : i === lastIdx ? "end" : "middle"}
              fontFamily="IBM Plex Mono, ui-monospace, monospace"
              fontSize="10"
              fill="rgb(var(--muted-foreground))"
            >
              {yearLabel(i)}y
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="h-px w-4 bg-primary" />
          Projected balance
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            className="h-px w-4"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 50%, transparent 0)",
              backgroundSize: "6px 1px",
            }}
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
      <div className="flex h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-muted-foreground/40 transition-[width] duration-500 ease-out-quart"
          style={{ width: `${contribPct}%` }}
        />
        <div
          className="h-full bg-accent transition-[width] duration-500 ease-out-quart"
          style={{ width: `${interestPct}%` }}
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
            You contribute
          </p>
          <p className="mt-1.5 font-mono text-base font-medium tabular-nums text-foreground">
            €<AnimatedCounter to={Math.round(contributed)} duration={800} />
          </p>
        </div>
        <div>
          <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Interest earns
          </p>
          <p className="mt-1.5 font-mono text-base font-medium tabular-nums text-foreground">
            €<AnimatedCounter to={Math.round(interest)} duration={800} />
          </p>
        </div>
      </div>
    </div>
  );
}
