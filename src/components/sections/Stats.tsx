import { motion } from "framer-motion";
import { stats } from "../../data/stats";
import { AnimatedCounter } from "../primitives/AnimatedCounter";
import { RevealOnScroll } from "../primitives/RevealOnScroll";
import { fadeUp, staggerChildren } from "../../lib/motion";

export function Stats() {
  return (
    <section
      aria-label="By the numbers"
      className="section relative overflow-hidden bg-background"
    >
      {/* Subtle aurora glow band */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-80 -translate-y-1/2 opacity-40 blur-[140px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(91,208,244,0.18) 0%, rgba(63,229,186,0.22) 50%, rgba(182,110,255,0.18) 100%)",
        }}
      />

      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <RevealOnScroll>
            <span className="eyebrow">By the numbers</span>
          </RevealOnScroll>
          <RevealOnScroll delay={0.05}>
            <h2 className="heading-section mt-5">
              A practice you can measure.
            </h2>
          </RevealOnScroll>
        </div>

        <motion.dl
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          variants={staggerChildren(0.1, 0.05)}
          className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-8"
        >
          {stats.map((s) => (
            <motion.div
              key={s.id}
              variants={fadeUp}
              className="group relative text-center md:text-left"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <div className="flex items-baseline justify-center font-display text-5xl font-semibold tracking-tight text-foreground sm:text-6xl md:justify-start">
                  {s.prefix && (
                    <span className="text-3xl font-semibold text-muted-foreground md:text-4xl">
                      {s.prefix}
                    </span>
                  )}
                  <span
                    className="bg-clip-text"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, rgb(var(--foreground)) 0%, rgb(var(--foreground)) 70%, #3FE5BA 110%)",
                    }}
                  >
                    <AnimatedCounter to={s.value} />
                  </span>
                  {s.suffix && (
                    <span className="ml-0.5 text-3xl font-semibold text-accent md:text-4xl">
                      {s.suffix}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm font-medium text-foreground">
                  {s.label}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {s.sublabel}
                </p>
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
