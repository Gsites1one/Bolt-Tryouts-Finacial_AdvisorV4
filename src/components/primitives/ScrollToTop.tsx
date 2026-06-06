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
 * Scroll is deferred ~80ms so it runs after the AnimatePresence exit
 * animation — otherwise the outgoing page visibly jumps to top before
 * fading out.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType === "POP") return;
    const t = window.setTimeout(() => window.scrollTo(0, 0), 80);
    return () => window.clearTimeout(t);
  }, [pathname, navType]);

  return null;
}
