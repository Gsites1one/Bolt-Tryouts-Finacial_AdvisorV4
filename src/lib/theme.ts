export type Theme = "light" | "dark";

const STORAGE_KEY = "aura-theme";

/**
 * Resolve the initial theme on mount.
 * Precedence: localStorage > system preference > 'light'.
 */
export function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
}

/**
 * Read the theme currently applied to <html>.
 * Useful after the inline init script in index.html has already run —
 * keeps React state in sync without causing a re-render flash.
 */
export function getAppliedTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  // Hint browser-rendered widgets (scrollbar, form controls) to match
  root.style.colorScheme = theme;
}

export function persistTheme(theme: Theme) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, theme);
}
