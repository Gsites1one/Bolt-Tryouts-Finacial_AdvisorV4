import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { footerLinks } from "../../data/nav";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border bg-surface/50">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div className="space-y-5">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Independent financial planning for people who refuse to let their
              future be a default setting.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                EFA certified
              </span>
              <span className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                Fee-only
              </span>
              <span className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                100% independent
              </span>
            </div>
          </div>

          {/* Services */}
          <FooterColumn title="Services" links={footerLinks.services} />

          {/* Company */}
          <FooterColumn title="Company" links={footerLinks.company} />

          {/* Legal */}
          <FooterColumn title="Legal" links={footerLinks.legal} />
        </div>

        <div className="mt-14 border-t border-border pt-8">
          <div className="flex flex-col gap-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
            <p>© {year} Aura Capital. All rights reserved.</p>
            <p className="max-w-xl text-xs leading-relaxed">
              Aura Capital is a fictional brand used for prototype demonstration.
              In a live deployment this footer will carry regulatory disclosures
              (license number, supervising authority, complaints procedure).
            </p>
          </div>
        </div>
      </div>
    </footer>
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
      <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/80">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map((link) => {
          const isInternal = link.href.startsWith("/") && !link.href.startsWith("/#");
          const linkClass =
            "text-sm text-muted-foreground transition-colors hover:text-foreground";
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
