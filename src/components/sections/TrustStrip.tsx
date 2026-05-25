import { Briefcase, Users, Wallet, Award, Scale } from "lucide-react";
import { RevealOnScroll } from "../primitives/RevealOnScroll";

const items = [
  { icon: Briefcase, value: "12 years", label: "advising" },
  { icon: Users, value: "200+", label: "clients" },
  { icon: Wallet, value: "€40M", label: "assets advised" },
  { icon: Award, value: "EFA", label: "certified" },
  { icon: Scale, value: "100%", label: "independent" },
];

/**
 * Compact trust bar — sits directly after the hero.
 * Five credibility points separated by hairline dividers.
 * Each item lights up subtly on hover.
 */
export function TrustStrip() {
  return (
    <section
      aria-label="Credentials"
      className="relative border-b border-border bg-background"
    >
      <RevealOnScroll>
        <div className="container-page py-8 md:py-10">
          <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4 md:justify-between">
            {items.map(({ icon: Icon, value, label }, i) => (
              <li key={value} className="flex items-center">
                <div className="group flex items-center gap-3 rounded-full px-3 py-1.5 transition-colors duration-200 hover:bg-surface">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent ring-1 ring-accent/20 transition-all duration-200 group-hover:bg-accent/15 group-hover:ring-accent/40">
                    <Icon size={16} strokeWidth={2.2} />
                  </span>
                  <span className="flex items-baseline gap-1.5 text-sm">
                    <span className="font-display font-semibold tracking-tight text-foreground">
                      {value}
                    </span>
                    <span className="text-muted-foreground">{label}</span>
                  </span>
                </div>
                {i < items.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="mx-1 hidden h-4 w-px bg-border md:inline-block"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </RevealOnScroll>
    </section>
  );
}
