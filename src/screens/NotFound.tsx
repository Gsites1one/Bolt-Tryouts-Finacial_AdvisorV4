import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { fadeUp, staggerChildren } from "../lib/motion";

export function NotFound() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <div className="container-page relative flex min-h-screen items-center justify-center py-32 text-center">
          {/* Ghost "404" — subtle, muted */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[36vw] font-medium leading-none tracking-tighter text-foreground/[0.04] md:text-[22rem]"
          >
            404
          </span>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren(0.1, 0.1)}
            className="relative mx-auto max-w-2xl"
          >
            <motion.p
              variants={fadeUp}
              className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground"
            >
              Page not found
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl md:text-[3.25rem]"
            >
              This page took{" "}
              <em className="font-display italic text-accent">
                an early retirement
              </em>
              .
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
            >
              The page you were looking for doesn&rsquo;t exist, or got
              renamed during a portfolio rebalance. Let&rsquo;s get you
              somewhere useful.
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
                <Button variant="secondary" size="lg" className="group">
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
              className="mt-10 text-xs text-muted-foreground"
            >
              Or browse the{" "}
              <Link
                to="/"
                className="text-foreground underline underline-offset-2 hover:text-accent"
              >
                homepage
              </Link>
              ,{" "}
              <Link
                to="/#services"
                className="text-foreground underline underline-offset-2 hover:text-accent"
              >
                services
              </Link>
              , or{" "}
              <Link
                to="/#faq"
                className="text-foreground underline underline-offset-2 hover:text-accent"
              >
                FAQ
              </Link>
              .
            </motion.p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
