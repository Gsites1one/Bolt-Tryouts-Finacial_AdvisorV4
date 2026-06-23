import { Star } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { RevealOnScroll } from "../primitives/RevealOnScroll";

/**
 * Partner / institution wordmarks shown under the hero as a quiet trust signal.
 * TODO:CLIENT_PARTNERS — replace with the advisor's real custodian / partner logos
 * (greyscale SVGs). Wordmark text below is a placeholder, not a real brand claim.
 */
const partners = [
  "Vanguard",
  "BlackRock",
  "DEGIRO",
  "Saxo",
  "Fidelity",
];

/** Edge fade so wordmarks dissolve in/out rather than hard-clipping. */
const edgeMask =
  "linear-gradient(to right, transparent, #000 9%, #000 91%, transparent)";

export function TrustStrip() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-label="Trusted partners"
      className="border-y border-border bg-surface/60"
    >
      <RevealOnScroll>
        <div className="container-page py-12 md:py-16">
          {/* Eyebrow label, centered */}
          <p className="text-center text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Trusted partners
          </p>

          {reduce ? (
            /* Reduced motion: static, evenly-spaced row — no animation. */
            <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:mt-8 md:gap-x-14">
              {partners.map((name) => (
                <li
                  key={name}
                  className="whitespace-nowrap font-display text-base font-medium tracking-tight text-muted-foreground/75 md:text-[17px]"
                >
                  {name}
                </li>
              ))}
            </ul>
          ) : (
            /*
             * Seamless infinite marquee. Two identical, min-w-full groups sit
             * side by side and both translate left by one full group width;
             * when the first scrolls off, the second is exactly in its place,
             * so the loop has no visible reset. Pauses on hover.
             */
            <div
              className="group mt-7 flex overflow-hidden md:mt-8"
              style={{ maskImage: edgeMask, WebkitMaskImage: edgeMask }}
            >
              {[0, 1].map((groupIndex) => (
                <ul
                  key={groupIndex}
                  aria-hidden={groupIndex === 1}
                  className="flex min-w-full shrink-0 items-center justify-around animate-marquee group-hover:[animation-play-state:paused]"
                >
                  {partners.map((name) => (
                    <li
                      key={name}
                      className="whitespace-nowrap px-6 font-display text-base font-medium tracking-tight text-muted-foreground/70 transition-opacity duration-200 hover:text-foreground hover:opacity-100 md:px-8 md:text-[17px]"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          )}

          {/* Rating — own line, never breaks */}
          <p className="mt-7 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-muted-foreground md:mt-8">
            <span className="inline-flex items-center gap-1.5">
              <Star
                size={14}
                strokeWidth={1.5}
                className="fill-accent text-accent"
              />
              <span className="font-mono font-medium tabular-nums text-foreground">
                4.9 / 5
              </span>
            </span>
            <span aria-hidden="true" className="text-muted-foreground/50">
              &middot;
            </span>
            <span className="whitespace-nowrap">
              <span className="font-mono tabular-nums">120+</span> client
              reviews
            </span>
          </p>
        </div>
      </RevealOnScroll>
    </section>
  );
}
