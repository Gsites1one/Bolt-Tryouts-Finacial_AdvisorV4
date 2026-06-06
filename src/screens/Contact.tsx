import { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ContactHero } from "../components/sections/ContactHero";
import { ContactForm } from "../components/sections/ContactForm";
import { BookingPlaceholder } from "../components/sections/BookingPlaceholder";
import { ContactDetails } from "../components/sections/ContactDetails";

/**
 * Contact page.
 * Form wired to Web3Forms. Set VITE_WEB3FORMS_KEY in .env for real delivery;
 * without the key it runs in demo mode (simulated success).
 */
export function Contact() {
  const [preferredSlot, setPreferredSlot] = useState<string | null>(null);

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <ContactHero />

        <section className="pb-20 md:pb-28">
          <div className="container-page">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[7fr_5fr] lg:gap-8">
              <div>
                <ContactForm
                  preferredSlot={preferredSlot}
                  onClearSlot={() => setPreferredSlot(null)}
                />
              </div>
              <div className="space-y-6">
                <BookingPlaceholder onSlotConfirm={setPreferredSlot} />
                <ContactDetails />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
