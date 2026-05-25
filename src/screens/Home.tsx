import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/sections/Hero";
import { TrustStrip } from "../components/sections/TrustStrip";
import { Services } from "../components/sections/Services";
import { Process } from "../components/sections/Process";
import { Stats } from "../components/sections/Stats";
import { About } from "../components/sections/About";
import { Calculator } from "../components/sections/Calculator";
import { Testimonials } from "../components/sections/Testimonials";
import { Blog } from "../components/sections/Blog";
import { Resources } from "../components/sections/Resources";
import { FAQ } from "../components/sections/FAQ";
import { CTABanner } from "../components/sections/CTABanner";

/**
 * Home / landing page.
 *
 * Sections shipped:
 *   M1: Foundation (Navbar, Footer, routing)
 *   M2: Hero with AuroraBackground + PortfolioCard
 *   M3: TrustStrip, Services, Process
 *   M4: Stats, About, Calculator
 *   M5: Testimonials, Blog, Resources
 *   M6: FAQ, CTABanner
 *
 * Landing page complete. Pending (M7): Contact page polish.
 */
export function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <Process />
        <Stats />
        <About />
        <Calculator />
        <Testimonials />
        <Blog />
        <Resources />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
