
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  Sparkles,
  Code2,
  ShieldCheck,
  Network,
} from "lucide-react";

import styles from "./BlogCTA.module.css";

const capabilities = [
  {
    icon: Code2,
    label: "Web & Software",
  },
  {
    icon: ShieldCheck,
    label: "Cybersecurity",
  },
  {
    icon: Network,
    label: "IT Infrastructure",
  },
];

export default function BlogCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.backgroundGrid} aria-hidden="true" />
        <div className={styles.glowOne} aria-hidden="true" />
        <div className={styles.glowTwo} aria-hidden="true" />

        <div className={styles.content}>
          <span className={styles.eyebrow}>
            <Sparkles size={15} />
            Have a project in mind?
          </span>

          <h2 className={styles.title}>
            Turn your next
            <br />
            big idea into <span>reality.</span>
          </h2>

          <p className={styles.description}>
            From building a powerful digital presence to strengthening your
            IT infrastructure, let&apos;s create technology that moves your
            business forward.
          </p>

          <div className={styles.actions}>
            <Link href="/contact" className={styles.primaryButton}>
              <MessageCircle size={18} />
              Discuss Your Project
              <ArrowRight size={17} />
            </Link>

            <Link href="/services" className={styles.secondaryButton}>
              Explore Our Services
              <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className={styles.capabilities}>
            {capabilities.map(({ icon: Icon, label }) => (
              <div className={styles.capability} key={label}>
                <span className={styles.capabilityIcon}>
                  <Icon size={15} />
                </span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <div className={`${styles.orbit} ${styles.orbitOuter}`}>
            <span className={`${styles.orbitNode} ${styles.nodeTop}`} />
            <span className={`${styles.orbitNode} ${styles.nodeRight}`} />
            <span className={`${styles.orbitNode} ${styles.nodeBottom}`} />
            <span className={`${styles.orbitNode} ${styles.nodeLeft}`} />
          </div>

          <div className={`${styles.orbit} ${styles.orbitInner}`} />

          <div className={styles.centralCard}>
            <div className={styles.centralIcon}>
              <Sparkles size={30} />
            </div>

            <span className={styles.centralLabel}>
              YOUR NEXT CHAPTER
            </span>

            <div className={styles.centralLine} />
            <div className={`${styles.centralLine} ${styles.lineShort}`} />

            <div className={styles.centralFooter}>
              <span className={styles.statusDot} />
              Built around your goals
            </div>
          </div>

          <div className={styles.floatingCard}>
            <span className={styles.floatingIcon}>
              <Code2 size={17} />
            </span>

            <span>
              <strong>Digital solutions</strong>
              <small>Made for your business</small>
            </span>
          </div>

          <div className={styles.floatingBadge}>
            <span className={styles.badgeDot} />
            Let&apos;s build something great
          </div>
        </div>

        <div className={styles.bottomLine}>
          <span>Shineweb Tech Creations</span>
          <span className={styles.bottomDivider} />
          <span>Ideas into impact.</span>
        </div>
      </div>
    </section>
  );
}
