export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: "cost",
    question: "How much does a consultation cost?",
    answer:
      "The first conversation is free. Full engagements start at €1,200 for a written plan — covering investments, protection, tax, and milestones — with quarterly reviews included for the first year.",
  },
  {
    id: "independent",
    question: "Are you really independent?",
    answer:
      "Yes. No bank affiliations, no kickbacks, no product quotas. I'm paid by clients, only. I'll show you exactly how on the first call.",
  },
  {
    id: "fit",
    question: "Who is this for?",
    answer:
      "Mostly professionals and business owners with €50k+ in invested assets or income above €70k per year. If you're earlier than that but motivated and clear about your goals, talk to me anyway — the first call is free.",
  },
  {
    id: "confidential",
    question: "Is our conversation confidential?",
    answer:
      "Always. Bound by professional confidentiality and GDPR. Notes are encrypted at rest and shared with no one. If you become a client, you can request deletion of all records at any time.",
  },
  {
    id: "cadence",
    question: "How often do we meet after the initial plan?",
    answer:
      "Quarterly by default — a 45-minute video call where we look at progress, life changes, and market conditions. We add ad-hoc sessions for major events (job change, property purchase, inheritance, etc.) at no extra cost in year one.",
  },
  {
    id: "preparation",
    question: "What do I need to bring to the first meeting?",
    answer:
      "Nothing. Just questions and a sense of what you'd like the next ten years to look like. If we decide to move forward, I'll send a short document checklist before the strategy session.",
  },
  {
    id: "non-resident",
    question: "Do you work with non-residents?",
    answer:
      "Yes, across the EU and EEA. For country-specific tax and regulation, I partner with local specialists — you stay with me as the primary advisor, and I coordinate the rest.",
  },
  {
    id: "languages",
    question: "What languages do you work in?",
    answer:
      "English, Polish, and German. All written plans are delivered in your preferred language.",
  },
];
