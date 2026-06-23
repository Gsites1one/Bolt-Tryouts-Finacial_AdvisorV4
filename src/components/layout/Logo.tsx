import { cn } from "../../lib/utils";

interface LogoProps {
  className?: string;
  /** Inverted variant for placement on the navy footer / dark sections. */
  inverted?: boolean;
}

/**
 * Aura Capital wordmark.
 * Quiet monogram in a navy square + serif wordmark beside it.
 */
export function Logo({ className, inverted = false }: LogoProps) {
  return (
    <a
      href="/"
      aria-label="Aura Capital, home"
      className={cn(
        "group inline-flex items-center gap-2.5 transition-opacity hover:opacity-90",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-[6px]",
          inverted
            ? "bg-background text-primary"
            : "bg-primary text-primary-foreground",
        )}
      >
        <span className="font-display text-[16px] font-semibold leading-none">
          A
        </span>
      </span>
      <span
        className={cn(
          "font-display text-[18px] font-semibold leading-none tracking-tight",
          inverted ? "text-background" : "text-foreground",
        )}
      >
        Aura<span className="font-normal opacity-70">Capital</span>
      </span>
    </a>
  );
}
