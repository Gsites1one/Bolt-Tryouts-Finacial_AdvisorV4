import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Download, Check, FileText } from "lucide-react";
import { Button } from "../ui/button";
import { RevealOnScroll } from "../primitives/RevealOnScroll";
import { EASE_OUT_QUART, DUR } from "../../lib/motion";
import { CALC_HANDOFF_KEY } from "./Calculator";

interface CalcContext {
  initial: number;
  monthly: number;
  years: number;
  rate: number;
  projection: number;
}

const fmtEur = (n: number) =>
  "€" + Math.round(n).toLocaleString("en-US", { maximumFractionDigits: 0 });

export function Resources() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [calcContext, setCalcContext] = useState<CalcContext | null>(null);

  // Pick up the projection handed off by the calculator's "Email me these
  // numbers" CTA (Task 3), if the visitor arrived that way.
  useEffect(() => {
    const raw = sessionStorage.getItem(CALC_HANDOFF_KEY);
    if (!raw) return;
    try {
      setCalcContext(JSON.parse(raw) as CalcContext);
    } catch {
      // ignore malformed value
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || submitted) return;
    // Prototype-only: simulate success. Wire through Web3Forms / Mailchimp at
    // launch — calcContext (hidden fields) should ride along in that payload.
    setSubmitted(true);
    sessionStorage.removeItem(CALC_HANDOFF_KEY);
  }

  return (
    <section id="resources" aria-label="Free resource" className="section bg-background">
      <div className="container-page">
        <RevealOnScroll>
          <div className="overflow-hidden rounded-[0.5rem] border border-border bg-surface/60">
            <div className="grid grid-cols-1 items-center gap-10 p-8 md:gap-14 md:p-14 lg:grid-cols-[5fr_7fr]">
              {/* PDF mockup */}
              <div className="order-2 flex justify-center lg:order-1">
                <PdfMockup />
              </div>

              {/* Copy + form */}
              <div className="order-1 lg:order-2">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Free resource
                </p>
                <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-foreground sm:text-4xl">
                  The 12-point financial health checklist.
                </h2>
                <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
                  A two-page PDF. Walks you through every account, policy and
                  decision worth auditing once a year. No follow-up sequence,
                  just the file.
                </p>

                {calcContext && (
                  <p className="mt-4 inline-flex items-center gap-2 text-[13px] text-muted-foreground">
                    <span className="inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    We&rsquo;ll include your projection of{" "}
                    <span className="font-mono tabular-nums text-foreground">
                      {fmtEur(calcContext.projection)}
                    </span>{" "}
                    over{" "}
                    <span className="font-mono tabular-nums text-foreground">
                      {calcContext.years}
                    </span>{" "}
                    years with the checklist.
                  </p>
                )}

                {/* Bullets */}
                <ul className="mt-6 space-y-2.5">
                  {[
                    "Covers protection, savings, investments and debt",
                    "Five-minute audit questions per section",
                    "No marketing emails. The PDF, and that's it",
                  ].map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-2.5 text-sm text-foreground/80"
                    >
                      <Check
                        size={14}
                        strokeWidth={2.5}
                        className="mt-1 shrink-0 text-accent"
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-8" noValidate>
                  {calcContext && (
                    <>
                      <input type="hidden" name="initial" value={calcContext.initial} />
                      <input type="hidden" name="monthly" value={calcContext.monthly} />
                      <input type="hidden" name="years" value={calcContext.years} />
                      <input type="hidden" name="rate" value={calcContext.rate} />
                      <input
                        type="hidden"
                        name="projection"
                        value={calcContext.projection}
                      />
                    </>
                  )}
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <label className="relative flex-1">
                      <span className="sr-only">Email address</span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        disabled={submitted}
                        required
                        className="h-11 w-full rounded-[0.5rem] border border-border bg-card px-4 text-[15px] text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:opacity-60"
                      />
                    </label>
                    <Button
                      type="submit"
                      size="md"
                      className="group h-11 shrink-0"
                      disabled={submitted}
                    >
                      {submitted ? (
                        <>
                          <Check size={15} strokeWidth={2.5} />
                          Sent. Check your inbox
                        </>
                      ) : (
                        <>
                          Send me the checklist
                          <Download
                            size={15}
                            className="transition-transform duration-200 group-hover:translate-y-0.5"
                          />
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="mt-3 text-[11px] text-muted-foreground">
                    Email used once to deliver the PDF. No marketing, no
                    reselling.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

/* ───────────────────────── Checklist mock data ───────────────────────── */

interface ChecklistRow {
  t: string;
  c: boolean;
}
interface ChecklistGroup {
  section: string;
  rows: ChecklistRow[];
}
interface ChecklistPage {
  footer: string;
  groups: ChecklistGroup[];
}

/** The real 12-point checklist the mock represents, split across two pages. */
const PAGES: ChecklistPage[] = [
  {
    footer: "Page 1 of 2",
    groups: [
      {
        section: "Protection",
        rows: [
          { t: "Emergency fund covers 3-6 months", c: true },
          { t: "Income protection cover in place", c: true },
          { t: "Life cover matches dependents", c: true },
        ],
      },
      {
        section: "Savings",
        rows: [
          { t: "Cash buffer earns a competitive rate", c: true },
          { t: "Short-term goals funded separately", c: false },
        ],
      },
      {
        section: "Investments",
        rows: [{ t: "Portfolio low-cost and diversified", c: false }],
      },
    ],
  },
  {
    footer: "Page 2 of 2",
    groups: [
      {
        section: "Investments",
        rows: [
          { t: "Pension contributions optimised", c: true },
          { t: "No hidden overlap or concentration", c: true },
        ],
      },
      {
        section: "Debt",
        rows: [
          { t: "Mortgage structure and rate reviewed", c: true },
          { t: "No high-interest consumer debt", c: false },
        ],
      },
      {
        section: "Tax & estate",
        rows: [
          { t: "Box-3 / annual tax efficiency reviewed", c: false },
          { t: "Will, beneficiaries and POA up to date", c: false },
        ],
      },
    ],
  },
];

/**
 * Two-page checklist mock. Navy header stays put; the body ambient-cross-fades
 * between page 1 and page 2 (~5s) so the card demonstrates a real 2-page
 * artifact. Hover "fans out" the back page to reveal there are two.
 * Pure CSS / inline SVG — no aurora glow.
 */
function PdfMockup() {
  const reduce = useReducedMotion();
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setPageIndex((p) => (p === 0 ? 1 : 0));
    }, 5000);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div className="group relative w-full max-w-[280px]">
      {/* Back paper — slides out on hover to reveal the second page */}
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-2 translate-y-2 rounded-[6px] border border-border bg-card opacity-70 shadow-sm transition-transform duration-300 ease-out-quart group-hover:translate-x-5 group-hover:translate-y-3 group-hover:rotate-[2deg]"
      />

      {/* Front paper — lifts on hover */}
      <div className="relative overflow-hidden rounded-[6px] border border-border bg-card shadow-sm transition-transform duration-300 ease-out-quart group-hover:-translate-y-1">
        {/* Top band — navy (static) */}
        <div className="bg-primary px-5 py-4 text-primary-foreground">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-primary-foreground/70">
              <FileText size={9} />
              Checklist
            </span>
            <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-primary-foreground/60">
              Aura Capital
            </span>
          </div>
          <p className="mt-4 font-display text-[16px] font-medium leading-tight">
            The 12-point
            <br />
            financial health
            <br />
            checklist
          </p>
        </div>

        {/* Body — two pages stacked, cross-fading */}
        <div className="grid">
          {PAGES.map((page, i) => (
            <motion.div
              key={i}
              aria-hidden={i !== pageIndex}
              className="col-start-1 row-start-1"
              initial={false}
              animate={{ opacity: i === pageIndex ? 1 : 0 }}
              transition={{
                duration: reduce ? 0 : DUR.ambient,
                ease: EASE_OUT_QUART,
              }}
            >
              <ChecklistPageBody page={page} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChecklistPageBody({ page }: { page: ChecklistPage }) {
  return (
    <>
      <div className="px-5 py-4">
        {page.groups.map((group) => (
          <div key={group.section} className="mt-3 first:mt-0">
            <p className="text-[8px] font-medium uppercase tracking-[0.2em] text-accent">
              {group.section}
            </p>
            <div className="mt-1.5 space-y-1.5">
              {group.rows.map((row) => (
                <div key={row.t} className="flex items-center gap-2">
                  <span
                    className={
                      "inline-flex h-3 w-3 shrink-0 items-center justify-center rounded-[3px] border " +
                      (row.c
                        ? "border-accent bg-accent/15 text-accent"
                        : "border-border bg-background")
                    }
                  >
                    {row.c && <Check size={8} strokeWidth={3} />}
                  </span>
                  <span className="text-[9px] leading-tight text-foreground/70">
                    {row.t}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer label */}
      <div className="border-t border-border px-5 py-2.5">
        <p className="font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          {page.footer} &middot; PDF
        </p>
      </div>
    </>
  );
}
