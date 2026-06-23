import { useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials, type Testimonial } from "../../data/testimonials";
import { RevealOnScroll } from "../primitives/RevealOnScroll";

export function Testimonials() {
  const reduce = useReducedMotion();

  return (
    <section
      id="reviews"
      aria-label="What clients say"
      className="section bg-surface/50"
    >
      <div className="container-page">
        <div className="max-w-2xl">
          <RevealOnScroll>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Reviews
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.05}>
            <h2 className="heading-section mt-4">
              What clients say after a year of work.
            </h2>
          </RevealOnScroll>
        </div>
      </div>

      {/*
       * Continuous, slow auto-marquee of the 6 reviews — same seamless
       * mechanism + easing as the Trusted Partners logo row. Two identical
       * groups translate one full group width and loop. Pauses on hover so a
       * reader can stop and read. No clicking required.
       */}
      <RevealOnScroll delay={0.1}>
        {reduce ? (
          // Reduced motion: static, readable grid — all content reachable.
          <div className="container-page mt-12 md:mt-16">
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <li key={t.id} className="h-full">
                  <ReviewCard t={t} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div
            className="group relative mt-12 flex overflow-hidden md:mt-16"
            aria-label="Client reviews, auto-scrolling"
          >
            {[0, 1].map((groupIndex) => (
              <ul
                key={groupIndex}
                aria-hidden={groupIndex === 1}
                className="flex shrink-0 animate-marquee items-stretch group-hover:[animation-play-state:paused]"
                style={{ animationDuration: "60s" }}
              >
                {testimonials.map((t) => (
                  <li
                    key={t.id}
                    className="w-[300px] shrink-0 px-3 sm:w-[340px]"
                  >
                    <ReviewCard t={t} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        )}
      </RevealOnScroll>
    </section>
  );
}

function ReviewCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full min-h-[15rem] flex-col rounded-[0.5rem] border border-border bg-card p-6 shadow-sm md:p-7">
      <div className="flex gap-0.5" aria-label="Rated 5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            strokeWidth={1.5}
            className="fill-accent text-accent"
            aria-hidden="true"
          />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground">
        {t.quote}
      </blockquote>
      <figcaption className="mt-6 border-t border-border pt-4">
        <p className="font-medium text-foreground">{t.name}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {t.role} &middot; {t.location}
        </p>
        <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground/80">
          Client since {t.clientSince}
        </p>
      </figcaption>
    </figure>
  );
}
