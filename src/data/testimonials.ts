export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  location: string;
  /** Year the client started, shown as a "Client since 20XX" credibility line. */
  clientSince: string;
}

/** Illustrative demo reviews for the prototype (authored, not real clients). */
export const testimonials: Testimonial[] = [
  {
    id: "marta",
    quote:
      "I'd been to four advisors before. This was the first conversation where I felt I wasn't being sold to.",
    name: "Marta K.",
    role: "Software engineer",
    location: "Berlin",
    clientSince: "2021",
  },
  {
    id: "lukas",
    quote:
      "Aura rebuilt my portfolio from scratch. Three years in, I've doubled what the bank gave me, and I actually understand it now.",
    name: "Lukas R.",
    role: "Business owner",
    location: "Vienna",
    clientSince: "2023",
  },
  {
    id: "anna",
    quote:
      "Calm, plain-language advice. The annual fee paid for itself in the first quarter through tax structuring alone.",
    name: "Anna S.",
    role: "Architect",
    location: "Warsaw",
    clientSince: "2020",
  },
  {
    id: "thomas",
    quote:
      "I have no time to manage money. Aura built a plan I check twice a year and otherwise forget. That's exactly what I wanted.",
    name: "Thomas V.",
    role: "Surgeon",
    location: "Amsterdam",
    clientSince: "2022",
  },
  {
    id: "sofie-mark",
    quote:
      "We came in anxious about whether we could retire at 60. We left with a written plan and, for the first time, a clear answer.",
    name: "Sofie & Mark D.",
    role: "Approaching retirement",
    location: "Utrecht",
    clientSince: "2024",
  },
  {
    id: "daniel",
    quote:
      "After selling my company I was a target for every private bank. Aura was the only one charging a flat fee with nothing to push.",
    name: "Daniel K.",
    role: "Founder, exited 2023",
    location: "Rotterdam",
    clientSince: "2023",
  },
];
