import type { Metadata } from "next";

import ContactHero from "@/components/pages/contact/ContactHero/ContactHero";
import ContactChannels from "@/components/pages/contact/ContactChannels/ContactChannels";
import ContactForm from "@/components/pages/contact/ContactForm/ContactForm";
import ContactLocation from "@/components/pages/contact/ContactLocation/ContactLocation";
import ContactFAQ from "@/components/pages/contact/ContactFAQ/ContactFAQ";
import ContactCTA from "@/components/pages/contact/ContactCTA/ContactCTA";

export const metadata: Metadata = {
  title: "Contact Us | Shineweb Tech Creations",
  description:
    "Contact Shineweb Tech Creations in Guwahati, Assam, for web development, software solutions, SEO, IT infrastructure, and business technology services.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactChannels />

      <ContactForm />

      <ContactLocation />
      <ContactFAQ />
      <ContactCTA />
    </main>
  );
}