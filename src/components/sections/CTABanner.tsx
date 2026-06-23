import { motion } from "framer-motion";
import { ArrowRight, Phone, Info } from "lucide-react";
import { ReassuranceModalButton } from "../primitives/ReassuranceModalButton";
import { contactPhone } from "../../data/nav";
import { fadeUp, staggerChildren } from "../../lib/motion";

const bookingContent = {
  eyebrow: "Before you book",
  title: (
    <>
      What this call{" "}
      <em className="font-display italic text-accent">actually is</em>.
    </>
  ),
  subtitle: "Three things worth knowing before you hit send.",
  points: [
    {
      title: "It's actually free.",
      body: "No card, no trial, no fine print. One conversation, on the house.",
    },
    {
      title: "Zero pressure.",
      body: "No sales pitch. If we're not a fit, I'll say so on the call.",
    },
    {
      title: "You'll walk away with something.",
      body: "Even if you don't hire me, a clearer view of your situation.",
    },
  ],
  primary: { label: "Continue to booking", href: "/contact" },
  secondaryActions: [
    {
      label: `Call ${contactPhone.display}`,
      href: contactPhone.href,
      icon: Phone,
    },
    {
      label: "See how I work",
      href: "#about",
      icon: Info,
    },
  ],
  footnote: "60 minutes · Free · No card required",
};

export function CTABanner() {
  return (
    <section aria-label="Final call to action" className="bg-background">
      <div className="container-page py-20 md:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          variants={staggerChildren(0.1, 0.05)}
          className="relative overflow-hidden rounded-[0.5rem] bg-primary px-8 py-16 text-primary-foreground md:px-16 md:py-20"
        >
          {/*
           * "Aura" glow: 1–2 heavily-blurred, lighter-navy radial glows drifting
           * almost subliminally behind the text. Disabled under reduced motion
           * (static navy). Sits behind the content (z-10) so contrast is intact.
           */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden"
          >
            <div
              className="absolute -left-[12%] top-[-30%] h-[70%] w-[55%] animate-aura-drift blur-[70px]"
              style={{
                background:
                  "radial-gradient(circle at center, rgb(58 90 134 / 0.38), transparent 70%)",
              }}
            />
            <div
              className="absolute -right-[12%] bottom-[-35%] h-[75%] w-[60%] animate-aura-drift blur-[80px]"
              style={{
                background:
                  "radial-gradient(circle at center, rgb(46 76 118 / 0.34), transparent 70%)",
                animationDuration: "64s",
                animationDirection: "alternate-reverse",
              }}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-[2.75rem]"
            >
              Your next thirty years will be shaped by{" "}
              <em className="font-display italic text-accent">
                decisions you make this year
              </em>
              .
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/70"
            >
              Let&rsquo;s make sure they&rsquo;re the right ones. The first
              conversation is free, takes 60 minutes, and commits you to
              nothing.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4"
            >
              <ReassuranceModalButton
                size="lg"
                variant="primary"
                className="group bg-background text-foreground hover:bg-background/95"
                content={bookingContent}
              >
                Book a free consultation
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </ReassuranceModalButton>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-8 text-xs text-primary-foreground/55"
            >
              No card required &middot; No sales pitch &middot; Reply within 24h
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
