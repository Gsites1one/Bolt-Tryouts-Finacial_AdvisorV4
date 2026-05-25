import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { faqs, type FAQ as FAQType } from "../../data/faqs";
import { RevealOnScroll } from "../primitives/RevealOnScroll";
import { EASE_OUT_QUART } from "../../lib/motion";
import { cn } from "../../lib/utils";

export function FAQ() {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set([faqs[0].id]));

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className="section relative bg-background"
    >
      <div className="container-page">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_3fr] lg:gap-20">
          {/* Left — heading, sticky on desktop */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <RevealOnScroll>
              <span className="eyebrow">Q&amp;A</span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.05}>
              <h2 className="heading-section mt-5">
                Quick answers,{" "}
                <span className="text-muted-foreground">no jargon.</span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <p className="mt-5 max-w-md text-lead">
                Eight of the questions I hear most. If yours isn't here, the
                first 60 minutes are free anyway — let's just talk.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.15}>
              <div className="mt-8">
                <Link to="/contact">
                  <Button size="md" variant="secondary" className="group">
                    Ask me anything
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </Button>
                </Link>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right — accordion */}
          <div>
            <RevealOnScroll>
              <ul className="border-t border-border">
                {faqs.map((faq) => (
                  <FAQItem
                    key={faq.id}
                    faq={faq}
                    isOpen={openIds.has(faq.id)}
                    onToggle={() => toggle(faq.id)}
                  />
                ))}
              </ul>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FAQType;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const headingId = `faq-h-${faq.id}`;
  const panelId = `faq-p-${faq.id}`;
  return (
    <li className="border-b border-border">
      <h3 id={headingId}>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="group flex w-full items-center justify-between gap-4 py-5 text-left transition-colors"
        >
          <span
            className={cn(
              "font-display text-base font-semibold leading-snug transition-colors duration-200 sm:text-lg",
              isOpen
                ? "text-foreground"
                : "text-foreground/85 group-hover:text-foreground",
            )}
          >
            {faq.question}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ease-out-quart",
              isOpen
                ? "border-accent bg-accent/10 text-accent shadow-[0_0_0_4px_rgba(63,229,186,0.08)]"
                : "border-border bg-background text-muted-foreground group-hover:border-foreground/30 group-hover:text-foreground",
            )}
          >
            <Plus
              size={16}
              strokeWidth={2.4}
              className={cn(
                "transition-transform duration-300 ease-out-quart",
                isOpen ? "rotate-45" : "rotate-0",
              )}
            />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headingId}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.35, ease: EASE_OUT_QUART },
                opacity: { duration: 0.25, delay: 0.05 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3, ease: EASE_OUT_QUART },
                opacity: { duration: 0.15 },
              },
            }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-12 text-[15px] leading-relaxed text-muted-foreground">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
