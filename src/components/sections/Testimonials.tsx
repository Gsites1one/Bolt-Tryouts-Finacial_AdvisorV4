import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import {
  testimonials,
  type Testimonial,
  type Accent,
} from "../../data/testimonials";
import { RevealOnScroll } from "../primitives/RevealOnScroll";
import { fadeUp, staggerChildren } from "../../lib/motion";
import { cn } from "../../lib/utils";

const accentGradient: Record<Accent, string> = {
  mint: "linear-gradient(135deg, #3FE5BA 0%, #5BD0F4 100%)",
  cyan: "linear-gradient(135deg, #5BD0F4 0%, #B66EFF 100%)",
  violet: "linear-gradient(135deg, #B66EFF 0%, #FF6BB5 100%)",
};

const accentTint: Record<Accent, string> = {
  mint: "rgba(63,229,186,0.14)",
  cyan: "rgba(91,208,244,0.14)",
  violet: "rgba(182,110,255,0.14)",
};

export function Testimonials() {
  return (
    <section
      aria-label="What clients say"
      className="section relative overflow-hidden bg-surface"
    >
      {/* Subtle aurora wash behind the cards */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[1100px] -translate-x-1/2 -translate-y-1/2 opacity-20 blur-[140px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(63,229,186,0.4) 0%, rgba(91,208,244,0.4) 50%, rgba(182,110,255,0.4) 100%)",
        }}
      />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <RevealOnScroll>
            <span className="eyebrow">Clients</span>
          </RevealOnScroll>
          <RevealOnScroll delay={0.05}>
            <h2 className="heading-section mt-5">
              What clients say{" "}
              <span className="text-muted-foreground">after a year of work.</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-lead">
              Three of two hundred. Each one began with a free conversation.
            </p>
          </RevealOnScroll>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          variants={staggerChildren(0.1, 0.05)}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              variants={fadeUp}
              className={cn(
                "md:translate-y-0",
                // Middle card sits slightly higher for visual rhythm
                i === 1 && "md:-translate-y-4",
              )}
            >
              <TestimonialCard t={t} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article
      className="group relative h-full overflow-hidden rounded-2xl border border-border bg-background p-7 transition-all duration-300 ease-out-quart hover:-translate-y-1 hover:border-foreground/15 hover:shadow-[0_24px_60px_-20px_rgba(11,79,74,0.18)]"
      style={
        {
          "--tint": accentTint[t.accent],
        } as React.CSSProperties
      }
    >
      {/* Soft corner wash on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle, var(--tint), transparent 70%)",
        }}
      />

      {/* Decorative quote mark */}
      <Quote
        aria-hidden="true"
        size={28}
        strokeWidth={1.5}
        className="absolute right-5 top-5 text-foreground/[0.08]"
      />

      {/* Stars */}
      <div className="relative flex items-center gap-1 text-accent">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            strokeWidth={0}
            fill="currentColor"
            className={i < t.rating ? "opacity-100" : "opacity-30"}
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="relative mt-5 text-[17px] leading-relaxed text-foreground">
        "{t.quote}"
      </blockquote>

      {/* Footer: author */}
      <div className="relative mt-7 flex items-center gap-3 border-t border-border pt-5">
        <div
          aria-hidden="true"
          className="h-11 w-11 shrink-0 rounded-full ring-1 ring-white/30"
          style={{ background: accentGradient[t.accent] }}
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {t.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {t.role} · {t.location}
          </p>
        </div>
      </div>
    </article>
  );
}
