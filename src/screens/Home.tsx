import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/sections/Hero";

/**
 * Home / landing page.
 *
 * Sections shipped:
 *   - M1: Foundation (Navbar, Footer, layout shell, routing)
 *   - M2: Hero with AuroraBackground + PortfolioCard
 *
 * Pending (M3–M6): TrustStrip, Services, Process, Stats, About,
 * Calculator, Testimonials, Blog, Resources, FAQ, CTABanner.
 */
export function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />

        <section className="section container-page">
          <p className="text-sm text-muted-foreground">
            Next milestones (M3–M6) bring TrustStrip, Services, Process, Stats,
            About, Calculator, Testimonials, Blog, Resources, FAQ, and the
            final CTA banner.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
