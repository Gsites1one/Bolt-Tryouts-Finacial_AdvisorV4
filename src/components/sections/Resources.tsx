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
    // Prototype-only: simulate success. Wire through Web3Forms / Mailchimp at launch.
    setSubmitted(true);
  }

  return (
    <section aria-label="Free resource" className="section bg-background">
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
                  decision worth auditing once a year. No follow-up sequence
                  &mdash; just the file.
                </p>

                {/* Bullets */}
                <ul className="mt-6 space-y-2.5">
                  {[
                    "Covers protection, savings, investments and debt",
                    "Five-minute audit questions per section",
                    "No marketing emails — the PDF, and that's it",
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
                          Sent &mdash; check your inbox
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

/**
 * Quiet two-page PDF cover mockup.
 * Pure CSS / inline SVG — no aurora glow, no tilt-tower.
 */
function PdfMockup() {
  return (
    <div className="relative w-full max-w-[280px]">
      {/* Back paper (subtle offset, no rotation) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-2 translate-y-2 rounded-[6px] border border-border bg-card opacity-70 shadow-sm"
      />

      {/* Front paper */}
      <div className="relative overflow-hidden rounded-[6px] border border-border bg-card shadow-sm">
        {/* Top band — navy */}
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

        {/* Body — checklist preview lines */}
        <div className="space-y-2 px-5 py-5">
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
                  "inline-flex h-3 w-3 shrink-0 items-center justify-center rounded-[3px] border " +
                  (line.checked
                    ? "border-accent bg-accent/15 text-accent"
                    : "border-border bg-background")
                }
              >
                {line.checked && <Check size={8} strokeWidth={3} />}
              </span>
              <span
                className="h-1.5 rounded-full bg-foreground/[0.06]"
                style={{ width: line.w }}
              />
            </div>
          ))}
        </div>

        {/* Footer label */}
        <div className="border-t border-border px-5 py-2.5">
          <p className="font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Page 1 of 2 &middot; PDF
          </p>
        </div>
      </div>
    </div>
  );
}
