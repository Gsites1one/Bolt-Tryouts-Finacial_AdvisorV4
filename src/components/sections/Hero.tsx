import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { fadeUp, staggerChildren, EASE_OUT_QUART } from "../../lib/motion";

export function Hero() {
  return (
    <section className="relative bg-background pt-28 md:pt-36">
      <div className="container-page pb-20 md:pb-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          {/* ── Left: copy ─────────────────────────────────────────────── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren(0.1, 0.05)}
          >
            <motion.h1
              variants={fadeUp}
            className="font-display text-[2.1rem] font-medium leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem]"
            >
              Wealth, with{" "}
              <em className="font-display italic text-accent">intention</em>.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
            >
              Independent financial planning for people who refuse to let their
              future be a default setting.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4"
            >
              <Link to="/contact">
                <Button size="lg" className="group">
                  Book a free consultation
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Button>
              </Link>
              <a
                href="#calculator"
                className="inline-flex items-center gap-1.5 text-[15px] font-medium text-foreground underline decoration-accent decoration-1 underline-offset-[6px] transition-colors hover:text-accent"
              >
                See your numbers in the calculator
                <ArrowRight size={14} strokeWidth={2.25} />
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right: real photo ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.3,
              ease: EASE_OUT_QUART,
            }}
            className="relative"
          >
            <figure className="relative overflow-hidden rounded-[0.5rem] border border-border bg-card shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80"
                alt="A couple reviewing financial documents at a kitchen table with their advisor"
                className="h-[420px] w-full object-cover animate-ken-burns will-change-transform motion-reduce:animate-none md:h-[520px]"
                loading="eager"
              />
              {/* TODO:CLIENT_PHOTO — replace with the advisor's licensed photography */}
            </figure>
            {/* Quiet trust micro-signals — two lines, no pill */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
              <span>Independent &middot; Fiduciary &middot; Fee-only since 2014</span>
              <span aria-hidden="true" className="hidden text-muted-foreground/40 sm:inline">
                |
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Star
                  size={12}
                  strokeWidth={1.5}
                  className="fill-accent text-accent"
                />
                <span className="font-mono tabular-nums text-foreground/80">
                  4.9
                </span>
                <span>
                  · <span className="font-mono tabular-nums">120+</span> client
                  reviews
                </span>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
