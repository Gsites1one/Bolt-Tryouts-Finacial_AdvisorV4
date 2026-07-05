export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/contact" },
];

/** TODO:CLIENT — replace with the advisor's real phone number. */
export const contactPhone = {
  display: "+31 20 123 4567",
  href: "tel:+31201234567",
};

export const footerLinks = {
  services: [
    { label: "Investment planning", href: "/#services" },
    { label: "Retirement strategy", href: "/#services" },
    { label: "Tax optimization", href: "/#services" },
    { label: "Estate planning", href: "/#services" },
  ],
  company: [
    { label: "About", href: "/#about" },
    { label: "Process", href: "/#process" },
    { label: "Reviews", href: "/#reviews" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Disclaimer", href: "#" },
    { label: "Complaints procedure", href: "#" },
  ],
};
