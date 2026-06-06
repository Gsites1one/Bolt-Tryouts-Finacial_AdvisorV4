export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    id: "discovery",
    number: "01",
    title: "Discovery",
    description:
      "A free 60-minute conversation. No documents, no commitment — we decide whether we're a fit.",
  },
  {
    id: "strategy",
    number: "02",
    title: "Strategy",
    description:
      "A written, independent plan covering investments, protection, tax and milestones. You read it. We refine it.",
  },
  {
    id: "care",
    number: "03",
    title: "Ongoing care",
    description:
      "We execute together and meet quarterly. Your plan stays current — adjusted for markets and life events.",
  },
];
