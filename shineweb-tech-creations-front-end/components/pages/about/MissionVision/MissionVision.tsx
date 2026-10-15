
import {
  ArrowUpRight,
  Eye,
  HeartHandshake,
  Target,
  Zap,
} from "lucide-react";

import styles from "./MissionVision.module.css";

const principles = [
  {
    number: "01",
    title: "Our Mission",
    label: "WHY WE EXIST",
    description:
      "To empower businesses with reliable, innovative, and scalable technology solutions that simplify operations, strengthen digital presence, and create meaningful growth.",
    icon: Target,
    className: "mission",
    highlights: ["Smart solutions", "Business growth", "Reliable technology"],
  },
  {
    number: "02",
    title: "Our Vision",
    label: "WHERE WE ARE GOING",
    description:
      "To become a trusted technology partner for businesses by making digital transformation accessible, building future-ready solutions, and shaping a smarter connected world.",
    icon: Eye,
    className: "vision",
    highlights: [
      "Digital transformation",
      "Future-ready systems",
      "Lasting partnerships",
    ],
  },
  {
    number: "03",
    title: "Our Values",
    label: "WHAT GUIDES US",
    description:
      "We believe in building lasting relationships through integrity, continuous innovation, technical excellence, and a commitment to delivering real value to every client.",
    icon: HeartHandshake,
    className: "values",
    highlights: ["Integrity first", "Quality delivery", "Client success"],
  },
];

export default function AboutMissionVision() {
  return (
    <section className={styles.section} aria-labelledby="mission-vision-title">
      <div className={styles.backgroundGrid} aria-hidden="true" />
      <div className={styles.glowOne} aria-hidden="true" />
      <div className={styles.glowTwo} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <Zap size={15} aria-hidden="true" />
            <span>OUR PURPOSE & PRINCIPLES</span>
          </div>

          <h2 id="mission-vision-title" className={styles.heading}>
            Technology with
            <br />
            <span>Purpose. Vision. Impact.</span>
          </h2>

          <p className={styles.intro}>
            At Shineweb Tech Creations, we combine technology, creativity,
            and strategic thinking to help businesses move forward with
            confidence.
          </p>
        </div>

        <div className={styles.cardGrid}>
          {principles.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.number}
                className={`${styles.card} ${styles[item.className]}`}
              >
                <div className={styles.cardTop}>
                  <span className={styles.cardNumber}>{item.number}</span>

                  <div className={styles.iconBox}>
                    <Icon size={25} strokeWidth={1.7} />
                  </div>
                </div>

                <span className={styles.cardLabel}>{item.label}</span>

                <h3 className={styles.cardTitle}>{item.title}</h3>

                <p className={styles.cardDescription}>
                  {item.description}
                </p>

                <div className={styles.cardDivider} />

                <ul className={styles.highlights}>
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>
                      <span className={styles.check} aria-hidden="true">
                        <ArrowUpRight size={13} />
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className={styles.cardDecoration} aria-hidden="true" />
              </article>
            );
          })}
        </div>

        <div className={styles.bottomNote}>
          <span className={styles.statusDot} />
          <p>
            <strong>Built on trust.</strong> Driven by innovation. Focused
            on your success.
          </p>
        </div>
      </div>
    </section>
  );
}
