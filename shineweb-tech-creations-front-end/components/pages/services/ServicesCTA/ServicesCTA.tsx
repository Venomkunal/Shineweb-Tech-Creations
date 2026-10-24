import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import styles from "./ServicesCTA.module.css";

export default function ServicesCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.glow} aria-hidden="true" />

          <div className={styles.content}>
            <span className={styles.eyebrow}>
              <Sparkles size={15} />
              Let's build something meaningful
            </span>

            <h2>
              Have a project in mind?
              <span> Let's make it happen.</span>
            </h2>

            <p>
              Tell us about your business, your requirements, and
              the challenges you want to solve. We'll discuss a
              suitable technical approach and the next steps.
            </p>

            <div className={styles.actions}>
              <Link href="/contact" className={styles.primaryButton}>
                Request a quotation
                <ArrowRight size={18} />
              </Link>

              <Link href="/contact" className={styles.secondaryButton}>
                <MessageCircle size={17} />
                Talk to our team
              </Link>
            </div>

            <span className={styles.note}>
              Clear requirements. Practical solutions. Defined scope.
            </span>
          </div>

          <div className={styles.visual} aria-hidden="true">
            <div className={`${styles.ring} ${styles.ringOne}`} />
            <div className={`${styles.ring} ${styles.ringTwo}`} />
            <div className={styles.centerIcon}>
              <Sparkles size={43} />
            </div>
            <span className={`${styles.dot} ${styles.dotOne}`} />
            <span className={`${styles.dot} ${styles.dotTwo}`} />
            <span className={`${styles.dot} ${styles.dotThree}`} />
          </div>
        </div>
      </div>
    </section>
  );
}