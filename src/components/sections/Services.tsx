import { motion } from "framer-motion";
import { services } from "../../data/services";
import { RevealOnScroll } from "../primitives/RevealOnScroll";
import { fadeUp } from "../../lib/motion";
import { cn } from "../../lib/utils";

export function Services() {
  return (
    <section id="services" className="section bg-background">
      <div className="container-page">
        {/* Heading */}
        <div className="max-w-2xl">
          <RevealOnScroll>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Services
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.05}>
            <h2 className="heading-section mt-4">
              Three things we do — well.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="mt-5 max-w-xl text-lead">
              Focused practice, deep work. Every engagement is built around one
              or more of these — never products you don&rsquo;t need.
            </p>
          </RevealOnScroll>
        </div>

        {/* Alternating image+text rows */}
        <div className="mt-16 space-y-20 md:mt-20 md:space-y-28">
          {services.map((service, i) => {
            const flip = i % 2 === 1;
            return (
              <motion.article
                key={service.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                variants={fadeUp}
                className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16"
              >
                <figure
                  className={cn(
                    "relative overflow-hidden rounded-[0.5rem] border border-border bg-card shadow-sm",
                    flip ? "md:order-2" : "md:order-1",
                  )}
                >
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    loading="lazy"
                    className="h-[320px] w-full object-cover md:h-[400px]"
                  />
                </figure>
                <div className={flip ? "md:order-1" : "md:order-2"}>
                  <p className="font-mono text-xs font-medium tabular-nums text-accent">
                    0{i + 1}
                  </p>
                  <h3
                    className="mt-4 font-display text-3xl font-medium leading-tight text-foreground md:text-[2.25rem]"
                    dangerouslySetInnerHTML={{ __html: service.title }}
                  />
                  <p className="mt-4 text-lg leading-relaxed text-foreground/80">
                    {service.description}
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                    {service.body}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
