export interface Service {
  id: string;
  title: string;
  description: string;
  body: string;
  image: string;
  imageAlt: string;
}

/**
 * Three core services for a generalist independent advisor.
 * Rendered as alternating image+text rows (NOT a card grid).
 * TODO:CLIENT_PHOTO — replace stock imagery with the advisor's own photography.
 */
export const services: Service[] = [
  {
    id: "investment",
    title: "Investment planning",
    description:
      "Build a portfolio that fits your goals, not your bank's quarterly targets.",
    body:
      "Low-cost, evidence-based, globally diversified. We design an allocation around the life you actually want, then rebalance with discipline, not headlines.",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1100&q=85",
    imageAlt:
      "A laptop showing a portfolio chart on a clean wooden desk with a coffee cup",
  },
  {
    id: "retirement",
    title: "Retirement strategy",
    description:
      "Map the path from today's salary to the life you want at 65, or 55.",
    body:
      "Projection-driven, withdrawal-aware planning. We model your pillars, identify the gaps, and structure contributions so the math actually compounds in your favour.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1100&q=85",
    imageAlt:
      "A couple walking hand-in-hand along a sunlit coastal path at dusk",
  },
  {
    id: "tax",
    title: "Tax &amp; estate optimization",
    description:
      "Legal, structural moves that compound year over year.",
    body:
      "From box-3 efficiency to cross-border holdings, donation planning, and clean succession. The decisions you make now define what your wealth does in twenty years.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1100&q=85",
    imageAlt:
      "Two professionals reviewing a document together at a bright, minimal office desk",
  },
];
