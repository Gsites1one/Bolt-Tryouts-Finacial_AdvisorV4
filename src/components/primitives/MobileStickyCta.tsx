import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUp, Phone } from "lucide-react";
import { contactPhone } from "../../data/nav";
import { EASE_OUT_QUART } from "../../lib/motion";
import { cn } from "../../lib/utils";

/**
 * Sticky CTA bar visible only on mobile, only after the visitor has
 * scrolled past the hero. Keeps the primary action one tap away without
 * cluttering the desktop layout.
 *
 * Hidden again when the user is within 200px of the page bottom — by then
 * the in-page CTAs (CTABanner / Footer) are already on screen and a sticky
 * bar would just compete with them.
 */
export function MobileStickyCta() {
  const [visible, setVisible] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const SHOW_AFTER = 500; // px scrolled past the top
    const HIDE_NEAR_BOTTOM = 320; // px from bottom
    const BACK_TO_TOP_AFTER = 1200; // px, roughly past the hero + trust strip

    const onScroll = () => {
      const scrolled = window.scrollY;
      const fromBottom =
        document.documentElement.scrollHeight -
        (window.scrollY + window.innerHeight);
      setVisible(scrolled > SHOW_AFTER && fromBottom > HIDE_NEAR_BOTTOM);
      setShowBackToTop(scrolled > BACK_TO_TOP_AFTER);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      {/* Back to top — mobile only, independent of the sticky CTA bar so it
          stays available even near the page bottom (Task 10). */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            aria-label="Back to top"
            onClick={() => {
              const reduce = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
              ).matches;
              window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: EASE_OUT_QUART }}
            className={cn(
              "fixed right-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/95 text-foreground shadow-sm backdrop-blur transition-colors hover:border-foreground/30 md:hidden",
              visible ? "bottom-24" : "bottom-4",
            )}
            style={{
              marginBottom: visible
                ? undefined
                : "env(safe-area-inset-bottom)",
            }}
          >
            <ArrowUp size={16} strokeWidth={1.75} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE_OUT_QUART }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur md:hidden"
            style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
          >
            <div className="flex items-center gap-3 px-4 pt-3">
              <a
                href={contactPhone.href}
                aria-label={`Call ${contactPhone.display}`}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.5rem] border border-border text-foreground transition-colors hover:border-foreground/30"
              >
                <Phone size={16} strokeWidth={1.75} />
              </a>
              <Link
                to="/contact"
                className="group flex h-11 flex-1 items-center justify-center gap-2 rounded-[0.5rem] bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Book a free consultation
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
