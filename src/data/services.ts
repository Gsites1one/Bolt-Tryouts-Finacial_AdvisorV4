import type { LucideIcon } from "lucide-react";
import {
  TrendingUp,
  Sailboat,
  Home,
  ShieldCheck,
  Percent,
  Landmark,
} from "lucide-react";

export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  /** Accent gradient angle used for hover glow — variety across the grid. */
  accent: "violet" | "cyan" | "mint" | "pink";
}

export const services: Service[] = [
  {
    id: "investment",
    icon: TrendingUp,
    title: "Investment planning",
    description:
      "Build a portfolio that fits your goals, not your bank's quarterly targets.",
    accent: "mint",
  },
  {
    id: "retirement",
    icon: Sailboat,
    title: "Retirement strategy",
    description:
      "Map the path from today's salary to the life you want at 65 — or 55.",
    accent: "cyan",
  },
  {
    id: "mortgage",
    icon: Home,
    title: "Mortgage advisory",
    description:
      "Compare every lender on the market. Independent means independent.",
    accent: "violet",
  },
  {
    id: "insurance",
    icon: ShieldCheck,
    title: "Insurance review",
    description:
      "Find out which policies are protecting you and which are quietly draining you.",
    accent: "mint",
  },
  {
    id: "tax",
    icon: Percent,
    title: "Tax optimization",
    description:
      "Legal, structural moves that compound year over year.",
    accent: "pink",
  },
  {
    id: "estate",
    icon: Landmark,
    title: "Estate planning",
    description:
      "Decide how your wealth moves through generations, on your terms.",
    accent: "cyan",
  },
];
