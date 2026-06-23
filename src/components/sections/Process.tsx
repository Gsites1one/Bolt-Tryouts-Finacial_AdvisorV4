import { motion, useReducedMotion } from "framer-motion";
import { processSteps } from "../../data/process";
import { RevealOnScroll } from "../primitives/RevealOnScroll";
import { fadeUp, staggerChildren, EASE_OUT_QUART, DUR } from "../../lib/motion";
import { cn } from "../../lib/utils";

export function Process() {
  const reduce = useReducedMotion();

  // Step hover-lift — same shadow + duration as the service cards (R0).
  // Reduced motion drops the translate but keeps the calm bg/shadow shift.
  const stepLift = cn(
    "group relative rounded-[0.5rem] p-4 md:p-5",
    "transition-[transform,box-shadow,background-color] duration-300 ease-out-quart",
    "hover:bg-card hover:shadow-md",
    !reduce && "hover:-translate-y-1",
  );

  // Ghosted serif numeral: quietly present at rest (~14%), wakes toward the
  // gold interaction accent on hover (never full navy). Scale is motion, so
  // it is gated out under reduced motion; the colour shift always applies.
  const numeralClass = cn(
    "pointer-events-none block origin-left select-none font-display text-[4.5rem] font-semibold leading-none text-primary/[0.14] md:text-[5.5rem]",
    "transition-[color,transform] duration-300 ease-out-quart group-hover:text-accent/70",
    !reduce && "group-hover:scale-[1.03]",
  );

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

        {/*
         * Numbered timeline: large ghosted serif numerals as the design
         * anchor + a hairline connector that draws in left-to-right on reveal.
         * Steps fade up with a small 01 → 02 → 03 stagger.
         */}
        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          variants={staggerChildren(0.09, 0.1)}
          className="relative mt-14 grid grid-cols-1 gap-8 pt-6 md:mt-16 md:grid-cols-3 md:gap-8"
        >
          {/* Hairline connector — draws in left-to-right (desktop only) */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 hidden h-px origin-left bg-border md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            transition={{ duration: DUR.draw, ease: EASE_OUT_QUART }}
          />

          {processSteps.map((step) => (
            <motion.li key={step.id} variants={fadeUp} className={stepLift}>
              {/* Ghosted serif numeral — intentional typographic element */}
              <span aria-hidden="true" className={numeralClass}>
                {step.number}
              </span>
              <h3 className="mt-2 font-display text-xl font-medium text-foreground md:text-2xl">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[30ch] text-[15px] leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
