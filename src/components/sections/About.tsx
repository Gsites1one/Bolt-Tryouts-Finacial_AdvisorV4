import { Check, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { RevealOnScroll } from "../primitives/RevealOnScroll";
import { fadeUp, staggerChildren } from "../../lib/motion";

const principles = [
  {
    title: "Fee-only, never commission.",
    body: "I work for you, not for a product manufacturer.",
  },
  {
    title: "Plain English, always.",
    body: "If I can't explain it on one page, you shouldn't buy it.",
  },
  {
    title: "Long-term by default.",
    body: "Anyone selling you a five-week strategy is selling something else.",
  },
];

export function About() {
  return (
    <section id="about" className="section relative bg-background">
      <div className="container-page">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[5fr_6fr] lg:gap-20">
          {/* Portrait placeholder */}
          <RevealOnScroll>
            <div className="relative">
              {/* Outer aurora glow */}
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-[36px] opacity-50 blur-3xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(63,229,186,0.35), rgba(91,208,244,0.25) 50%, rgba(182,110,255,0.3))",
                }}
              />

              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_30px_80px_-20px_rgba(11,79,74,0.25)]">
                {/* Gradient backdrop in case there's no photo yet */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #0B4F4A 0%, #0A0F1A 60%, #1E2632 100%)",
                  }}
                />
                {/* Subtle aurora veil */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-50"
                  style={{
                    background:
                      "radial-gradient(60% 50% at 30% 30%, rgba(63,229,186,0.4), transparent 60%), radial-gradient(50% 40% at 80% 80%, rgba(182,110,255,0.35), transparent 60%)",
                  }}
                />
                {/* Noise grain */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 mix-blend-overlay opacity-[0.08]"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                  }}
                />

                {/* Photo placeholder marker */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3 text-white/80">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
                      <Camera size={20} strokeWidth={1.8} />
                    </div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/55">
                      ⟶ Founder photo
                    </p>
                  </div>
                </div>

                {/* Floating credential card */}
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-white/[0.05] p-4 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div
                      aria-hidden="true"
                      className="h-10 w-10 shrink-0 rounded-xl"
                      style={{
                        background:
                          "linear-gradient(135deg, #3FE5BA, #5BD0F4 60%, #B66EFF)",
                      }}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        Jan Kowalski, EFA
                      </p>
                      <p className="truncate text-xs text-white/55">
                        Founder · 12 years advising
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Copy */}
          <div>
            <RevealOnScroll>
              <span className="eyebrow">About</span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.05}>
              <h2 className="heading-section mt-5">Why I do this.</h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
                I spent eight years inside two of Europe's biggest banks before
                I left. The reason was simple: I was paid to sell products, not
                to give advice. Aura Capital exists because financial planning
                should look nothing like that.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.15}>
              <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
                No commissions from third parties. No quotas. Just one person,
                sitting across from you, doing the work.
              </p>
            </RevealOnScroll>

            {/* Principles */}
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              variants={staggerChildren(0.1, 0.2)}
              className="mt-10 space-y-4"
            >
              {principles.map((p) => (
                <motion.li
                  key={p.title}
                  variants={fadeUp}
                  className="flex items-start gap-4"
                >
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/30">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <div>
                    <p className="font-display text-base font-semibold text-foreground">
                      {p.title}
                    </p>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
                      {p.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
