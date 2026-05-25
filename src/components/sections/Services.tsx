import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services, type Service } from "../../data/services";
import { RevealOnScroll } from "../primitives/RevealOnScroll";
import { fadeUp, staggerChildren } from "../../lib/motion";
import { cn } from "../../lib/utils";

const accentMap: Record<
  Service["accent"],
  { iconBg: string; spotlight: string; border: string }
> = {
  mint: {
    iconBg: "from-aurora-mint to-aurora-cyan",
    spotlight: "rgba(63,229,186,0.18)",
    border:
      "linear-gradient(135deg, rgba(63,229,186,0.6), rgba(91,208,244,0.3) 40%, transparent 70%)",
  },
  cyan: {
    iconBg: "from-aurora-cyan to-aurora-violet",
    spotlight: "rgba(91,208,244,0.18)",
    border:
      "linear-gradient(135deg, rgba(91,208,244,0.6), rgba(182,110,255,0.3) 40%, transparent 70%)",
  },
  violet: {
    iconBg: "from-aurora-violet to-aurora-cyan",
    spotlight: "rgba(182,110,255,0.18)",
    border:
      "linear-gradient(135deg, rgba(182,110,255,0.6), rgba(91,208,244,0.3) 40%, transparent 70%)",
  },
  pink: {
    iconBg: "from-pink-400 to-aurora-violet",
    spotlight: "rgba(255,107,181,0.18)",
    border:
      "linear-gradient(135deg, rgba(255,107,181,0.6), rgba(182,110,255,0.3) 40%, transparent 70%)",
  },
};

export function Services() {
  return (
    <section id="services" className="section relative bg-background">
      <div className="container-page">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <RevealOnScroll>
            <span className="eyebrow">Services</span>
          </RevealOnScroll>
          <RevealOnScroll delay={0.05}>
            <h2 className="heading-section mt-5">
              Six things I do.{" "}
              <span className="text-muted-foreground">Nothing else.</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-lead">
              Focused practice, deep work. Each engagement is built around one
              or several of these — never products you don't need.
            </p>
          </RevealOnScroll>
        </div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          variants={staggerChildren(0.08, 0.05)}
          className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={fadeUp}>
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const { icon: Icon, title, description, accent } = service;
  const { iconBg, spotlight, border } = accentMap[accent];
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative isolate h-full overflow-hidden rounded-2xl border border-border bg-card p-7",
        "transition-[transform,box-shadow,border-color] duration-300 ease-out-quart",
        "hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_24px_60px_-20px_rgba(11,79,74,0.25)]",
      )}
      style={
        {
          "--spotlight": spotlight,
        } as React.CSSProperties
      }
    >
      {/* Animated gradient border on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px -z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: border, padding: "1px" }}
      >
        <div className="h-full w-full rounded-2xl bg-card" />
      </div>

      {/* Mouse-following spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), var(--spotlight), transparent 45%)",
        }}
      />

      {/* Icon */}
      <div
        className={cn(
          "relative inline-flex h-12 w-12 items-center justify-center rounded-xl text-white ring-1 ring-white/20",
          "bg-gradient-to-br",
          iconBg,
          "shadow-[0_10px_30px_-10px_rgba(11,79,74,0.45)] transition-all duration-300 ease-out-quart",
          "group-hover:scale-110 group-hover:-rotate-[6deg] group-hover:shadow-[0_18px_40px_-12px_rgba(63,229,186,0.45)]",
        )}
      >
        <Icon size={20} strokeWidth={2.2} />
      </div>

      {/* Title */}
      <h3 className="relative mt-6 font-display text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-foreground">
        {title}
      </h3>

      {/* Description */}
      <p className="relative mt-2 text-[15px] leading-relaxed text-muted-foreground">
        {description}
      </p>

      {/* Arrow */}
      <div className="relative mt-7 flex items-center gap-1.5 text-sm font-medium text-foreground/70 transition-colors duration-300 group-hover:text-foreground">
        <span>Learn more</span>
        <span className="relative inline-flex h-5 w-5 items-center justify-center">
          <ArrowUpRight
            size={15}
            strokeWidth={2.2}
            className="transition-all duration-300 ease-out-quart group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
          />
        </span>
      </div>

      {/* Bottom accent underline */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-7 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r transition-transform duration-500 ease-out-quart group-hover:scale-x-100",
          iconBg,
          "via-foreground/0 to-transparent",
        )}
      />
    </article>
  );
}
