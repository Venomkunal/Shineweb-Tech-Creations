"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Code2,
  Database,
  Globe2,
  Laptop,
  Network,
  Search,
  Server,
  ShieldCheck,
  Smartphone,
  Workflow,
} from "lucide-react";
import styles from "./ServicesCatalogue.module.css";

const categories = [
  "All Services",
  "Development",
  "IT Infrastructure",
  "Growth & Support",
] as const;

type Category = (typeof categories)[number];

const services = [
  {
    id: "web",
    category: "Development",
    icon: Globe2,
    title: "Web Design & Development",
    description:
      "Fast, responsive, and professional websites designed to represent your business and convert visitors into customers.",
    features: [
      "Business and corporate websites",
      "E-commerce development",
      "SEO-friendly architecture",
    ],
  },
  {
    id: "software",
    category: "Development",
    icon: Code2,
    title: "Custom Software Development",
    description:
      "Purpose-built applications that streamline operations, automate workflows, and support business growth.",
    features: [
      "Business management systems",
      "Dashboards and reporting",
      "API and system integrations",
    ],
  },
  {
    id: "mobile",
    category: "Development",
    icon: Smartphone,
    title: "Application Development",
    description:
      "Practical application experiences built around your users, operational requirements, and business processes.",
    features: [
      "Application UI and UX",
      "Responsive web applications",
      "Cross-platform solutions",
    ],
  },
  {
    id: "network",
    category: "IT Infrastructure",
    icon: Network,
    title: "Networking & Infrastructure",
    description:
      "Reliable network infrastructure planned for secure connectivity, manageable operations, and future expansion.",
    features: [
      "LAN, WAN, and Wi-Fi deployment",
      "Switching and firewall setup",
      "Network troubleshooting",
    ],
  },
  {
    id: "server",
    category: "IT Infrastructure",
    icon: Server,
    title: "Server & Cloud Solutions",
    description:
      "Server configuration, deployment, hosting, and infrastructure support for business applications and services.",
    features: [
      "Server setup and configuration",
      "Hosting and deployment",
      "Backup and recovery planning",
    ],
  },
  {
    id: "hardware",
    category: "IT Infrastructure",
    icon: Laptop,
    title: "Hardware & Software Solutions",
    description:
      "Technology procurement assistance and deployment services matched to your organisation's requirements.",
    features: [
      "Desktop and laptop solutions",
      "Business software procurement",
      "Installation and configuration",
    ],
  },
  {
    id: "security",
    category: "Growth & Support",
    icon: ShieldCheck,
    title: "Cybersecurity & IT Administration",
    description:
      "Improve your IT environment through access controls, system hardening, endpoint policies, and security reviews.",
    features: [
      "Security configuration",
      "Endpoint and access policies",
      "IT administration support",
    ],
  },
  {
    id: "seo",
    category: "Growth & Support",
    icon: Search,
    title: "SEO & Digital Marketing",
    description:
      "Improve your online visibility through technical SEO, search optimisation, and a stronger digital presence.",
    features: [
      "Technical and on-page SEO",
      "Local SEO optimisation",
      "Digital presence improvements",
    ],
  },
];

type Service = (typeof services)[number];

export default function ServicesCatalogue() {
  const [activeCategory, setActiveCategory] =
    useState<Category>("All Services");

  const filteredServices: Service[] =
    activeCategory === "All Services"
      ? services
      : services.filter(
          (service) => service.category === activeCategory
        );

  return (
    <section className={styles.section} id="services">
      <div className={styles.container}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>Our capabilities</span>
          <h2>
            Technology services,
            <span> thoughtfully delivered.</span>
          </h2>
          <p>
            Explore our service portfolio and find the right
            combination of technology, infrastructure, and support
            for your business.
          </p>
        </div>

        <div
          className={styles.filters}
          role="group"
          aria-label="Filter services by category"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`${styles.filter} ${
                activeCategory === category ? styles.activeFilter : ""
              }`}
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.grid} aria-live="polite">
          {filteredServices.map((service) => {
            const Icon = service.icon;

            return (
              <article className={styles.card} key={service.id}>
                <div className={styles.cardHeader}>
                  <div className={styles.icon}>
                    <Icon size={24} strokeWidth={1.7} />
                  </div>

                  <span className={styles.category}>
                    {service.category}
                  </span>
                </div>

                <h3>{service.title}</h3>
                <p className={styles.description}>
                  {service.description}
                </p>

                <ul className={styles.features}>
                  {service.features.map((feature) => (
                    <li key={feature}>
                      <Check size={15} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/contact?service=${service.id}`}
                  className={styles.link}
                  aria-label={`Enquire about ${service.title}`}
                >
                  Discuss this service
                  <ArrowUpRight size={17} />
                </Link>
              </article>
            );
          })}
        </div>

        <div className={styles.bottomNote}>
          <Database size={19} />
          <p>
            Need a combination of services? We can discuss a solution
            tailored to your requirements.
          </p>
          <Workflow size={19} />
        </div>
      </div>
    </section>
  );
}