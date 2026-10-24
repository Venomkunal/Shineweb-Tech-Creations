import {
  Code2,
  Globe2,
  Network,
  ShieldCheck,
} from "lucide-react";
import styles from "./ServicesOverview.module.css";

const areas = [
  {
    number: "01",
    icon: Globe2,
    title: "Digital experiences",
    description:
      "Business websites, e-commerce experiences, responsive interfaces, and digital brand presence.",
  },
  {
    number: "02",
    icon: Code2,
    title: "Software solutions",
    description:
      "Custom business applications, workflow systems, dashboards, APIs, and system integrations.",
  },
  {
    number: "03",
    icon: Network,
    title: "Infrastructure & IT",
    description:
      "Network design, server deployment, hardware supply, configuration, and IT administration.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Security & growth",
    description:
      "Security improvements, technical maintenance, search optimisation, and ongoing support.",
  },
];

export default function ServicesOverview() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>What we do</span>
          <h2>
            Everything your business needs
            <span> to move forward.</span>
          </h2>
          <p>
            A connected range of technology services designed around
            your goals, your operations, and your next stage of growth.
          </p>
        </div>

        <div className={styles.grid}>
          {areas.map((area) => {
            const Icon = area.icon;

            return (
              <article className={styles.card} key={area.number}>
                <div className={styles.cardTop}>
                  <span className={styles.number}>{area.number}</span>
                  <div className={styles.icon}>
                    <Icon size={23} strokeWidth={1.7} />
                  </div>
                </div>

                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}