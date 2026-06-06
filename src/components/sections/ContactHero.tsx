import { motion } from "framer-motion";
import { fadeUp, staggerChildren } from "../../lib/motion";

export function ContactHero() {
  return (
    <section className="bg-background">
      <div className="container-page pt-32 pb-12 md:pt-40 md:pb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren(0.1, 0.05)}
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground"
          >
            Contact
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl md:text-[3.5rem]"
          >
            Let&rsquo;s talk about your{" "}
            <em className="font-display italic text-accent">
              next thirty years
            </em>
            .
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            The first conversation is free, runs 60 minutes, and commits you to
            nothing. Drop a message or grab a slot on the calendar below.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
