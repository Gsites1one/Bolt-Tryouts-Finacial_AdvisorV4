import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { contactPhone } from "../../data/nav";
import { EASE_OUT_QUART } from "../../lib/motion";

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

  useEffect(() => {
    const SHOW_AFTER = 500; // px scrolled past the top
    const HIDE_NEAR_BOTTOM = 320; // px from bottom

    const onScroll = () => {
      const scrolled = window.scrollY;
      const fromBottom =
        document.documentElement.scrollHeight -
        (window.scrollY + window.innerHeight);
      setVisible(scrolled > SHOW_AFTER && fromBottom > HIDE_NEAR_BOTTOM);
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
  );
}
