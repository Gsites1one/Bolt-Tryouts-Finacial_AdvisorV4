import { motion } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";
import { blogPosts, type BlogPost } from "../../data/blog";
import { RevealOnScroll } from "../primitives/RevealOnScroll";
import { fadeUp, staggerChildren } from "../../lib/motion";

export function Blog() {
  return (
    <section id="insights" className="section bg-background">
      <div className="container-page">
        {/* Heading with side action */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <RevealOnScroll>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Insights
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.05}>
              <h2 className="heading-section mt-4">Thinking, in writing.</h2>
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
            <motion.div key={post.id} variants={fadeUp} className="h-full">
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  const { icon: Icon, title, excerpt, readTime, category, publishedAt } = post;

  return (
    <a
      href="#"
      className="group relative flex h-full flex-col overflow-hidden rounded-[0.5rem] border border-border bg-card shadow-sm transition-[transform,box-shadow] duration-300 ease-out-quart hover:-translate-y-1 hover:shadow-md"
    >
      {/* Cover — single navy tone, gold mark, consistent with the rest of the site */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-primary">
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon
            size={56}
            strokeWidth={1.2}
            className="text-primary-foreground/25 transition-transform duration-500 ease-out-quart group-hover:scale-110"
          />
        </div>
        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center rounded-[0.375rem] border border-primary-foreground/25 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-primary-foreground/80">
            {category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={12} strokeWidth={2.2} />
            {readTime} min read
          </span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
          <span>{publishedAt}</span>
        </div>

        <h3 className="mt-3 line-clamp-2 font-display text-lg font-medium leading-snug text-foreground">
          {title}
        </h3>

        <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-muted-foreground">
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
