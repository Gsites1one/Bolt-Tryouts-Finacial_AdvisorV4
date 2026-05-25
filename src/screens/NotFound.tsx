import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Compass, ArrowLeft, ArrowRight } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { AuroraBackground } from "../components/backgrounds/AuroraBackground";
import { fadeUp, staggerChildren } from "../lib/motion";

export function NotFound() {
  return (
    <>
      <Navbar />
      <main>
        <AuroraBackground className="min-h-screen" withBottomFade={false}>
          <div className="container-page relative flex min-h-screen items-center justify-center py-32 text-center">
            {/* Ghost "404" behind the content */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[36vw] font-bold leading-none tracking-tighter md:text-[22rem]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(63,229,186,0.12) 0%, rgba(91,208,244,0.08) 50%, rgba(182,110,255,0.1) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              404
            </span>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren(0.1, 0.1)}
              className="relative mx-auto max-w-2xl"
            >
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/85 backdrop-blur-md">
                  <Compass size={12} className="text-aurora-mint" />
                  Page not found
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-7 font-display text-[2.25rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-[3.5rem]"
              >
                This page took{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #3FE5BA 0%, #5BD0F4 50%, #B66EFF 100%)",
                  }}
                >
                  an early retirement.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-white/65"
              >
                The page you were looking for doesn't exist — or got renamed
                during a portfolio rebalance. Let's get you somewhere useful.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-10 flex flex-wrap items-center justify-center gap-3"
              >
                <Link to="/">
                  <Button size="lg" className="group">
                    <ArrowLeft
                      size={16}
                      className="transition-transform duration-200 group-hover:-translate-x-0.5"
                    />
                    Take me home
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="border-white/20 bg-white/[0.03] text-white backdrop-blur-md hover:border-white/40 hover:bg-white/[0.08]"
                  >
                    Talk to an advisor
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </Button>
                </Link>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="mt-10 text-xs text-white/40"
              >
                Or browse the{" "}
                <Link to="/" className="underline-offset-2 hover:underline">
                  homepage
                </Link>
                ,{" "}
                <Link
                  to="/#services"
                  className="underline-offset-2 hover:underline"
                >
                  services
                </Link>
                , or{" "}
                <Link
                  to="/#faq"
                  className="underline-offset-2 hover:underline"
                >
                  FAQ
                </Link>
                .
              </motion.p>
            </motion.div>
          </div>
        </AuroraBackground>
      </main>
      <Footer />
    </>
  );
}
