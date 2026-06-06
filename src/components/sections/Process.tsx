import { motion } from "framer-motion";
import { processSteps } from "../../data/process";
import { RevealOnScroll } from "../primitives/RevealOnScroll";
import { fadeUp, staggerChildren } from "../../lib/motion";

export function Process() {
  return (
    <section id="process" className="section bg-surface/50">
      <div className="container-page">
        {/* Heading */}
        <div className="max-w-2xl">
          <RevealOnScroll>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              How we work together
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.05}>
            <h2 className="heading-section mt-4">
              Three steps. No surprises.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="mt-5 max-w-xl text-lead">
              From the first conversation to the quarterly review three years
              in, this is exactly how we&rsquo;ll work together.
            </p>
          </RevealOnScroll>
        </div>

        {/* Numbered timeline — hairline only, no cards */}
        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          variants={staggerChildren(0.15, 0.1)}
          className="relative mt-16 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-3 md:gap-10"
        >
          {/* Hairline connector — desktop only */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[14px] hidden h-px bg-border md:block"
          />

          {processSteps.map((step) => (
            <motion.li key={step.id} variants={fadeUp} className="relative">
              <div className="flex items-baseline gap-3">
                <span className="relative inline-flex items-center bg-background pr-3 font-mono text-sm font-medium tabular-nums text-accent">
                  {step.number}
                </span>
                <span className="h-px flex-1 bg-transparent md:hidden" />
              </div>
              <h3 className="mt-6 font-display text-xl font-medium text-foreground md:text-2xl">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[28ch] text-[15px] leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
