
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  Code2,
  Cloud,
  Laptop,
  Network,
  Palette,
  Search,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import styles from "./AboutServices.module.css";

const services = [
  {
    number: "01",
    title: "Web Development",
    description:
      "Modern, responsive websites and web applications built to strengthen your digital presence and support business growth.",
    icon: Code2,
    tags: ["Business Websites", "Web Applications"],
  },
  {
    number: "02",
    title: "Software Development",
    description:
      "Custom software solutions designed around your workflows, business requirements, and operational goals.",
    icon: Workflow,
    tags: ["Custom Software", "Business Systems"],
  },
  {
    number: "03",
    title: "IT Infrastructure",
    description:
      "Reliable IT infrastructure, computer hardware, networking, server deployment, and technology support for businesses.",
    icon: Network,
    tags: ["Networking", "Server Setup"],
  },
  {
    number: "04",
    title: "UI/UX & Branding",
    description:
      "Intuitive user experiences and distinctive brand identities that help businesses communicate clearly and stand out.",
    icon: Palette,
    tags: ["UI/UX Design", "Brand Identity"],
  },
  {
    number: "05",
    title: "Cybersecurity & IT Support",
    description:
      "Practical security solutions, system configuration, access controls, and technical support to help protect your IT environment.",
    icon: ShieldCheck,
    tags: ["System Security", "IT Administration"],
  },
  {
    number: "06",
    title: "SEO & Digital Growth",
    description:
      "Search engine optimization and digital strategy to improve online visibility and connect your business with potential customers.",
    icon: Search,
    tags: ["SEO", "Online Visibility"],
  },
  {
    number: "07",
    title: "Cloud & Hosting",
    description:
      "Website hosting, cloud deployment, domain configuration, and server solutions to keep your digital services accessible.",
    icon: Cloud,
    tags: ["Web Hosting", "Cloud Deployment"],
  },
  {
    number: "08",
    title: "Hardware & Software Solutions",
    description:
      "Business computers, IT accessories, software solutions, and licensing support tailored to your organization's needs.",
    icon: Laptop,
    tags: ["IT Hardware", "Software Licensing"],
  },
];

export default function AboutServices() {
  return (
    <section
      className={styles.section}
      id="about-services"
      aria-labelledby="about-services-title"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headingContent}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              WHAT WE DO
            </span>

            <h2 id="about-services-title" className={styles.title}>
              Technology that moves
              <br />
              <span>your business forward.</span>
            </h2>

            <p className={styles.subtitle}>
              From digital experiences to dependable IT infrastructure, we
              bring technology, creativity, and practical expertise together
              to help businesses work smarter and grow confidently.
            </p>
          </div>

          <Link href="/services" className={styles.allServices}>
            Explore all services
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.grid}>
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article className={styles.card} key={service.number}>
                <div className={styles.cardTop}>
                  <div className={styles.iconBox}>
                    <Icon size={23} strokeWidth={1.7} aria-hidden="true" />
                  </div>

                  <span className={styles.number}>{service.number}</span>
                </div>

                <h3 className={styles.cardTitle}>{service.title}</h3>

                <p className={styles.description}>
                  {service.description}
                </p>

                <div className={styles.tags}>
                  {service.tags.map((tag) => (
                    <span className={styles.tag} key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={styles.cardBottom}>
                  <span className={styles.learnMore}>Our expertise</span>
                  <ArrowDownRight
                    className={styles.cardArrow}
                    size={19}
                    aria-hidden="true"
                  />
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles.bottomBanner}>
          <div className={styles.bannerIndicator}>
            <span className={styles.bannerDot} />
            <span>YOUR NEXT STEP STARTS HERE</span>
          </div>

          <div className={styles.bannerContent}>
            <div>
              <h3>Have a project in mind?</h3>
              <p>
                Let&apos;s find the right technology solution for your business.
              </p>
            </div>

            <Link href="/contact" className={styles.contactButton}>
              Let&apos;s talk
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
