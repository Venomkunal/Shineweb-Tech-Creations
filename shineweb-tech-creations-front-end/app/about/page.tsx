import type { Metadata } from "next";

import AboutHero from "@/components/pages/about/AboutHero/AboutHero";
import OurStory from "@/components/pages/about/OurStory/OurStory";
import MissionVision from "@/components/pages/about/MissionVision/MissionVision";
import AboutServices from "@/components/pages/about/AboutServices/AboutServices";
import OurValues from "@/components/pages/about/OurValues/OurValues";
import AboutCTA from "@/components/pages/about/AboutCTA/AboutCTA";

export const metadata: Metadata = {
  title: "About Us | Shineweb Tech Creations",
  description:
    "Discover the story, mission, vision, and values of Shineweb Tech Creations, delivering web development, software solutions, IT infrastructure, networking, and cybersecurity services.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <OurStory />
      <MissionVision />
      <AboutServices />
      <OurValues />
      <AboutCTA />
    </main>
  );
}