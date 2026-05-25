export type Accent = "mint" | "cyan" | "violet";

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  accent: Accent;
}

export const testimonials: Testimonial[] = [
  {
    id: "marta",
    quote:
      "I'd been to four advisors before. This was the first conversation where I felt I wasn't being sold to.",
    name: "Marta K.",
    role: "Software engineer",
    location: "Berlin",
    rating: 5,
    accent: "mint",
  },
  {
    id: "lukas",
    quote:
      "Aura rebuilt my portfolio from scratch. Three years in, I've doubled what the bank gave me — and I actually understand it now.",
    name: "Lukas R.",
    role: "Business owner",
    location: "Vienna",
    rating: 5,
    accent: "cyan",
  },
  {
    id: "anna",
    quote:
      "Worth every cent of the fee. The mortgage advice alone saved me twice that in year one.",
    name: "Anna S.",
    role: "Architect",
    location: "Warsaw",
    rating: 5,
    accent: "violet",
  },
];
