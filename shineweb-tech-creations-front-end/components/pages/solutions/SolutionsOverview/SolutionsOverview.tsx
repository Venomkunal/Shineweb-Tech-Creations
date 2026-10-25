import {
  ArrowUpRight,
  Blocks,
  Fingerprint,
  TrendingUp,
} from "lucide-react";

import styles from "./SolutionsOverview.module.css";

const advantages = [
  {
    number: "01",
    icon: Fingerprint,
    title: "Built Around Your Business",
    description:
      "Every business has different goals. We tailor our technology recommendations to your workflows, requirements, infrastructure, and budget.",
    label: "YOUR REQUIREMENTS FIRST",
  },
  {
    number: "02",
    icon: Blocks,
    title: "Connected Technology",
    description:
      "Bring software, networking, hardware, cybersecurity, and infrastructure together through a coordinated technology strategy.",
    label: "INTEGRATED SOLUTIONS",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Ready to Grow",
    description:
      "Build maintainable systems and scalable infrastructure that can adapt as your business, operations, and technical requirements evolve.",
    label: "DESIGNED FOR GROWTH",
  },
];

export default function SolutionsOverview() {
  return (
    <section
      className={styles.section}
      aria-labelledby="overview-heading"
    >
      <div className={styles.container}>
        <div className={styles.heading}>
          <div className={styles.headingContent}>
            <span className={styles.eyebrow}>
              <span className={styles.dot} />
              THE SHINEWEB APPROACH
            </span>

            <h2 id="overview-heading">
              Technology should solve problems.
              <br />
              <span>Not create new ones.</span>
            </h2>
          </div>

          <p className={styles.intro}>
            We help businesses make practical technology decisions.
            From digital platforms to IT infrastructure, our approach
            focuses on your actual requirements and long-term
            operational needs.
          </p>
        </div>

        <div className={styles.grid}>
          {advantages.map(
            ({
              number,
              icon: Icon,
              title,
              description,
              label,
            }) => (
              <article
                key={number}
                className={styles.card}
              >
                <div className={styles.cardTop}>
                  <div className={styles.iconBox}>
                    <Icon
                      size={25}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </div>

                  <span className={styles.number}>
                    {number}
                  </span>
                </div>

                <h3>{title}</h3>

                <p className={styles.description}>
                  {description}
                </p>

                <div className={styles.cardFooter}>
                  <span>{label}</span>

                  <ArrowUpRight
                    size={17}
                    aria-hidden="true"
                  />
                </div>
              </article>
            ),
          )}
        </div>

        <div className={styles.bottomNote}>
          <span className={styles.bottomDot} />

          <p>
            One technology partner. Solutions shaped around your
            business.
          </p>
        </div>
      </div>
    </section>
  );
}