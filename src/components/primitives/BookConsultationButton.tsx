import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check, X, Clock, Sparkles, ArrowRight } from "lucide-react";
import { Button, type ButtonProps } from "../ui/button";
import { EASE_OUT_QUART } from "../../lib/motion";

interface BookConsultationButtonProps extends Omit<ButtonProps, "onClick"> {
  /** Where to send the user after they confirm. Default: /contact */
  to?: string;
}

/**
 * Drop-in replacement for the "Book a free consultation" CTA buttons.
 * Click opens a small reassurance modal explaining what the call actually is,
 * then continues to the contact page.
 */
export function BookConsultationButton({
  to = "/contact",
  children = "Book a free consultation",
  ...buttonProps
}: BookConsultationButtonProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Button {...buttonProps} onClick={() => setOpen(true)}>
        {children}
      </Button>
      <ConsultationModal
        open={open}
        onClose={() => setOpen(false)}
        onContinue={() => {
          setOpen(false);
          navigate(to);
        }}
      />
    </>
  );
}

/* ─────────────────────────── Modal ─────────────────────────── */

const reasons = [
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
    body: "Even if you don't hire me — a clearer view of your situation.",
  },
];

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
}

function ConsultationModal({ open, onClose, onContinue }: ModalProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape closes
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="consult-modal-title"
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/70 backdrop-blur-md"
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 30 }}
            transition={{ duration: 0.35, ease: EASE_OUT_QUART }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-background shadow-[0_30px_80px_-15px_rgba(0,0,0,0.5)]"
          >
            {/* Aurora glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full opacity-50 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(63,229,186,0.45), transparent 70%)",
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 rounded-full opacity-40 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(182,110,255,0.45), transparent 70%)",
              }}
            />

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground backdrop-blur-sm transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              <X size={15} />
            </button>

            <div className="relative p-7 md:p-8">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/[0.08] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                <Sparkles size={11} />
                Before you book
              </span>

              <h2
                id="consult-modal-title"
                className="mt-4 font-display text-2xl font-semibold leading-tight text-foreground sm:text-[28px]"
              >
                What this call{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #3FE5BA 0%, #5BD0F4 50%, #B66EFF 100%)",
                  }}
                >
                  actually is.
                </span>
              </h2>

              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                Three things worth knowing before you hit send.
              </p>

              <ul className="mt-6 space-y-4">
                {reasons.map((r, i) => (
                  <motion.li
                    key={r.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.15 + i * 0.08,
                      ease: EASE_OUT_QUART,
                    }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/30">
                      <Check size={12} strokeWidth={3.5} />
                    </span>
                    <div>
                      <p className="text-[14px] font-semibold text-foreground">
                        {r.title}
                      </p>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">
                        {r.body}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-2.5">
                <Button
                  type="button"
                  size="md"
                  className="group flex-1 sm:flex-initial"
                  onClick={onContinue}
                >
                  Continue to booking
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Button>
                <Button
                  type="button"
                  size="md"
                  variant="ghost"
                  onClick={onClose}
                >
                  Maybe later
                </Button>
              </div>

              <p className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <Clock size={11} />
                60 minutes · Free · No card required
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
