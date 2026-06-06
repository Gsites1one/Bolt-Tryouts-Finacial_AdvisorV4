import { Check } from "lucide-react";
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
    body: "Anyone selling a five-week strategy is selling something else.",
  },
];

export function About() {
  return (
    <section id="about" className="section bg-surface/50">
      <div className="container-page">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[5fr_6fr] lg:gap-20">
          {/* Portrait */}
          <RevealOnScroll>
            <figure className="overflow-hidden rounded-[0.5rem] border border-border bg-card shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80"
                alt="Portrait of the founder, an independent financial advisor"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              {/* TODO:CLIENT_PHOTO — replace with the advisor's professional portrait */}
            </figure>
          </RevealOnScroll>

          {/* Copy */}
          <div>
            <RevealOnScroll>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                About your advisor
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.05}>
              <h2 className="heading-section mt-4">Why I do this.</h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-foreground/85">
                I spent eight years inside two of Europe&rsquo;s biggest banks
                before I left. The reason was simple: I was paid to sell
                products, not to give advice. Aura Capital exists because
                financial planning should look nothing like that.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.15}>
              <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
                No third-party commissions. No quotas. Just one person, sitting
                across from you, doing the work.
              </p>
            </RevealOnScroll>

            {/* Credentials */}
            <RevealOnScroll delay={0.2}>
              <p className="mt-8 border-l-2 border-accent pl-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Jan Kowalski &middot; EFA-certified &middot; Fee-only since 2014
              </p>
            </RevealOnScroll>

            {/* Principles */}
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              variants={staggerChildren(0.1, 0.2)}
              className="mt-10 space-y-5"
            >
              {principles.map((p) => (
                <motion.li
                  key={p.title}
                  variants={fadeUp}
                  className="flex items-start gap-4"
                >
                  <Check
                    size={16}
                    strokeWidth={2.5}
                    className="mt-1 shrink-0 text-accent"
                  />
                  <div>
                    <p className="font-display text-base font-medium text-foreground">
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
