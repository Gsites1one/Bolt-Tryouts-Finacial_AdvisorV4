import type { LucideIcon } from "lucide-react";
import { MessageCircle, Map, Rocket, Compass } from "lucide-react";

export interface ProcessStep {
  id: string;
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    id: "discovery",
    number: "01",
    icon: MessageCircle,
    title: "Discovery",
    description:
      "A 60-minute conversation. No documents needed, no commitment. We figure out whether we're a fit.",
  },
  {
    id: "strategy",
    number: "02",
    icon: Map,
    title: "Strategy",
    description:
      "I build a written plan covering investments, protection, tax, and milestones. You read it. We refine it.",
  },
  {
    id: "implementation",
    number: "03",
    icon: Rocket,
    title: "Implementation",
    description:
      "We execute together. Accounts opened, products selected, paperwork done. I do the heavy lifting.",
  },
  {
    id: "care",
    number: "04",
    icon: Compass,
    title: "Ongoing care",
    description:
      "Quarterly reviews, life-event check-ins, market updates. Your plan is alive, not filed.",
  },
];
