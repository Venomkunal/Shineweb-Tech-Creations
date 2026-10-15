
import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  HeartHandshake,
  Lightbulb,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react";

import styles from "./OurValues.module.css";

type Value = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  highlights: string[];
};

const values: Value[] = [
  {
    number: "01",
    title: "Integrity First",
    description:
      "We build lasting relationships through honest communication, transparent processes, and responsible technology decisions.",
    icon: ShieldCheck,
    accent: "cyan",
    highlights: ["Honest communication", "Responsible decisions"],
  },
  {
    number: "02",
    title: "Continuous Innovation",
    description:
      "We explore new ideas, modern technologies, and smarter approaches to help businesses stay competitive and ready for change.",
    icon: Lightbulb,
    accent: "blue",
    highlights: ["Modern technology", "Forward thinking"],
  },
  {
    number: "03",
    title: "Technical Excellence",
    description:
      "We focus on reliable engineering, thoughtful design, security, and performance in every solution we deliver.",
    icon: Code2,
    accent: "violet",
    highlights: ["Quality engineering", "Security by design"],
  },
  {
    number: "04",
    title: "Customer Success",
    description:
      "We put our clients' goals at the centre of our work, creating practical solutions that address real business challenges.",
    icon: HeartHandshake,
    accent: "green",
    highlights: ["Client-first approach", "Measurable value"],
  },
  {
    number: "05",
    title: "Transparency",
    description:
      "We believe strong partnerships grow through clear expectations, open communication, and accountability at every stage.",
    icon: CheckCircle2,
    accent: "orange",
    highlights: ["Clear expectations", "Accountability"],
  },
  {
    number: "06",
    title: "Always Improving",
    description:
      "We learn from every project, refine our processes, and continuously improve the way we design, develop, and support.",
    icon: RefreshCw,
    accent: "pink",
    highlights: ["Continuous learning", "Better outcomes"],
  },
];

export default function OurValues() {
  return (
    <section
      className={styles.section}
      id="our-values"
      aria-labelledby="our-values-title"
    >
      <div className={styles.backgroundGrid} aria-hidden="true" />
      <div className={styles.glowOne} aria-hidden="true" />
      <div className={styles.glowTwo} aria-hidden="true" />

      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIcon}>
              <Sparkles size={15} />
            </span>
            <span>What Guides Us</span>
          </div>

          <h2 className={styles.heading} id="our-values-title">
            Principles that
            <br />
            <span>power our purpose.</span>
          </h2>

          <p className={styles.intro}>
            Our values shape every decision, every partnership, and every
            solution we create. They keep us focused on building technology
            that makes a meaningful difference.
          </p>
        </header>

        <div className={styles.valuesGrid}>
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <article
                className={`${styles.card} ${styles[value.accent]}`}
                key={value.number}
              >
                <div className={styles.cardTop}>
                  <span className={styles.number}>{value.number}</span>

                  <span className={styles.cardIcon}>
                    <Icon size={23} strokeWidth={1.7} />
                  </span>

                  <ArrowUpRight
                    className={styles.arrow}
                    size={19}
                    aria-hidden="true"
                  />
                </div>

                <div className={styles.cardContent}>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>

                <div className={styles.cardFooter}>
                  {value.highlights.map((highlight) => (
                    <span className={styles.highlight} key={highlight}>
                      <span className={styles.highlightDot} />
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className={styles.cardShine} aria-hidden="true" />
              </article>
            );
          })}
        </div>

        <div className={styles.bottomPanel}>
          <div className={styles.bottomIcon}>
            <Target size={24} strokeWidth={1.7} />
          </div>

          <div className={styles.bottomText}>
            <h3>Technology with purpose. Partnerships with trust.</h3>
            <p>
              We bring our values to life through the quality of our work and
              the relationships we build.
            </p>
          </div>

          <a href="/contact" className={styles.bottomLink}>
            Let&apos;s work together
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
