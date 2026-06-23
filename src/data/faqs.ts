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
      "The first conversation is free. Full engagements start at €1,200 for a written plan covering investments, protection, tax, and milestones, with quarterly reviews included for the first year.",
  },
  {
    id: "independent",
    question: "Are you really independent?",
    answer:
      "Yes. No bank affiliations, no kickbacks, no product quotas. I'm paid by clients, only. I'll show you exactly how on the first call.",
  },
  {
    id: "documents",
    question: "What documents do I need to bring?",
    answer:
      "Nothing for the first meeting. If we decide to work together, I'll send a short checklist beforehand: typically pension statements, current investment accounts, insurance policies and a recent tax return.",
  },
  {
    id: "timing",
    question: "How long does the process take?",
    answer:
      "Two to four weeks from the first meeting to a written plan. Implementation runs in parallel and is usually complete within 60 days. After that, we meet quarterly.",
  },
  {
    id: "first-meeting",
    question: "What happens in the first meeting?",
    answer:
      "A relaxed 60-minute conversation, in person or by video. We discuss your situation, your goals and whether I'm the right advisor for you. No documents needed, no sales pitch, no commitment.",
  },
];
