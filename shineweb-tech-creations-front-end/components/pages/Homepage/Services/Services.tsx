
import Link from "next/link";
import styles from "./Services.module.css";

const services = [
  {
    number: "01",
    icon: "hardware",
    title: "IT Hardware Supply",
    description:
      "Laptops, desktops, servers, workstations and enterprise IT equipment.",
    tags: ["Business PCs", "Servers"],
    href: "/services/it-hardware",
    color: "cyan",
  },
  {
    number: "02",
    icon: "licensing",
    title: "Software Licensing",
    description:
      "Genuine software licenses, Microsoft 365, Windows and business applications.",
    tags: ["Microsoft 365", "Licensing"],
    href: "/services/software-licensing",
    color: "blue",
  },
  {
    number: "03",
    icon: "web",
    title: "Web Development",
    description:
      "Modern, responsive websites and e-commerce experiences built for growth.",
    tags: ["Business Websites", "E-commerce"],
    href: "/services/web-development",
    color: "purple",
  },
  {
    number: "04",
    icon: "software",
    title: "Software Development",
    description:
      "Custom business applications, management systems and workflow automation.",
    tags: ["Custom Software", "Automation"],
    href: "/services/software-development",
    color: "pink",
  },
  {
    number: "05",
    icon: "network",
    title: "Networking & Infrastructure",
    description:
      "Enterprise networking, structured cabling, Wi-Fi and network configuration.",
    tags: ["LAN / WAN", "Infrastructure"],
    href: "/services/networking",
    color: "green",
  },
  {
    number: "06",
    icon: "security",
    title: "Cybersecurity & Cloud",
    description:
      "Firewall deployment, endpoint security, cloud solutions and data protection.",
    tags: ["Network Security", "Cloud"],
    href: "/services/cybersecurity",
    color: "orange",
  },
];

function ServiceIcon({ name }: { name: string }) {
  const common = {
    width: 27,
    height: 27,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "hardware":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M8 20h8M12 16v4M7 8h10M7 11h6" />
        </svg>
      );

    case "licensing":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 8h8M8 12h8M8 16h4" />
          <path d="m15 16 1.5 1.5L20 14" />
        </svg>
      );

    case "web":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18M7 6.5h.01M10 6.5h.01M8 13l-2 2 2 2M16 13l2 2-2 2M14 12l-4 6" />
        </svg>
      );

    case "software":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="m9 9-3 3 3 3M15 9l3 3-3 3M13 8l-2 8" />
        </svg>
      );

    case "network":
      return (
        <svg {...common}>
          <circle cx="12" cy="5" r="2.5" />
          <circle cx="5" cy="18" r="2.5" />
          <circle cx="19" cy="18" r="2.5" />
          <path d="M12 7.5v4M5 15.5v-4h14v4M12 11.5 5 15.5M12 11.5l7 4" />
        </svg>
      );

    default:
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
  }
}

export default function Services() {
  return (
    <section
      className={styles.services}
      id="services"
      aria-labelledby="services-heading"
    >
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              WHAT WE DO
            </span>

            <h2 id="services-heading" className={styles.heading}>
              Complete IT Solutions
              <span> for Your Business</span>
            </h2>

            <p className={styles.description}>
              From hardware and software licensing to networking,
              cybersecurity and custom development, we deliver end-to-end
              technology solutions that help your business grow.
            </p>

            <div className={styles.highlights}>
              <div className={styles.highlight}>
                <span className={styles.check}>✓</span>
                Genuine Products
              </div>
              <div className={styles.highlight}>
                <span className={styles.check}>✓</span>
                Expert Technical Team
              </div>
              <div className={styles.highlight}>
                <span className={styles.check}>✓</span>
                Business-Focused Solutions
              </div>
            </div>

            <Link href="/services" className={styles.viewAll}>
              Explore All Services
              <span aria-hidden="true">↗</span>
            </Link>

            <div className={styles.availability}>
              <span className={styles.availabilityDot} />
              <span>Technology partner for your next big idea.</span>
            </div>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <Link
                href={service.href}
                className={`${styles.card} ${styles[service.color]}`}
                key={service.number}
              >
                <div className={styles.cardTop}>
                  <span className={styles.iconBox}>
                    <ServiceIcon name={service.icon} />
                  </span>

                  <span className={styles.cardNumber}>
                    {service.number}
                  </span>
                </div>

                <h3 className={styles.cardTitle}>{service.title}</h3>

                <p className={styles.cardDescription}>
                  {service.description}
                </p>

                <div className={styles.tags}>
                  {service.tags.map((tag) => (
                    <span className={styles.tag} key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={styles.cardFooter}>
                  <span>Explore service</span>
                  <span className={styles.arrow} aria-hidden="true">
                    ↗
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
