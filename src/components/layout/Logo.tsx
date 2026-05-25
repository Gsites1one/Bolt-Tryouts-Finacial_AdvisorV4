import { cn } from "../../lib/utils";

interface LogoProps {
  className?: string;
  /** When true, uses light-on-dark variant (for use on aurora hero / dark sections). */
  onDark?: boolean;
}

/**
 * Aura Capital wordmark.
 * Logo mark = stylized "A" inside a soft aurora-gradient square.
 * Wordmark beside it in Geist.
 */
export function Logo({ className, onDark = false }: LogoProps) {
  return (
    <a
      href="/"
      aria-label="Aura Capital — home"
      className={cn(
        "group inline-flex items-center gap-2.5 transition-opacity hover:opacity-90",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-[10px] shadow-[0_4px_20px_rgb(63_229_186/0.35)]"
        style={{
          background:
            "radial-gradient(120% 120% at 30% 20%, #B66EFF 0%, #5BD0F4 35%, #3FE5BA 65%, #0B4F4A 100%)",
        }}
      >
        <span className="font-display text-[15px] font-bold leading-none text-white">
          A
        </span>
      </span>
      <span
        className={cn(
          "font-display text-[17px] font-semibold leading-none tracking-tight",
          onDark ? "text-white" : "text-foreground",
        )}
      >
        Aura<span className="opacity-60">Capital</span>
      </span>
    </a>
  );
}
