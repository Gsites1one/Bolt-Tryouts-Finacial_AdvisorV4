import { Link } from "react-router-dom";
import { ShieldCheck, Scale, GraduationCap, BadgeCheck } from "lucide-react";
import { Logo } from "./Logo";
import { footerLinks, contactPhone } from "../../data/nav";

const year = new Date().getFullYear();

/** TODO:CLIENT — replace with the advisor's real registration numbers. */
const complianceBadges = [
  { icon: ShieldCheck, label: "AFM-registered" },
  { icon: Scale, label: "Kifid member" },
  { icon: GraduationCap, label: "FFP® certified" },
  { icon: BadgeCheck, label: "100% independent" },
];

export function Footer() {
  return (
    <>
      {/* Regulatory trust strip — sits above the footer proper (Task 5) */}
      <div className="border-t border-border bg-surface/60">
        <div className="container-page py-6">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-10">
            {complianceBadges.map(({ icon: Icon, label }) => (
              <li key={label}>
                <span className="inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground opacity-70 transition-opacity duration-200 hover:opacity-100">
                  <Icon size={15} strokeWidth={1.75} aria-hidden="true" />
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="bg-primary text-primary-foreground">
      <div className="container-page py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div className="space-y-6">
            <Logo inverted />
            <p className="max-w-xs text-sm leading-relaxed text-primary-foreground/65">
              Independent financial planning for people who refuse to let their
              future be a default setting.
            </p>
            <div className="space-y-1.5 text-sm text-primary-foreground/65">
              <a
                href={contactPhone.href}
                className="block transition-colors hover:text-primary-foreground"
              >
                {contactPhone.display}
              </a>
              <a
                href="mailto:hello@auracapital.eu"
                className="block transition-colors hover:text-primary-foreground"
              >
                hello@auracapital.eu
              </a>
            </div>
          </div>

          <FooterColumn title="Services" links={footerLinks.services} />
          <FooterColumn title="Company" links={footerLinks.company} />
          <FooterColumn title="Legal" links={footerLinks.legal} />
        </div>

        <div className="mt-16 border-t border-primary-foreground/15 pt-8">
          <div className="flex flex-col gap-4 text-xs text-primary-foreground/55 md:flex-row md:items-start md:justify-between">
            <p>&copy; {year} Aura Capital. All rights reserved.</p>
            <p className="max-w-xl leading-relaxed">
              {/* Neutral demo placeholders — swap in the advisor's real
                  license number and supervising authority before launch. */}
              Aura Capital is registered as an independent financial advisor.
              License number available on request &middot; Supervised by the
              relevant national authority &middot; Complaints procedure
              available on request.
            </p>
          </div>
        </div>
      </div>
      </footer>
    </>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-primary-foreground/50">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link) => {
          const isInternal =
            link.href.startsWith("/") && !link.href.startsWith("/#");
          const linkClass =
            "text-sm text-primary-foreground/75 transition-colors hover:text-primary-foreground";
          return (
            <li key={`${title}-${link.label}`}>
              {isInternal ? (
                <Link to={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ) : (
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
