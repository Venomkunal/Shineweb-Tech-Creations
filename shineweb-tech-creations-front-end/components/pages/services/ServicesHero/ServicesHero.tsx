import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import styles from "./ServicesHero.module.css";

export default function ServicesHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.grid} />
      <div className={styles.glow} />

      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>
            <Sparkles size={15} />
            Technology that moves business forward
          </span>

          <h1>
            Digital solutions.
            <br />
            <span>Built for what&apos;s next.</span>
          </h1>

          <p className={styles.description}>
            From high-performance websites and custom software to
            networking, infrastructure, and IT support, we help
            businesses build a stronger digital foundation.
          </p>

          <div className={styles.actions}>
            <Link href="/contact" className={styles.primaryButton}>
              Discuss your project
              <ArrowRight size={18} />
            </Link>

            <Link href="#services" className={styles.secondaryButton}>
              Explore services
              <ArrowDown size={17} />
            </Link>
          </div>

          <div className={styles.highlights}>
            <div>
              <Code2 size={19} />
              <span>Digital development</span>
            </div>
            <div>
              <Network size={19} />
              <span>IT infrastructure</span>
            </div>
            <div>
              <ShieldCheck size={19} />
              <span>Business-focused solutions</span>
            </div>
          </div>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <div className={`${styles.orbit} ${styles.orbitOne}`} />
          <div className={`${styles.orbit} ${styles.orbitTwo}`} />

          <div className={styles.core}>
            <div className={styles.coreInner}>
              <span className={styles.coreLabel}>SHINEWEB</span>
              <span className={styles.coreMark}><Image
              src="/logo.svg"
              alt="Shineweb Tech Creations"
              width={90}
              height={90}
              priority
              className={styles.brandLogo}
            /></span>
              <span className={styles.coreCaption}>
                Technology ecosystem
              </span>
            </div>
          </div>

          <div className={`${styles.node} ${styles.nodeTop}`}>
            <Code2 size={22} />
          </div>

          <div className={`${styles.node} ${styles.nodeRight}`}>
            <Network size={22} />
          </div>

          <div className={`${styles.node} ${styles.nodeBottom}`}>
            <ShieldCheck size={22} />
          </div>

          <div className={`${styles.node} ${styles.nodeLeft}`}>
            <Sparkles size={22} />
          </div>

          <div className={styles.floatingLabel}>
            <span className={styles.statusDot} />
            Digital transformation
            <ArrowUpRight size={16} />
          </div>
        </div>
      </div>

      <div className={styles.bottomLine} />
    </section>
  );
}