import type { LucideIcon } from "lucide-react";
import { PiggyBank, TrendingUp, ScrollText } from "lucide-react";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  readTime: number;
  category: string;
  icon: LucideIcon;
  accent: "mint" | "cyan" | "violet";
  publishedAt: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "retirement-calcs-lie",
    title: "Why most retirement calculators are quietly lying to you",
    excerpt:
      "They use a single rate of return, ignore tax brackets, and assume your spending stays flat. None of those things are true.",
    readTime: 6,
    category: "Planning",
    icon: PiggyBank,
    accent: "mint",
    publishedAt: "May 2026",
  },
  {
    id: "four-percent-2026",
    title: "The 4% rule, in 2026",
    excerpt:
      "A classic withdrawal rate, restated for the rate environment we actually live in — and for portfolios that don't look like 1994.",
    readTime: 8,
    category: "Investing",
    icon: TrendingUp,
    accent: "cyan",
    publishedAt: "April 2026",
  },
  {
    id: "fee-only-advisor",
    title: "What a fee-only advisor actually does (and doesn't)",
    excerpt:
      "A short guide to what's on the table, what's off-limits, and how to tell the difference before you sign anything.",
    readTime: 5,
    category: "About advice",
    icon: ScrollText,
    accent: "violet",
    publishedAt: "March 2026",
  },
];
