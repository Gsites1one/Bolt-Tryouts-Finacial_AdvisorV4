import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Home } from "./screens/Home";
import { Contact } from "./screens/Contact";
import { NotFound } from "./screens/NotFound";
import { ScrollToTop } from "./components/primitives/ScrollToTop";
import { EASE_OUT_QUART } from "./lib/motion";

/**
 * Subtle page-transition wrapper.
 * Fade + 8px lift, 280ms — matches the in-section fadeUp motion variant
 * so navigation feels of-a-piece with scroll reveals rather than tacked on.
 */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.28, ease: EASE_OUT_QUART }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
