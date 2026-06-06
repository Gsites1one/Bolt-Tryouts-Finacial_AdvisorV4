import { motion } from "framer-motion";
import { stats } from "../../data/stats";
import { AnimatedCounter } from "../primitives/AnimatedCounter";
import { RevealOnScroll } from "../primitives/RevealOnScroll";
import { fadeUp, staggerChildren } from "../../lib/motion";

export function Stats() {
  return (
    <section
      aria-label="By the numbers"
      className="border-y border-border bg-background"
    >
      <div className="container-page py-16 md:py-20">
        <RevealOnScroll>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            By the numbers
          </p>
        </RevealOnScroll>

        <motion.dl
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          variants={staggerChildren(0.1, 0.1)}
          className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-8"
        >
          {stats.map((s) => (
            <motion.div key={s.id} variants={fadeUp}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <div className="flex items-baseline font-mono text-4xl font-medium tracking-tight tabular-nums text-foreground md:text-5xl">
                  {s.prefix && (
                    <span className="text-2xl font-medium text-muted-foreground md:text-3xl">
                      {s.prefix}
                    </span>
                  )}
                  <AnimatedCounter to={s.value} />
                  {s.suffix && (
                    <span className="ml-0.5 text-2xl font-medium text-muted-foreground md:text-3xl">
                      {s.suffix}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{s.label}</p>
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
