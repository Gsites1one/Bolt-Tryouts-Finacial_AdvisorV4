import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import {
  applyTheme,
  getAppliedTheme,
  persistTheme,
  type Theme,
} from "../../lib/theme";
import { cn } from "../../lib/utils";

interface ThemeToggleProps {
  /** When true, uses translucent dark-mode styling for placement over the hero. */
  onDark?: boolean;
  className?: string;
}

export function ThemeToggle({ onDark, className }: ThemeToggleProps) {
  // Read whatever the inline script in index.html applied, then mirror in state.
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getAppliedTheme());
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
    persistTheme(next);
  };

  // Pre-mount: render a placeholder so layout stays stable
  if (!mounted) {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border",
          onDark ? "border-white/20" : "border-border",
          className,
        )}
      />
    );
  }

  const nextLabel = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${nextLabel} mode`}
      title={`Switch to ${nextLabel} mode`}
      className={cn(
        "relative inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border transition-all duration-200",
        onDark
          ? "border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10"
          : "border-border bg-background text-foreground hover:border-foreground/30 hover:bg-surface",
        className,
      )}
    >
      <AnimatePresence initial={false} mode="wait">
        {theme === "light" ? (
          <motion.span
            key="moon"
            initial={{ y: -16, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 16, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex"
          >
            <Moon size={15} strokeWidth={2.2} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ y: -16, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 16, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex"
          >
            <Sun size={15} strokeWidth={2.2} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
