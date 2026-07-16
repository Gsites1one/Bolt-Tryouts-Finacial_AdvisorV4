import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { RevealOnScroll } from "../primitives/RevealOnScroll";
import { fadeUp, staggerChildren, EASE_OUT_QUART, DUR } from "../../lib/motion";

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

/** TODO:CLIENT — replace with the advisor's real credential numbers. */
const credentials = [
  "FFP® certified",
  "RB — Erkend Financieel Adviseur",
  "AFM-nr 12345678",
];

/** Abstract hand-drawn signature mark — decorative, not literal text. */
function Signature({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const d =
    "M4 34 C 14 10, 24 10, 30 26 S 42 46, 50 28 S 62 8, 70 24 S 84 44, 92 26 C 98 14, 106 12, 112 20";
  return (
    <svg
      viewBox="0 0 120 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {reduce ? (
        <path
          d={d}
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <motion.path
          d={d}
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: DUR.draw, ease: EASE_OUT_QUART, delay: 0.2 }}
        />
      )}
    </svg>
  );
}

/** Checkmark that draws itself in; inherits hidden→visible from the parent list. */
const drawCheck: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: DUR.draw, ease: EASE_OUT_QUART },
  },
};

function DrawnCheck({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {reduce ? (
        <path d="M4 12 L9 17 L20 6" />
      ) : (
        <motion.path d="M4 12 L9 17 L20 6" variants={drawCheck} />
      )}
    </svg>
  );
}

export function About() {
  return (
    <section id="about" className="section bg-surface/50">
      <div className="container-page">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[2fr_3fr] lg:gap-20">
          {/* Portrait — subtle scale-in reveal, duotone→color on hover */}
          <motion.figure
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            transition={{ duration: DUR.reveal, ease: EASE_OUT_QUART }}
            className="group relative overflow-hidden rounded-[0.5rem] border border-border bg-card shadow-sm"
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85"
              alt="Portrait of the founder, an independent financial advisor"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover grayscale transition-[filter] duration-500 ease-out-quart group-hover:grayscale-0 motion-reduce:transition-none"
            />
            {/* Navy duotone veil — fades out on hover to reveal full colour */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-primary opacity-40 mix-blend-color transition-opacity duration-500 ease-out-quart group-hover:opacity-0 motion-reduce:transition-none"
            />
            {/* TODO:CLIENT_PHOTO — replace with the advisor's professional portrait */}
          </motion.figure>

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

            {/* Credentials — gold accent bar draws down on reveal */}
            <RevealOnScroll delay={0.2}>
              <div className="relative mt-8 pl-4">
                <motion.span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-0.5 origin-top bg-accent"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                  transition={{ duration: DUR.draw, ease: EASE_OUT_QUART }}
                />
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Jan Kowalski &middot; Fee-only since 2014
                </p>
              </div>
            </RevealOnScroll>

            {/* Certifications — quiet regulatory trust signals */}
            <RevealOnScroll delay={0.22}>
              <ul className="mt-5 flex flex-wrap gap-2">
                {credentials.map((c) => (
                  <li
                    key={c}
                    className="rounded-[0.375rem] border border-border bg-card px-3 py-1 text-[11px] font-medium text-foreground/75"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </RevealOnScroll>

            {/* Principles — stagger in, each checkmark draws itself */}
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
                  <DrawnCheck className="mt-1 h-4 w-4 shrink-0 text-accent" />
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

            {/* Signature — quiet, personal sign-off under the principles */}
            <Signature className="mt-10 h-10 w-auto text-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}
