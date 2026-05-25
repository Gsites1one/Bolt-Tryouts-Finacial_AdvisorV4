import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { BookConsultationButton } from "../primitives/BookConsultationButton";
import { RevealOnScroll } from "../primitives/RevealOnScroll";
import { fadeUp, staggerChildren } from "../../lib/motion";

/**
 * Final conversion banner.
 * Dark aurora-tinted section — last shot before the footer.
 */
export function CTABanner() {
  return (
    <section
      aria-label="Final call to action"
      className="relative overflow-hidden bg-aurora-base text-white"
    >
      {/* Slow rotating conic ring */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[60%] left-1/2 h-[1200px] w-[1200px] motion-safe:animate-spin-slow opacity-30"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(63,229,186,0.45) 60deg, transparent 120deg, rgba(91,208,244,0.4) 200deg, transparent 260deg, rgba(182,110,255,0.45) 340deg, transparent 360deg)",
          maskImage:
            "radial-gradient(closest-side at 50% 50%, transparent 30%, black 60%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(closest-side at 50% 50%, transparent 30%, black 60%, transparent 95%)",
          transform: "translate(-50%, 0)",
        }}
      />

      {/* Aurora blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[5%] top-[10%] h-[500px] w-[500px] rounded-full opacity-50 motion-safe:animate-aurora-a"
        style={{
          background:
            "radial-gradient(circle, rgba(91,208,244,0.7), transparent 70%)",
          filter: "blur(130px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-5%] bottom-[10%] h-[600px] w-[600px] rounded-full opacity-50 motion-safe:animate-aurora-b"
        style={{
          background:
            "radial-gradient(circle, rgba(63,229,186,0.7), transparent 70%)",
          filter: "blur(140px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/3 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full opacity-40 motion-safe:animate-aurora-c"
        style={{
          background:
            "radial-gradient(circle, rgba(182,110,255,0.65), transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage:
            "radial-gradient(ellipse 70% 55% at 50% 50%, black 25%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 55% at 50% 50%, black 25%, transparent 85%)",
        }}
      />

      {/* Vertical light beam */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[2px] motion-safe:animate-beam-fall"
        style={{
          background:
            "linear-gradient(to bottom, rgba(63,229,186,0.65) 0%, rgba(63,229,186,0.15) 40%, transparent 100%)",
          filter: "blur(1px)",
        }}
      />

      <div className="container-page relative py-24 md:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          variants={staggerChildren(0.1, 0.05)}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-white/85 backdrop-blur-md">
              <Sparkles size={12} className="text-aurora-mint" />
              Last thing
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-7 font-display text-[2.25rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-[3.5rem]"
          >
            Your next thirty years will be shaped by{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #3FE5BA 0%, #5BD0F4 50%, #B66EFF 100%)",
              }}
            >
              decisions you make this year.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/65 sm:text-xl"
          >
            Let's make sure they're the right ones. The first conversation is
            free, takes 60 minutes, and commits you to nothing.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <BookConsultationButton size="lg" className="group">
              Book a free consultation
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </BookConsultationButton>
            <a href="#about">
              <Button
                variant="secondary"
                size="lg"
                className="border-white/20 bg-white/[0.03] text-white backdrop-blur-md hover:border-white/40 hover:bg-white/[0.08]"
              >
                Read my approach
              </Button>
            </a>
          </motion.div>

          {/* Trust micro */}
          <RevealOnScroll delay={0.2}>
            <p className="mt-8 text-xs text-white/40">
              No card required · No sales pitch · Reply within 24h
            </p>
          </RevealOnScroll>
        </motion.div>
      </div>
    </section>
  );
}
