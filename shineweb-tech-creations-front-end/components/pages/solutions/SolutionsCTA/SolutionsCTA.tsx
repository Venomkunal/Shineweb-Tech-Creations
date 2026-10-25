import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

import styles from "./SolutionsCTA.module.css";

const benefits = [
  "Discuss your technical requirements",
  "Explore suitable implementation options",
  "Request a tailored project quotation",
];

export default function SolutionsCTA() {
  return (
    <section
      className={styles.section}
      aria-labelledby="solutions-cta-heading"
    >
      <div className={styles.container}>
        <div className={styles.panel}>
          <div className={styles.backgroundGlow} />
          <div className={styles.gridPattern} />

          <div className={styles.content}>
            <span className={styles.eyebrow}>
              <span className={styles.dot} />
              LET'S BUILD THE RIGHT SOLUTION
            </span>

            <h2 id="solutions-cta-heading">
              Have a challenge?
              <br />
              <span>Let's solve it together.</span>
            </h2>

            <p className={styles.description}>
              Tell us what your business needs. We'll discuss your
              requirements and help you identify a practical
              technology solution.
            </p>

            <div className={styles.benefits}>
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className={styles.benefit}
                >
                  <CheckCircle2
                    size={17}
                    aria-hidden="true"
                  />

                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className={styles.actions}>
              <Link
                href="/contact"
                className={styles.primaryButton}
              >
                <MessageSquare
                  size={17}
                  aria-hidden="true"
                />

                Discuss Your Requirements

                <ArrowUpRight
                  size={17}
                  aria-hidden="true"
                />
              </Link>

              <Link
                href="/products"
                className={styles.secondaryButton}
              >
                Explore Products

                <ArrowRight
                  size={17}
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div className={styles.trust}>
              <ShieldCheck
                size={17}
                aria-hidden="true"
              />

              <span>
                Clear scope. Practical recommendations. Agreed
                deliverables.
              </span>
            </div>
          </div>

          <div
            className={styles.visual}
            aria-hidden="true"
          >
            <div className={styles.visualOrbit} />

            <div className={styles.visualCore}>
              <div className={styles.coreIcon}>
                <MessageSquare
                  size={36}
                  strokeWidth={1.5}
                />
              </div>

              <span className={styles.coreTitle}>
                YOUR BUSINESS
              </span>

              <span className={styles.coreSubtitle}>
                Our focus
              </span>
            </div>

            <div className={`${styles.visualNode} ${styles.nodeTop}`}>
              <CheckCircle2 size={17} />
              <span>Understand</span>
            </div>

            <div
              className={`${styles.visualNode} ${styles.nodeRight}`}
            >
              <ShieldCheck size={17} />
              <span>Secure</span>
            </div>

            <div
              className={`${styles.visualNode} ${styles.nodeBottom}`}
            >
              <ArrowUpRight size={17} />
              <span>Grow</span>
            </div>
          </div>
        </div>

        <div className={styles.bottomNote}>
          <span>
            Not sure where to start? Begin with a conversation.
          </span>

          <Link href="/contact">
            Contact Shineweb
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}