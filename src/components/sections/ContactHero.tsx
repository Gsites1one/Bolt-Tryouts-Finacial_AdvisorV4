import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { AuroraBackground } from "../backgrounds/AuroraBackground";
import { fadeUp, staggerChildren } from "../../lib/motion";

export function ContactHero() {
  return (
    <AuroraBackground className="min-h-[60vh]" withBottomFade={false}>
      <div className="container-page relative pt-36 pb-20 md:pt-44 md:pb-28">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren(0.1, 0.05)}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-white/85 backdrop-blur-md">
              <Sparkles size={12} className="text-aurora-mint" />
              Contact
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-7 font-display text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-[3.5rem]"
          >
            Let's talk about your{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #3FE5BA 0%, #5BD0F4 50%, #B66EFF 100%)",
              }}
            >
              next thirty years.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/65 sm:text-xl"
          >
            The first conversation is free, runs 60 minutes, and commits you to
            nothing. Drop a message or grab a slot on the calendar below.
          </motion.p>
        </motion.div>
      </div>
    </AuroraBackground>
  );
}
