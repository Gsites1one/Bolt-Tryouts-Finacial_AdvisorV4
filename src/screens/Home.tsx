import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { MobileStickyCta } from "../components/primitives/MobileStickyCta";
import { Hero } from "../components/sections/Hero";
import { TrustStrip } from "../components/sections/TrustStrip";
import { Services } from "../components/sections/Services";
import { EditorialBreak } from "../components/sections/EditorialBreak";
import { Process } from "../components/sections/Process";
import { Stats } from "../components/sections/Stats";
import { About } from "../components/sections/About";
import { Calculator } from "../components/sections/Calculator";
import { Testimonials } from "../components/sections/Testimonials";
import { Resources } from "../components/sections/Resources";
import { Blog } from "../components/sections/Blog";
import { FAQ } from "../components/sections/FAQ";
import { CTABanner } from "../components/sections/CTABanner";

export function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <EditorialBreak />
        <Process />
        <Stats />
        <About />
        <Calculator />
        <Testimonials />
        <Resources />
        <Blog />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
      <MobileStickyCta />
    </>
  );
}
