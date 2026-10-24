import type { Metadata } from "next";

import ServicesHero from "@/components/pages/services/ServicesHero/ServicesHero";
import ServicesOverview from "@/components/pages/services/ServicesOverview/ServicesOverview";
import ServicesCatalogue from "@/components/pages/services/ServicesCatalogue/ServicesCatalogue";
import WhyChooseUs from "@/components/pages/services/WhyChooseUs/WhyChooseUs";
import OurProcess from "@/components/pages/services/OurProcess/OurProcess";
import ServicesCTA from "@/components/pages/services/ServicesCTA/ServicesCTA";

export const metadata: Metadata = {
  title: "Our Services | Shineweb Tech Creations",
  description:
    "Explore web development, custom software, networking, server and cloud solutions, cybersecurity, IT administration, and SEO services from Shineweb Tech Creations.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Technology Services | Shineweb Tech Creations",
    description:
      "Practical digital solutions, software development, IT infrastructure, and technical support for businesses.",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <ServicesOverview />
      <ServicesCatalogue />
      <WhyChooseUs />
      <OurProcess />
      <ServicesCTA />
    </main>
  );
}