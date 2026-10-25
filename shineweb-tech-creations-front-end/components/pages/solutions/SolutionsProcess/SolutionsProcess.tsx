import {
  ArrowDownRight,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Headset,
  Rocket,
  Workflow,
} from "lucide-react";

import styles from "./SolutionsProcess.module.css";

const steps = [
  {
    number: "01",
    title: "Discover",
    subtitle: "Understand the challenge",
    description:
      "We discuss your business objectives, existing systems, technical challenges, requirements, and budget.",
    icon: ClipboardList,
    deliverables: [
      "Requirements discussion",
      "Initial scope definition",
    ],
  },
  {
    number: "02",
    title: "Design",
    subtitle: "Plan the right solution",
    description:
      "We identify suitable technologies, outline the proposed architecture, and define the implementation approach.",
    icon: Workflow,
    deliverables: [
      "Technical approach",
      "Proposal and quotation",
    ],
  },
  {
    number: "03",
    title: "Implement",
    subtitle: "Build and deploy",
    description:
      "We develop, configure, integrate, and test the agreed solution before deployment and handover.",
    icon: Rocket,
    deliverables: [
      "Implementation and testing",
      "Deployment and handover",
    ],
  },
  {
    number: "04",
    title: "Support",
    subtitle: "Keep moving forward",
    description:
      "We provide agreed maintenance, troubleshooting, and technical support to help keep your systems running.",
    icon: Headset,
    deliverables: [
      "Technical assistance",
      "Maintenance as agreed",
    ],
  },
];

export default function SolutionsProcess() {
  return (
    <section
      className={styles.section}
      aria-labelledby="process-heading"
    >
      <div className={styles.container}>
        <div className={styles.heading}>
          <div className={styles.headingContent}>
            <span className={styles.eyebrow}>
              <span className={styles.dot} />
              HOW WE WORK
            </span>

            <h2 id="process-heading">
              From your first idea
              <br />
              <span>to a working solution.</span>
            </h2>
          </div>

          <p className={styles.intro}>
            A clear, collaborative process keeps your requirements,
            project scope, and technical implementation aligned
            throughout the engagement.
          </p>
        </div>

        <div className={styles.processLine}>
          <span>YOUR PROJECT JOURNEY</span>

          <ArrowDownRight
            size={19}
            aria-hidden="true"
          />
        </div>

        <div className={styles.steps}>
          {steps.map(
            (
              {
                number,
                title,
                subtitle,
                description,
                icon: Icon,
                deliverables,
              },
              index,
            ) => (
              <article
                key={number}
                className={styles.step}
              >
                <div className={styles.stepTop}>
                  <div className={styles.iconBox}>
                    <Icon
                      size={24}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </div>

                  <span className={styles.number}>
                    {number}
                  </span>
                </div>

                <span className={styles.stepLabel}>
                  PHASE {number}
                </span>

                <h3>{title}</h3>

                <span className={styles.subtitle}>
                  {subtitle}
                </span>

                <p className={styles.description}>
                  {description}
                </p>

                <div className={styles.deliverables}>
                  {deliverables.map((item) => (
                    <div
                      key={item}
                      className={styles.deliverable}
                    >
                      <CheckCircle2
                        size={15}
                        aria-hidden="true"
                      />

                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {index < steps.length - 1 && (
                  <ArrowRight
                    className={styles.connector}
                    size={19}
                    aria-hidden="true"
                  />
                )}
              </article>
            ),
          )}
        </div>

        <div className={styles.bottomNote}>
          <span className={styles.noteIndicator} />

          <p>
            Every engagement starts with understanding your
            requirements. The exact scope, deliverables, and
            support arrangements are agreed before implementation.
          </p>
        </div>
      </div>
    </section>
  );
}