export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  location: string;
}

/** TODO:CLIENT_REVIEWS — replace with the advisor's real client quotes. */
export const testimonials: Testimonial[] = [
  {
    id: "marta",
    quote:
      "I'd been to four advisors before. This was the first conversation where I felt I wasn't being sold to.",
    name: "Marta K.",
    role: "Software engineer",
    location: "Berlin",
  },
  {
    id: "lukas",
    quote:
      "Aura rebuilt my portfolio from scratch. Three years in, I've doubled what the bank gave me — and I actually understand it now.",
    name: "Lukas R.",
    role: "Business owner",
    location: "Vienna",
  },
  {
    id: "anna",
    quote:
      "Calm, plain-language advice. The annual fee paid for itself in the first quarter through tax structuring alone.",
    name: "Anna S.",
    role: "Architect",
    location: "Warsaw",
  },
];
