import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  CircleHelp,
  Code2,
  Home,
  Layers3,
  Mail,
  Package,
  ShieldCheck,
  ShoppingBag,
  Users,
} from "lucide-react";

import styles from "./Sitemap.module.css";

export const metadata: Metadata = {
  title: "Sitemap | Shineweb Tech Creations",
  description:
    "Explore the Shineweb Tech Creations website, including our services, products, industry solutions, company information, and contact details.",
  alternates: {
    canonical: "/sitemap",
  },
};

const sitemapSections = [
  {
    title: "Main Pages",
    description: "Explore our website and learn about our company.",
    icon: Home,
    links: [
      { label: "Home", href: "/", description: "Visit our homepage." },
      {
        label: "About Us",
        href: "/about",
        description: "Learn about our company and values.",
      },
      {
        label: "Our Services",
        href: "/services",
        description: "Explore our technology services.",
      },
      {
        label: "Products",
        href: "/products",
        description: "Browse our product catalogue.",
      },
      {
        label: "Industry Solutions",
        href: "/solutions",
        description: "Discover solutions for different industries.",
      },
    ],
  },
  {
    title: "Services & Solutions",
    description: "Find the right technology services for your business.",
    icon: Code2,
    links: [
      {
        label: "Web Development",
        href: "/services/web-development",
        description: "Websites and web applications.",
      },
      {
        label: "Software Development",
        href: "/services/software-development",
        description: "Business software and custom applications.",
      },
      {
        label: "SEO & Digital Marketing",
        href: "/services/digital-marketing",
        description: "Improve online visibility and reach.",
      },
      {
        label: "UI/UX Design",
        href: "/services/ui-ux-design",
        description: "User-focused digital experiences.",
      },
      {
        label: "IT Infrastructure",
        href: "/services/it-infrastructure",
        description: "Networking, servers, and IT administration.",
      },
    ],
  },
  {
    title: "Resources",
    description: "Read our latest insights and helpful information.",
    icon: BookOpen,
    links: [
      {
        label: "Blog",
        href: "/blog",
        description: "Explore articles and technology insights.",
      },
    ],
  },
  {
    title: "Company & Support",
    description: "Connect with our team and access your account.",
    icon: Building2,
    links: [
      {
        label: "Contact Us",
        href: "/contact",
        description: "Get in touch with our team.",
      },
      {
        label: "Login",
        href: "/login",
        description: "Access your customer account.",
      },
      {
        label: "Create an Account",
        href: "/signup",
        description: "Register for customer services.",
      },
    ],
  },
];

export default function SitemapPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroGlow} />

        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <ChevronRight size={15} aria-hidden="true" />
            <span>Sitemap</span>
          </div>

          <span className={styles.eyebrow}>
            <Layers3 size={15} aria-hidden="true" />
            WEBSITE DIRECTORY
          </span>

          <h1>
            Find your way
            <br />
            <span>around our website.</span>
          </h1>

          <p className={styles.heroDescription}>
            Everything you need to explore Shineweb Tech Creations, from
            technology services and products to company information and support.
          </p>

          <div className={styles.heroMeta}>
            <span>
              <ShieldCheck size={16} aria-hidden="true" />
              Easy navigation
            </span>
            <span>
              <Users size={16} aria-hidden="true" />
              Built for everyone
            </span>
          </div>
        </div>
      </section>

      <section className={styles.directory}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionEyebrow}>EXPLORE</span>
              <h2>Website directory</h2>
            </div>

            <p>
              Browse the main sections and find the information you need.
            </p>
          </div>

          <div className={styles.grid}>
            {sitemapSections.map((section, index) => {
              const Icon = section.icon;

              return (
                <article
                  className={styles.card}
                  key={section.title}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.iconBox}>
                      <Icon size={22} aria-hidden="true" />
                    </div>

                    <span className={styles.cardNumber}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3>{section.title}</h3>
                  <p className={styles.cardDescription}>
                    {section.description}
                  </p>

                  <div className={styles.linkList}>
                    {section.links.map((link) => (
                      <Link
                        className={styles.linkItem}
                        href={link.href}
                        key={link.href}
                      >
                        <span className={styles.linkText}>
                          <span className={styles.linkLabel}>
                            {link.label}
                          </span>
                          <span className={styles.linkDescription}>
                            {link.description}
                          </span>
                        </span>

                        <ArrowUpRight
                          className={styles.linkArrow}
                          size={17}
                          aria-hidden="true"
                        />
                      </Link>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaIcon}>
              <Mail size={25} aria-hidden="true" />
            </div>

            <div className={styles.ctaText}>
              <span>NEED ASSISTANCE?</span>
              <h2>Can't find what you're looking for?</h2>
              <p>
                Our team can help you find the right service or information.
              </p>
            </div>

            <Link href="/contact" className={styles.ctaButton}>
              Contact Us
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}