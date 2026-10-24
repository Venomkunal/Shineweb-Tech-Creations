import {
  ClipboardList,
  Code2,
  Rocket,
  Search,
  Wrench,
} from "lucide-react";
import styles from "./OurProcess.module.css";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discover",
    description:
      "Understand your goals, challenges, users, and technical requirements.",
  },
  {
    icon: ClipboardList,
    number: "02",
    title: "Plan",
    description:
      "Define the scope, solution architecture, milestones, and quotation.",
  },
  {
    icon: Code2,
    number: "03",
    title: "Build",
    description:
      "Develop, configure, and test the agreed solution with attention to quality.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Deploy",
    description:
      "Implement the solution and verify its readiness for practical use.",
  },
  {
    icon: Wrench,
    number: "05",
    title: "Support",
    description:
      "Discuss maintenance, improvements, and technical support after delivery.",
  },
];

export default function OurProcess() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>How we work</span>
          <h2>
            From first conversation
            <span> to implementation.</span>
          </h2>
          <p>
            A straightforward process designed to establish clarity,
            maintain alignment, and deliver a solution that fits.
          </p>
        </div>

        <div className={styles.steps}>
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article className={styles.step} key={step.number}>
                <div className={styles.stepTop}>
                  <span className={styles.number}>{step.number}</span>
                  <div className={styles.icon}>
                    <Icon size={22} />
                  </div>
                </div>

                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}