import { RevealOnScroll } from "../primitives/RevealOnScroll";

/**
 * Full-width rhythm break between "Services" and "Process" (Task 6).
 * Every surrounding section sits on the site's warm cream tones, so this one
 * inverts to the navy primary — the same tone CTABanner/Footer already use
 * for emphasis — to give the scroll a deliberate pause. Used once only.
 */
export function EditorialBreak() {
  return (
    <section
      id="manifesto"
      aria-label="Our view"
      className="scroll-mt-24 flex min-h-[60vh] items-center justify-center bg-primary py-20 text-center text-primary-foreground md:py-28"
    >
      <div className="container-page">
        <RevealOnScroll className="mx-auto max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary-foreground/55">
            What we believe
          </p>
          <blockquote className="mt-6 font-display text-[1.75rem] italic font-medium leading-[1.3] tracking-[-0.01em] sm:text-4xl md:text-[2.75rem]">
            Most people don&rsquo;t have a money problem.{" "}
            <span className="text-accent">
              They have a clarity problem.
            </span>
          </blockquote>
        </RevealOnScroll>
      </div>
    </section>
  );
}
