import {
  BadgeCheck,
  Boxes,
  Headset,
  Settings2,
} from "lucide-react";
import styles from "./WhyChooseUs.module.css";

const benefits = [
  {
    icon: Settings2,
    title: "Solutions built around you",
    description:
      "We align technology choices with your actual requirements, workflows, and business objectives.",
  },
  {
    icon: Boxes,
    title: "Connected technical expertise",
    description:
      "Bring development, infrastructure, deployment, and support together through one technology partner.",
  },
  {
    icon: BadgeCheck,
    title: "Quality-focused delivery",
    description:
      "We prioritise maintainability, usability, dependable configuration, and clear project scope.",
  },
  {
    icon: Headset,
    title: "Support beyond delivery",
    description:
      "Discuss maintenance, troubleshooting, upgrades, and ongoing improvements as your needs evolve.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <span className={styles.eyebrow}>Why Shineweb</span>
          <h2>
            A technology partner
            <span> focused on your progress.</span>
          </h2>
          <p>
            Technology should solve problems, simplify work, and create
            opportunities. We focus on practical solutions that serve
            your business today and provide room to grow tomorrow.
          </p>
        </div>

        <div className={styles.grid}>
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <article className={styles.item} key={benefit.title}>
                <div className={styles.icon}>
                  <Icon size={23} />
                </div>

                <div className={styles.itemContent}>
                  <span className={styles.number}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}