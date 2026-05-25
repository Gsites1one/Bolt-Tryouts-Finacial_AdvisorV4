import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { AuroraBackground } from "../backgrounds/AuroraBackground";
import { PortfolioCard } from "../primitives/PortfolioCard";
import { EASE_OUT_QUART, fadeUp, staggerChildren } from "../../lib/motion";

const trustAvatars = [
  "linear-gradient(135deg, #B66EFF, #5BD0F4)",
  "linear-gradient(135deg, #3FE5BA, #5BD0F4)",
  "linear-gradient(135deg, #FF6BB5, #B66EFF)",
];

export function Hero() {
  return (
    <AuroraBackground className="min-h-[100vh]">
      <div className="container-page relative pt-32 pb-24 md:pt-44 md:pb-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* ── Left: copy ─────────────────────────────────────────────── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren(0.1, 0.05)}
          >
            {/* Eyebrow pill */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-white/85 backdrop-blur-md">
                <Sparkles size={12} className="text-aurora-mint" />
                Independent · Fiduciary · Modern
              </span>
            </motion.div>

            {/* Display headline */}
            <motion.h1
              variants={fadeUp}
              className="mt-7 font-display text-display font-semibold text-white"
            >
              Wealth,{" "}
              <span className="relative inline-block">
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #3FE5BA 0%, #5BD0F4 50%, #B66EFF 100%)",
                  }}
                >
                  with intention.
                </span>
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/65 sm:text-xl"
            >
              Independent financial planning for people who refuse to let their
              future be a default setting.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center gap-3"
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
              <a href="#process">
                <Button
                  variant="secondary"
                  size="lg"
                  className="border-white/20 bg-white/[0.03] text-white backdrop-blur-md hover:border-white/40 hover:bg-white/[0.08]"
                >
                  How I work
                </Button>
              </a>
            </motion.div>

            {/* Trust micro-row */}
            <motion.div variants={fadeUp} className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-2">
                {trustAvatars.map((bg, i) => (
                  <div
                    key={i}
                    aria-hidden="true"
                    className="h-9 w-9 rounded-full border-2 border-aurora-base shadow-lg"
                    style={{ background: bg }}
                  />
                ))}
              </div>
              <p className="text-sm text-white/55">
                Trusted by{" "}
                <span className="font-medium text-white">200+ clients</span>{" "}
                across Europe
              </p>
            </motion.div>
          </motion.div>

          {/* ── Right: floating portfolio card ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.9,
              delay: 0.35,
              ease: EASE_OUT_QUART,
            }}
            className="relative"
          >
            <PortfolioCard />
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
        >
          <div className="flex flex-col items-center gap-2 text-white/40">
            <span className="text-[10px] font-medium uppercase tracking-[0.22em]">
              Scroll
            </span>
            <div className="relative h-9 w-[18px] rounded-full border border-white/30">
              <span className="absolute left-1/2 top-1.5 h-1.5 w-0.5 -translate-x-1/2 rounded-full bg-white/70 motion-safe:animate-[fade-up_1.5s_ease-in-out_infinite]" />
            </div>
          </div>
        </motion.div>
      </div>
    </AuroraBackground>
  );
}
