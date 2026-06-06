import { motion } from "framer-motion";
import { testimonials, type Testimonial } from "../../data/testimonials";
import { RevealOnScroll } from "../primitives/RevealOnScroll";
import { fadeUp, staggerChildren } from "../../lib/motion";

export function Testimonials() {
  return (
    <section
      id="reviews"
      aria-label="What clients say"
      className="section bg-surface/50"
    >
      <div className="container-page">
        <div className="max-w-2xl">
          <RevealOnScroll>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Reviews
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.05}>
            <h2 className="heading-section mt-4">
              What clients say after a year of work.
            </h2>
          </RevealOnScroll>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          variants={staggerChildren(0.12, 0.05)}
          className="mt-14 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-3 md:gap-12"
        >
          {testimonials.map((t) => (
            <motion.li key={t.id} variants={fadeUp}>
              <Quote t={t} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function Quote({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col">
      <span aria-hidden="true" className="font-display text-4xl leading-none text-accent">
        &ldquo;
      </span>
      <blockquote className="mt-3 flex-1 text-[17px] leading-relaxed text-foreground">
        {t.quote}
      </blockquote>
      <figcaption className="mt-6 border-t border-border pt-4 text-sm">
        <p className="font-medium text-foreground">{t.name}</p>
        <p className="mt-0.5 text-muted-foreground">
          {t.role} &middot; {t.location}
        </p>
      </figcaption>
    </figure>
  );
}
