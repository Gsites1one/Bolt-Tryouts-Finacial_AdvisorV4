import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

/**
 * Contact page shell (M1).
 * Full split layout with form + booking placeholder ships in M7.
 */
export function Contact() {
  return (
    <>
      <Navbar />
      <main>
        <section className="section container-page pt-32">
          <p className="eyebrow mb-6">Contact</p>
          <h1 className="heading-section max-w-3xl">
            Let's talk about your next thirty years.
          </h1>
          <p className="mt-6 max-w-xl text-lead">
            Form and booking widget will ship in M7. For now this is a shell to
            verify routing works.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
