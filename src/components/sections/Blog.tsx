import { motion } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";
import { blogPosts, type BlogPost } from "../../data/blog";
import { RevealOnScroll } from "../primitives/RevealOnScroll";
import { fadeUp, staggerChildren } from "../../lib/motion";
import { cn } from "../../lib/utils";

const accentBg: Record<BlogPost["accent"], string> = {
  mint: "linear-gradient(135deg, #0B4F4A 0%, #0A0F1A 60%, #1E2632 100%)",
  cyan: "linear-gradient(135deg, #0E2B3D 0%, #0A0F1A 60%, #1E2632 100%)",
  violet: "linear-gradient(135deg, #2A1947 0%, #0A0F1A 60%, #1E2632 100%)",
};

const accentVeil: Record<BlogPost["accent"], string> = {
  mint:
    "radial-gradient(60% 50% at 30% 30%, rgba(63,229,186,0.45), transparent 60%), radial-gradient(50% 40% at 80% 80%, rgba(91,208,244,0.3), transparent 60%)",
  cyan:
    "radial-gradient(60% 50% at 30% 30%, rgba(91,208,244,0.45), transparent 60%), radial-gradient(50% 40% at 80% 80%, rgba(182,110,255,0.3), transparent 60%)",
  violet:
    "radial-gradient(60% 50% at 30% 30%, rgba(182,110,255,0.45), transparent 60%), radial-gradient(50% 40% at 80% 80%, rgba(255,107,181,0.3), transparent 60%)",
};

const accentTag: Record<BlogPost["accent"], string> = {
  mint: "bg-aurora-mint/15 text-aurora-mint ring-aurora-mint/30",
  cyan: "bg-aurora-cyan/15 text-aurora-cyan ring-aurora-cyan/30",
  violet: "bg-aurora-violet/15 text-aurora-violet ring-aurora-violet/30",
};

export function Blog() {
  return (
    <section
      id="insights"
      className="section relative bg-background"
    >
      <div className="container-page">
        {/* Heading with side action */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <RevealOnScroll>
              <span className="eyebrow">Insights</span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.05}>
              <h2 className="heading-section mt-5">
                Things worth reading.
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <p className="mt-5 max-w-xl text-lead">
                Plain-English essays on planning, investing, and how the
                financial industry actually works.
              </p>
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.15}>
            <a
              href="#"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              See all articles
              <ArrowUpRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </RevealOnScroll>
        </div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          variants={staggerChildren(0.1, 0.05)}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {blogPosts.map((post) => (
            <motion.div key={post.id} variants={fadeUp}>
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  const { icon: Icon, title, excerpt, readTime, category, accent, publishedAt } =
    post;

  return (
    <a
      href="#"
      className="group relative block h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 ease-out-quart hover:-translate-y-1 hover:border-foreground/15 hover:shadow-[0_24px_60px_-20px_rgba(11,79,74,0.18)]"
    >
      {/* Cover */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: accentBg[accent] }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-90"
          style={{ background: accentVeil[accent] }}
        />
        {/* Noise grain */}
        <div
          aria-hidden="true"
          className="absolute inset-0 mix-blend-overlay opacity-[0.08]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Large icon mark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon
            size={64}
            strokeWidth={1.2}
            className="text-white/60 transition-all duration-500 ease-out-quart group-hover:scale-110 group-hover:text-white/80"
          />
        </div>

        {/* Category tag */}
        <div className="absolute left-4 top-4">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] ring-1 backdrop-blur-md",
              accentTag[accent],
            )}
          >
            {category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={12} strokeWidth={2.2} />
            {readTime} min read
          </span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
          <span>{publishedAt}</span>
        </div>

        <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-foreground transition-colors duration-300 group-hover:text-foreground">
          {title}
        </h3>

        <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
          {excerpt}
        </p>

        <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors group-hover:text-accent">
          Read more
          <ArrowUpRight
            size={14}
            strokeWidth={2.2}
            className="transition-transform duration-300 ease-out-quart group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </a>
  );
}
