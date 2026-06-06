import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowRight, Phone, BookOpen } from "lucide-react";
import { ReassuranceModalButton } from "../primitives/ReassuranceModalButton";
import { faqs, type FAQ as FAQType } from "../../data/faqs";
import { RevealOnScroll } from "../primitives/RevealOnScroll";
import { contactPhone } from "../../data/nav";
import { EASE_OUT_QUART } from "../../lib/motion";
import { cn } from "../../lib/utils";

const askContent = {
  eyebrow: "Before you ask",
  title: (
    <>
      No question is{" "}
      <em className="font-display italic text-accent">too small</em>.
    </>
  ),
  subtitle: "Three things people usually worry about before reaching out.",
  points: [
    {
      title: "It's still free, even if you only need clarity.",
      body: "You don't have to be ready to hire an advisor to send a message.",
    },
    {
      title: "Confidential by default.",
      body: "Nothing leaves the conversation between us — bound by professional confidentiality and GDPR.",
    },
    {
      title: "A real answer in plain English.",
      body: "I reply within 24 hours, in language you understand, with no sales pitch.",
    },
  ],
  primary: { label: "Continue to contact form", href: "/contact" },
  secondaryActions: [
    {
      label: `Call ${contactPhone.display}`,
      href: contactPhone.href,
      icon: Phone,
    },
    {
      label: "Read the full FAQ",
      href: "#faq",
      icon: BookOpen,
    },
  ],
  footnote: "Average reply time: under 12 hours, Mon–Fri.",
};

/**
 * schema.org/FAQPage JSON-LD — lets ChatGPT, Perplexity, Google AI Overviews
 * and other answer engines treat each Q/A as a discrete, citeable unit.
 */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

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
      className="section bg-surface/50"
    >
      {/* AEO: structured data for answer engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container-page">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_3fr] lg:gap-20">
          {/* Left — heading, sticky on desktop */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <RevealOnScroll>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Questions
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.05}>
              <h2 className="heading-section mt-4">
                Quick answers, no jargon.
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <p className="mt-5 max-w-md text-lead">
                Five questions I hear most. If yours isn&rsquo;t here, the first
                60 minutes are free anyway &mdash; let&rsquo;s just talk.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.15}>
              <div className="mt-8">
                <ReassuranceModalButton
                  size="md"
                  variant="secondary"
                  className="group"
                  content={askContent}
                >
                  Ask me anything
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </ReassuranceModalButton>
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
          className="group flex w-full items-center justify-between gap-4 py-6 text-left"
        >
          <span
            className={cn(
              "font-display text-base font-medium leading-snug transition-colors duration-200 sm:text-lg",
              isOpen
                ? "text-foreground"
                : "text-foreground/85 group-hover:text-foreground",
            )}
          >
            {faq.question}
          </span>
          <Plus
            aria-hidden="true"
            size={18}
            strokeWidth={1.75}
            className={cn(
              "shrink-0 text-muted-foreground transition-transform duration-300 ease-out-quart group-hover:text-foreground",
              isOpen && "rotate-45 text-accent",
            )}
          />
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
