import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Logo } from "./Logo";
import { navLinks } from "../../data/nav";
import { cn } from "../../lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  // When at top of page, navbar floats over the dark aurora hero — use light text.
  // After scroll, navbar gets a solid white blur — use dark text.
  const onDark = !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out-quart",
        scrolled
          ? "border-b border-border/70 bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between md:h-20">
        <Logo onDark={onDark} />

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "group relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                onDark
                  ? "text-white/70 hover:text-white"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="relative z-10">{link.label}</span>
              {/* subtle hover pill */}
              <span
                className={cn(
                  "absolute inset-0 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100",
                  onDark ? "bg-white/10" : "bg-foreground/5",
                )}
              />
            </a>
          ))}
        </div>

        {/* Desktop CTA — always glowing mint, looks great on both modes */}
        <div className="hidden md:block">
          <Link to="/contact">
            <Button size="sm">Book a call</Button>
          </Link>
        </div>

        {/* Mobile hamburger — morph animation (three lines ↔ X) */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "relative inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 md:hidden",
            onDark
              ? "border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40"
              : "border-border bg-background text-foreground hover:bg-surface hover:border-foreground/30",
          )}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="relative block h-3.5 w-5">
            <span
              className={cn(
                "absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out-quart",
                open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0 rotate-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rounded-full bg-current transition-all duration-300 ease-out-quart",
                open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100",
              )}
            />
            <span
              className={cn(
                "absolute left-0 bottom-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out-quart",
                open ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0 rotate-0",
              )}
            />
          </span>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          "overflow-hidden border-t bg-background transition-[max-height,opacity] duration-300 ease-out-quart md:hidden",
          open
            ? "max-h-[480px] border-border opacity-100"
            : "max-h-0 border-transparent opacity-0",
        )}
      >
        <div className="container-page flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-surface"
            >
              {link.label}
            </a>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)} className="mt-2">
            <Button size="md" className="w-full">
              Book a call
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
