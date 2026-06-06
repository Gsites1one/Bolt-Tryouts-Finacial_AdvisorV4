import { useEffect, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check, X, ArrowRight } from "lucide-react";
import { Button, type ButtonProps } from "../ui/button";
import { EASE_OUT_QUART } from "../../lib/motion";

export interface ReassurancePoint {
  title: string;
  body: string;
}

export interface SecondaryAction {
  label: string;
  /** Full URL, tel:, mailto:, or in-page anchor (e.g. "#about"). */
  href: string;
  icon?: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
}

export interface ReassuranceContent {
  /** Small caps eyebrow above the title. */
  eyebrow: string;
  /** Modal H2 — can include JSX for inline accent (italic gold span etc). */
  title: ReactNode;
  /** Single-line subtitle under the title. */
  subtitle: string;
  /** 1-3 reassurance points shown as a bullet list. */
  points: ReassurancePoint[];
  /** Primary CTA — label + target route. */
  primary: {
    label: string;
    /** Default: navigates with react-router. Pass `external: true` to use plain anchor. */
    href: string;
  };
  /** Optional 1-2 alt paths shown under "Not ready yet?". */
  secondaryActions?: SecondaryAction[];
  /** Optional fine-print under the actions (e.g. "60 minutes · Free"). */
  footnote?: string;
}

interface ReassuranceModalButtonProps extends Omit<ButtonProps, "onClick"> {
  content: ReassuranceContent;
}

/**
 * Reusable CTA + reassurance modal pattern.
 * Click the trigger → modal lists reasons why the next step is safe →
 * user proceeds to the primary CTA or picks an alt path.
 *
 * Used by:
 *   - CTABanner (book a free consultation reassurance)
 *   - FAQ "Ask me anything" trigger
 */
export function ReassuranceModalButton({
  content,
  children,
  ...buttonProps
}: ReassuranceModalButtonProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Button {...buttonProps} onClick={() => setOpen(true)}>
        {children}
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onContinue={() => {
          setOpen(false);
          navigate(content.primary.href);
        }}
        content={content}
      />
    </>
  );
}

/* ─────────────────────────── Modal ─────────────────────────── */

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
  content: ReassuranceContent;
}

function Modal({ open, onClose, onContinue, content }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const handleSecondary = (action: SecondaryAction) => {
    if (action.href.startsWith("#")) {
      onClose();
      setTimeout(() => {
        document
          .querySelector(action.href)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
    // tel:/mailto:/http: use default <a> behaviour
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reassurance-modal-title"
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
            className="absolute inset-0 bg-foreground/40"
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 20 }}
            transition={{ duration: 0.3, ease: EASE_OUT_QUART }}
            className="relative w-full max-w-md rounded-[0.5rem] border border-border bg-card shadow-sm"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-[0.5rem] border border-border bg-card text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              <X size={15} />
            </button>

            <div className="p-8 md:p-10">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {content.eyebrow}
              </p>

              <h2
                id="reassurance-modal-title"
                className="mt-3 font-display text-2xl font-medium leading-tight text-foreground sm:text-[28px]"
              >
                {content.title}
              </h2>

              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {content.subtitle}
              </p>

              <ul className="mt-7 space-y-5">
                {content.points.map((point, i) => (
                  <motion.li
                    key={point.title}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.1 + i * 0.07,
                      ease: EASE_OUT_QUART,
                    }}
                    className="flex items-start gap-3"
                  >
                    <Check
                      size={16}
                      strokeWidth={2.5}
                      className="mt-1 shrink-0 text-accent"
                    />
                    <div>
                      <p className="font-display text-[15px] font-medium text-foreground">
                        {point.title}
                      </p>
                      <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                        {point.body}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>

              {/* Primary action */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  size="md"
                  className="group flex-1 sm:flex-initial"
                  onClick={onContinue}
                >
                  {content.primary.label}
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

              {/* Secondary actions */}
              {content.secondaryActions && content.secondaryActions.length > 0 && (
                <div className="mt-6 border-t border-border pt-5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Not ready yet?
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                    {content.secondaryActions.slice(0, 2).map((action) => {
                      const Icon = action.icon;
                      return (
                        <a
                          key={action.label}
                          href={action.href}
                          onClick={() => handleSecondary(action)}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline decoration-accent decoration-1 underline-offset-[6px] transition-colors hover:text-accent"
                        >
                          {Icon && <Icon size={14} strokeWidth={2} />}
                          {action.label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              {content.footnote && (
                <p className="mt-5 text-[11px] text-muted-foreground">
                  {content.footnote}
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
