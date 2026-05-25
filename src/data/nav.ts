export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Services", href: "/#services" },
  { label: "How it works", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "Insights", href: "/#insights" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  services: [
    { label: "Investment planning", href: "/#services" },
    { label: "Retirement strategy", href: "/#services" },
    { label: "Mortgage advisory", href: "/#services" },
    { label: "Insurance review", href: "/#services" },
    { label: "Tax optimization", href: "/#services" },
    { label: "Estate planning", href: "/#services" },
  ],
  company: [
    { label: "About", href: "/#about" },
    { label: "How it works", href: "/#process" },
    { label: "Insights", href: "/#insights" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Cookies", href: "#" },
    { label: "Regulatory", href: "#" },
  ],
};
