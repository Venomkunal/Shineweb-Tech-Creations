import Hero from "@/components/pages/Homepage/Hero/Hero";
import FeaturedProducts from "@/components/pages/Homepage/FeaturedProducts/FeaturedProducts";
import Services from "@/components/pages/Homepage/Services/Services";
import IndustrySolutions from "@/components/pages/Homepage/IndustrySolutions/IndustrySolutions";
import About from "@/components/pages/Homepage/Aboutus/Aboutus";
import RecentProjects from "@/components/pages/Homepage/RecentProjects/RecentProjects";
import Testimonials from "@/components/pages/Homepage/Testimonials/Testimonials";
import Partners from "@/components/pages/Homepage/Partners/Partners";
import Blog from "@/components/pages/Homepage/Blog/Blog";
import Contact from "@/components/pages/Homepage/Contact/Contact";


import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Shineweb Tech Creations | Next-Gen Technology Solutions",
  description:
    "Discover IT hardware, software licensing, networking, cybersecurity, cloud solutions, and web development from Shineweb Tech Creations.",
};

export default function HomePage() {
  return (
    <main>
      {/* Homepage sections will be added here */}

      <section id="home" aria-label="Welcome to Shineweb Tech Creations">
        {/* Hero component will go here */}
        <Hero />
      </section>

      <section id="featured-products">
        {/* Featured products component will go here */}
        <FeaturedProducts />
      </section>

      <section id="services">
        {/* Services component will go here */}
        <Services />
      </section>

      <section id="solutions">
        {/* Industry solutions component will go here */}
        <IndustrySolutions />
      </section>

      <section id="about">
        {/* About us component will go here */}
        <About />
      </section>

      <section id="projects">
        {/* Recent projects component will go here */}
        <RecentProjects />
      </section>

      <section id="testimonials">
        {/* Client testimonials component will go here */}
        <Testimonials />
      </section>

      <section id="partners">
        {/* Technology partners component will go here */}
        <Partners />
      </section>

      <section id="blog">
        {/* Latest blog posts component will go here */}
        <Blog />
      </section>

      <section id="contact">
        {/* Call-to-action component will go here */}
        <Contact />
      </section>
    </main>
  );
}
