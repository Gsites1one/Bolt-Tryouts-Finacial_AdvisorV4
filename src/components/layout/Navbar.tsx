import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { Button } from "../ui/button";
import { Logo } from "./Logo";
import { navLinks, contactPhone } from "../../data/nav";
import { cn } from "../../lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-200 ease-out",
        scrolled
          ? "border-b border-border bg-background/95 backdrop-blur-sm"
          : "border-b border-transparent bg-background",
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between md:h-20">
        <Logo />

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => {
            const isRoute =
              link.href.startsWith("/") && !link.href.includes("#");
            const className =
              "relative text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground " +
              "after:absolute after:inset-x-0 after:-bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 after:ease-out after:content-[''] hover:after:scale-x-100";
            return isRoute ? (
              <Link key={link.href} to={link.href} className={className}>
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href} className={className}>
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Desktop right cluster — phone + CTA */}
        <div className="hidden items-center gap-5 md:flex">
          <a
            href={contactPhone.href}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Phone size={14} strokeWidth={2} />
            {contactPhone.display}
          </a>
          <Link to="/contact">
            <Button size="sm">Book a consultation</Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-[0.5rem] border border-border bg-background text-foreground transition-colors hover:bg-surface md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="relative block h-3.5 w-5">
            <span
              className={cn(
                "absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-200 ease-out",
                open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rounded-full bg-current transition-all duration-200 ease-out",
                open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100",
              )}
            />
            <span
              className={cn(
                "absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-200 ease-out",
                open ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0",
              )}
            />
          </span>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          "overflow-hidden border-t bg-background transition-[max-height,opacity] duration-200 ease-out md:hidden",
          open
            ? "max-h-[480px] border-border opacity-100"
            : "max-h-0 border-transparent opacity-0",
        )}
      >
        <div className="container-page flex flex-col gap-1 py-4">
          {navLinks.map((link) => {
            const isRoute =
              link.href.startsWith("/") && !link.href.includes("#");
            const className =
              "rounded-[0.5rem] px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-surface";
            return isRoute ? (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                className={className}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={className}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href={contactPhone.href}
            onClick={() => setOpen(false)}
            className="mt-1 inline-flex items-center gap-2 rounded-[0.5rem] px-3 py-3 text-base font-medium text-foreground hover:bg-surface"
          >
            <Phone size={16} strokeWidth={2} />
            {contactPhone.display}
          </a>
          <Link to="/contact" onClick={() => setOpen(false)} className="mt-2">
            <Button size="md" className="w-full">
              Book a consultation
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
