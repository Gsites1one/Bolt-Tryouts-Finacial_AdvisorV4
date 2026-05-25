import { motion } from "framer-motion";
import { processSteps, type ProcessStep } from "../../data/process";
import { RevealOnScroll } from "../primitives/RevealOnScroll";
import { fadeUp, staggerChildren } from "../../lib/motion";

export function Process() {
  return (
    <section
      id="process"
      className="section relative overflow-hidden bg-surface"
    >
      {/* Decorative dotted grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
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

      {/* Soft aurora glow under the timeline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-25 blur-[120px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(91,208,244,0.35), rgba(63,229,186,0.4), rgba(182,110,255,0.35))",
        }}
      />

      <div className="container-page relative">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <RevealOnScroll>
            <span className="eyebrow">How it works</span>
          </RevealOnScroll>
          <RevealOnScroll delay={0.05}>
            <h2 className="heading-section mt-5">
              Four steps.{" "}
              <span className="text-muted-foreground">No surprises.</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-lead">
              From the first conversation to the quarterly check-in three years
              in, this is exactly how we'll work together.
            </p>
          </RevealOnScroll>
        </div>

        {/* Timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          variants={staggerChildren(0.12, 0.1)}
          className="relative mt-20"
        >
          {/* DESKTOP: horizontal gradient line.
              Because each grid cell centers its content, the line ends at
              the horizontal midpoint of the outer cells — i.e. inset of
              (1/(2*N)) * 100% on each side. With 4 cells = 12.5%. */}
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-[2px] md:block"
            style={{
              background:
                "linear-gradient(to right, rgba(91,208,244,0.7) 0%, rgba(63,229,186,0.85) 50%, rgba(182,110,255,0.7) 100%)",
            }}
          />
          {/* Traveling shimmer — small focused highlight, not a sweeping ellipse */}
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-[2px] md:block"
            style={{
              background:
                "linear-gradient(to right, transparent 35%, rgba(255,255,255,0.55) 50%, transparent 65%)",
              backgroundSize: "14% 100%",
              backgroundRepeat: "no-repeat",
              animation: "process-shimmer 6s linear infinite",
            }}
          />

          {/* MOBILE: vertical line through the circles (offset = 32px = half of h-16) */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-8 bottom-8 w-[2px] -translate-x-1/2 md:hidden"
            style={{
              background:
                "linear-gradient(to bottom, rgba(91,208,244,0.7) 0%, rgba(63,229,186,0.85) 50%, rgba(182,110,255,0.7) 100%)",
            }}
          />

          <ol className="relative grid grid-cols-1 gap-14 md:grid-cols-4 md:gap-6">
            {processSteps.map((step) => (
              <motion.li key={step.id} variants={fadeUp}>
                <Step step={step} />
              </motion.li>
            ))}
          </ol>
        </motion.div>

        <style>{`
          @keyframes process-shimmer {
            0%   { background-position: -30% 0; }
            100% { background-position: 130% 0; }
          }
        `}</style>
      </div>
    </section>
  );
}

function Step({ step }: { step: ProcessStep }) {
  const { number, icon: Icon, title, description } = step;
  return (
    <div className="group relative flex flex-col items-center text-center transition-transform duration-300 ease-out-quart hover:-translate-y-1">
      {/* Number circle */}
      <div className="relative">
        {/* Subtle outer halo on hover — small focused glow, not a giant ellipse */}
        <div
          aria-hidden="true"
          className="absolute -inset-0.5 rounded-full opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle, rgba(63,229,186,0.28), transparent 70%)",
          }}
        />

        {/* The circle */}
        <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-full border border-border bg-background shadow-[0_8px_24px_-8px_rgba(11,79,74,0.18)] transition-all duration-300 ease-out-quart group-hover:border-accent/50 group-hover:shadow-[0_10px_24px_-12px_rgba(63,229,186,0.25)]">
          {/* Subtle hover wash — slightly accent tinted, not full saturation */}
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-accent/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
          {/* Inner aurora hint (always on, very subtle) */}
          <span
            aria-hidden="true"
            className="absolute inset-1.5 rounded-full opacity-60"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(63,229,186,0.12), transparent 65%)",
            }}
          />
          {/* Number */}
          <span className="relative font-mono text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-foreground">
            {number}
          </span>
        </div>
      </div>

      {/* Body — centered under the circle, lined up with the line */}
      <div className="mt-7 max-w-[220px]">
        <div className="mb-2 inline-flex items-center gap-1.5 text-accent">
          <Icon size={14} strokeWidth={2.2} />
          <span className="text-[11px] font-medium uppercase tracking-[0.18em]">
            Step {number}
          </span>
        </div>
        <h3 className="font-display text-xl font-semibold text-foreground">
          {title}
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
