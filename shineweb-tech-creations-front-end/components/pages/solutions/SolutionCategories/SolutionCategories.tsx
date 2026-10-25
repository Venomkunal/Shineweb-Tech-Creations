import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  GraduationCap,
  HeartPulse,
  MonitorCog,
  Network,
  Server,
  ShieldCheck,
  ShoppingBag,
  Workflow,
} from "lucide-react";

import styles from "./SolutionCategories.module.css";

const industries = [
  {
    number: "01",
    title: "Healthcare",
    description:
      "Digital experiences and IT systems for clinics, hospitals, diagnostic centres, and healthcare providers.",
    href: "/solutions/healthcare",
    icon: HeartPulse,
    tags: ["Healthcare Websites", "IT Infrastructure"],
  },
  {
    number: "02",
    title: "Education",
    description:
      "Websites, digital platforms, network infrastructure, and technology systems for educational institutions.",
    href: "/solutions/education",
    icon: GraduationCap,
    tags: ["Education Portals", "Campus Networks"],
  },
  {
    number: "03",
    title: "Retail & E-commerce",
    description:
      "Online stores, inventory systems, product catalogues, and connected technology for retail businesses.",
    href: "/solutions/retail-ecommerce",
    icon: ShoppingBag,
    tags: ["E-commerce", "Inventory Systems"],
  },
  {
    number: "04",
    title: "Corporate Offices",
    description:
      "Connected office environments with business software, networking, cybersecurity, and IT administration.",
    href: "/solutions/corporate-offices",
    icon: Building2,
    tags: ["Office Networking", "Business Systems"],
  },
  {
    number: "05",
    title: "Government & NGOs",
    description:
      "Accessible websites, dependable IT infrastructure, and practical digital solutions for public-service organisations.",
    href: "/solutions/government-ngos",
    icon: MonitorCog,
    tags: ["Digital Platforms", "IT Infrastructure"],
  },
];

const capabilities = [
  {
    title: "Web & Software Development",
    description:
      "Custom websites, web applications, customer portals, and software tailored to your business workflows.",
    icon: Workflow,
    href: "/services",
  },
  {
    title: "IT Infrastructure & Networking",
    description:
      "Business networks, managed switches, firewalls, connectivity, server deployment, and infrastructure planning.",
    icon: Network,
    href: "/services",
  },
  {
    title: "Cybersecurity & IT Administration",
    description:
      "Endpoint protection, access control, system hardening, device administration, and security-focused IT management.",
    icon: ShieldCheck,
    href: "/services",
  },
  {
    title: "Cloud, Hosting & Servers",
    description:
      "Application hosting, cloud deployments, server configuration, and infrastructure maintenance.",
    icon: Server,
    href: "/services",
  },
];

export default function SolutionCategories() {
  return (
    <section
      id="solution-categories"
      className={styles.section}
      aria-labelledby="solutions-heading"
    >
      <div className={styles.container}>
        {/* Section heading */}

        <div className={styles.heading}>
          <div className={styles.headingContent}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              INDUSTRY-FOCUSED TECHNOLOGY
            </span>

            <h2 id="solutions-heading" className={styles.title}>
              The right technology.
              <br />
              <span>Built for your industry.</span>
            </h2>
          </div>

          <p className={styles.intro}>
            Every industry has different challenges. We combine
            software, infrastructure, networking, and technical
            expertise to deliver solutions around your operational
            requirements.
          </p>
        </div>

        {/* Industry solutions */}

        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionEyebrow}>
              INDUSTRY SOLUTIONS
            </span>

            <h3 className={styles.sectionTitle}>
              Technology for the way you work.
            </h3>
          </div>

          <span className={styles.sectionCount}>
            05 INDUSTRIES
          </span>
        </div>

        <div className={styles.industryGrid}>
          {industries.map(
            ({
              number,
              title,
              description,
              href,
              icon: Icon,
              tags,
            }) => (
              <article
                key={href}
                className={styles.industryCard}
              >
                <div className={styles.cardTop}>
                  <div className={styles.iconBox}>
                    <Icon
                      size={25}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </div>

                  <span className={styles.cardNumber}>
                    {number}
                  </span>
                </div>

                <h4 className={styles.cardTitle}>
                  {title}
                </h4>

                <p className={styles.cardDescription}>
                  {description}
                </p>

                <div
                  className={styles.tags}
                  aria-label="Solution examples"
                >
                  {tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={href}
                  className={styles.cardLink}
                  aria-label={`Explore ${title} solutions`}
                >
                  <span>Explore solutions</span>

                  <ArrowUpRight
                    size={17}
                    aria-hidden="true"
                  />
                </Link>
              </article>
            ),
          )}
        </div>

        {/* All industries link */}

        <div className={styles.viewAll}>
          <div>
            <span className={styles.viewAllTitle}>
              Looking for a different solution?
            </span>

            <span className={styles.viewAllDescription}>
              Tell us about your industry and requirements.
            </span>
          </div>

          <Link
            href="/contact"
            className={styles.viewAllLink}
          >
            Discuss your requirements
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>

        {/* Technology capabilities */}

        <div className={styles.capabilitiesSection}>
          <div className={styles.capabilitiesHeading}>
            <div>
              <span className={styles.sectionEyebrow}>
                OUR TECHNOLOGY CAPABILITIES
              </span>

              <h3 className={styles.sectionTitle}>
                The technology behind every solution.
              </h3>
            </div>

            <p className={styles.capabilitiesIntro}>
              Combine the right technologies to build, connect,
              secure, and manage your business operations.
            </p>
          </div>

          <div className={styles.capabilitiesGrid}>
            {capabilities.map(
              ({ title, description, icon: Icon, href }) => (
                <article
                  key={title}
                  className={styles.capabilityCard}
                >
                  <div className={styles.capabilityIcon}>
                    <Icon
                      size={23}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </div>

                  <h4>{title}</h4>

                  <p>{description}</p>

                  <Link
                    href={href}
                    className={styles.capabilityLink}
                    aria-label={`Explore services for ${title}`}
                  >
                    Explore services
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}