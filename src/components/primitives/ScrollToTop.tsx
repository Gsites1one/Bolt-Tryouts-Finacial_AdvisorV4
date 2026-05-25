import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Resets window scroll to (0, 0) on every *forward* route change.
 * Mount once inside <BrowserRouter>, before <Routes>.
 *
 * - PUSH / REPLACE → scroll to top (new page should start fresh)
 * - POP (browser back/forward) → leave scroll alone so the browser restores
 *   the previous position naturally
 *
 * Without this, clicking "Book a call" from the bottom of the landing page
 * would open /contact already scrolled to the bottom.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType === "POP") return;
    window.scrollTo(0, 0);
  }, [pathname, navType]);

  return null;
}
