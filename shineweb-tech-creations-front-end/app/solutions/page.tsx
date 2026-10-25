import type { Metadata } from "next";

import {
  SolutionsHero,
  SolutionsOverview,
  SolutionCategories,
  SolutionsProcess,
  SolutionsCTA,
} from "@/components/pages/solutions";

export const metadata: Metadata = {
  title: "Business & IT Solutions | Shineweb Tech Creations",

  description:
    "Discover industry-focused technology solutions from Shineweb Tech Creations, including healthcare, education, retail, corporate IT, software development, networking, cybersecurity, and cloud infrastructure.",

  alternates: {
    canonical: "/solutions",
  },

  openGraph: {
    title: "Business & IT Solutions | Shineweb Tech Creations",

    description:
      "Explore practical technology solutions for your business, from digital platforms to IT infrastructure and cybersecurity.",

    type: "website",
  },
};

export default function SolutionsPage() {
  return (
    <main>
      <SolutionsHero />

      <SolutionsOverview />

      <SolutionCategories />

      <SolutionsProcess />

      <SolutionsCTA />
    </main>
  );
}