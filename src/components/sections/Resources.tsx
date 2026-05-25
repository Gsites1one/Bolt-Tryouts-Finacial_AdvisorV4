import { useState } from "react";
import { Download, Check, FileText } from "lucide-react";
import { Button } from "../ui/button";
import { RevealOnScroll } from "../primitives/RevealOnScroll";

export function Resources() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || submitted) return;
    // Prototype-only: simulate success. M7 wires this through Web3Forms.
    setSubmitted(true);
  }

  return (
    <section
      aria-label="Free resource"
      className="section relative overflow-hidden bg-surface"
    >
      {/* Decorative dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(rgb(var(--foreground) / 0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%)",
        }}
      />

      <div className="container-page relative">
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-[28px] border border-border bg-background shadow-[0_24px_80px_-30px_rgba(11,79,74,0.25)]">
            {/* Aurora glow behind the card */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-32 h-[500px] w-[500px] rounded-full opacity-30 blur-[140px]"
              style={{
                background:
                  "radial-gradient(circle, rgba(63,229,186,0.6), transparent 70%)",
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 left-1/4 h-[500px] w-[500px] rounded-full opacity-25 blur-[140px]"
              style={{
                background:
                  "radial-gradient(circle, rgba(182,110,255,0.6), transparent 70%)",
              }}
            />

            <div className="relative grid grid-cols-1 items-center gap-10 p-8 md:gap-12 md:p-12 lg:grid-cols-[5fr_7fr]">
              {/* PDF mockup */}
              <div className="order-2 flex justify-center lg:order-1">
                <PdfMockup />
              </div>

              {/* Copy + form */}
              <div className="order-1 lg:order-2">
                <span className="eyebrow">Free resource</span>
                <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                  The 12-point{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #3FE5BA 0%, #5BD0F4 50%, #B66EFF 100%)",
                    }}
                  >
                    financial health checklist.
                  </span>
                </h2>
                <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
                  A two-page PDF. Walks you through every account, policy, and
                  decision worth auditing once a year. No follow-up sequence —
                  just the file.
                </p>

                {/* Bullets */}
                <ul className="mt-6 space-y-2.5">
                  {[
                    "Cover protection, savings, investments, debt",
                    "Five-minute audit questions per section",
                    "Free, no email sequence after",
                  ].map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-2.5 text-sm text-foreground/80"
                    >
                      <Check
                        size={14}
                        strokeWidth={3}
                        className="mt-1 shrink-0 text-accent"
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>

                {/* Form */}
                <form
                  onSubmit={handleSubmit}
                  className="mt-7"
                  noValidate
                >
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
                        className="h-12 w-full rounded-full border border-border bg-background px-5 text-[15px] text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15 disabled:opacity-60"
                      />
                    </label>
                    <Button
                      type="submit"
                      size="md"
                      className="group h-12 shrink-0 px-6"
                      disabled={submitted}
                    >
                      {submitted ? (
                        <>
                          <Check size={15} strokeWidth={2.5} />
                          Sent — check your inbox
                        </>
                      ) : (
                        <>
                          Get the checklist
                          <Download
                            size={15}
                            className="transition-transform duration-200 group-hover:translate-y-0.5"
                          />
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="mt-2.5 text-[11px] text-muted-foreground">
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

/**
 * Tilted glass PDF cover mockup.
 * Pure CSS / inline SVG — no external image.
 */
function PdfMockup() {
  return (
    <div className="relative w-full max-w-[300px]">
      {/* Outer glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[36px] opacity-50 blur-3xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(63,229,186,0.4), rgba(91,208,244,0.3) 50%, rgba(182,110,255,0.35))",
        }}
      />

      {/* Back paper (offset) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-3 rotate-[6deg] rounded-2xl border border-border bg-background/80 opacity-70 shadow-card"
      />

      {/* Front paper */}
      <div className="relative -rotate-[4deg] overflow-hidden rounded-2xl border border-border bg-background shadow-[0_30px_80px_-20px_rgba(11,79,74,0.3)]">
        {/* Top header band */}
        <div
          className="relative h-28 px-5 py-4"
          style={{
            background:
              "linear-gradient(135deg, #0B4F4A 0%, #0A0F1A 100%)",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(60% 60% at 30% 30%, rgba(63,229,186,0.35), transparent 60%)",
            }}
          />
          <div className="relative flex items-center justify-between text-white">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.18em] ring-1 ring-white/15 backdrop-blur-md">
              <FileText size={9} />
              Checklist
            </span>
            <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/55">
              Aura Capital
            </span>
          </div>
          <div className="relative mt-3">
            <p className="font-display text-[15px] font-semibold leading-tight text-white">
              The 12-point
              <br />
              financial health
              <br />
              checklist
            </p>
          </div>
        </div>

        {/* Body — checklist preview lines */}
        <div className="space-y-2 px-5 py-4">
          {[
            { w: "80%", checked: true },
            { w: "65%", checked: true },
            { w: "75%", checked: true },
            { w: "60%", checked: false },
            { w: "70%", checked: false },
            { w: "55%", checked: false },
          ].map((line, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className={
                  "inline-flex h-3 w-3 shrink-0 items-center justify-center rounded-[4px] border " +
                  (line.checked
                    ? "border-accent bg-accent/15 text-accent"
                    : "border-border bg-background")
                }
              >
                {line.checked && (
                  <Check size={8} strokeWidth={3.5} />
                )}
              </span>
              <span
                className="h-1.5 rounded-full bg-foreground/[0.08]"
                style={{ width: line.w }}
              />
            </div>
          ))}
        </div>

        {/* Footer label */}
        <div className="border-t border-border px-5 py-2.5">
          <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Page 1 of 2 · PDF
          </p>
        </div>
      </div>
    </div>
  );
}
