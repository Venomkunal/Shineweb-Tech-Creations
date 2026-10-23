
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Code2,
  Layers3,
  Sparkles,
} from "lucide-react";

import styles from "./BlogHero.module.css";

const topics = [
  {
    label: "Web Development",
    icon: Code2,
  },
  {
    label: "Technology",
    icon: Layers3,
  },
  {
    label: "Digital Growth",
    icon: Sparkles,
  },
];

export default function BlogHero() {
  return (
    <section className={styles.hero}>
      {/* Background effects */}
      <div className={styles.gridBackground} aria-hidden="true" />
      <div className={styles.glowOne} aria-hidden="true" />
      <div className={styles.glowTwo} aria-hidden="true" />

      <div className={styles.container}>
        {/* Left content */}
        <div className={styles.content}>
          <nav
            className={styles.breadcrumb}
            aria-label="Breadcrumb"
          >
            <Link href="/">Home</Link>
            <span className={styles.breadcrumbDivider}>/</span>
            <span aria-current="page">Insights</span>
          </nav>

          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIcon}>
              <BookOpen size={15} />
            </span>

            <span>THE SHINEWEB JOURNAL</span>

            <span className={styles.eyebrowLine} />
          </div>

          <h1 className={styles.title}>
            Ideas that move
            <br />
            <span className={styles.titleAccent}>
              technology forward.
            </span>
          </h1>

          <p className={styles.description}>
            Explore practical insights, emerging technologies,
            development strategies, and digital ideas to help your
            business build smarter and grow faster.
          </p>

          {/* Hero actions */}
          <div className={styles.actions}>
            <Link
              href="#articles"
              className={styles.primaryButton}
            >
              Explore Articles
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/contact"
              className={styles.secondaryButton}
            >
              Discuss a Project
            </Link>
          </div>

          {/* Topics */}
          <div className={styles.topics}>
            <span className={styles.topicsLabel}>
              EXPLORE TOPICS
            </span>

            <div className={styles.topicList}>
              {topics.map(({ label, icon: Icon }) => (
                <span className={styles.topic} key={label}>
                  <Icon size={14} />
                  <span>{label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right-side technology visual */}
        <div className={styles.visual} aria-hidden="true">
          <div className={styles.visualOrb} />

          {/* Outer orbit */}
          <div
            className={`${styles.orbit} ${styles.orbitOuter}`}
          >
            <span
              className={`${styles.orbitNode} ${styles.nodeTop}`}
            />

            <span
              className={`${styles.orbitNode} ${styles.nodeRight}`}
            />

            <span
              className={`${styles.orbitNode} ${styles.nodeBottom}`}
            />
          </div>

          {/* Inner orbit */}
          <div
            className={`${styles.orbit} ${styles.orbitInner}`}
          >
            <span
              className={`${styles.orbitNode} ${styles.nodeLeft}`}
            />
          </div>

          {/* Central code card */}
          <div className={styles.coreCard}>
            <div className={styles.coreHeader}>
              <span className={styles.coreDot} />

              <span>INSIGHT_ENGINE</span>

              <span className={styles.coreStatus}>
                ACTIVE
              </span>
            </div>

            <div className={styles.codeLines}>
              <span className={styles.codeLine}>
                <i>01</i>
                <b className={styles.codeBlue}>const</b>{" "}
                ideas ={" "}
                <b className={styles.codePurple}>
                  innovation
                </b>
                ;
              </span>

              <span className={styles.codeLine}>
                <i>02</i>
                <b className={styles.codeBlue}>function</b>{" "}
                buildFuture() {"{"}
              </span>

              <span
                className={`${styles.codeLine} ${styles.indented}`}
              >
                <i>03</i>
                return{" "}
                <b className={styles.codeGreen}>
                  possibilities
                </b>
                ;
              </span>

              <span className={styles.codeLine}>
                <i>04</i>
                {"}"}
              </span>
            </div>

            <div className={styles.coreFooter}>
              <span>
                <Sparkles size={13} />
                THINK. BUILD. GROW.
              </span>

              <span className={styles.liveIndicator} />
            </div>
          </div>

          {/* Floating card: development */}
          <div
            className={`${styles.floatingCard} ${styles.floatingTop}`}
          >
            <span className={styles.floatingIcon}>
              <Code2 size={17} />
            </span>

            <span>
              <strong>Build smarter</strong>
              <small>Development insights</small>
            </span>
          </div>

          {/* Floating card: digital growth */}
          <div
            className={`${styles.floatingCard} ${styles.floatingBottom}`}
          >
            <span className={styles.floatingIconAlt}>
              <Layers3 size={17} />
            </span>

            <span>
              <strong>Think bigger</strong>
              <small>Ideas for digital growth</small>
            </span>
          </div>

          <div className={styles.visualLabel}>
            <span className={styles.labelLine} />
            DIGITAL KNOWLEDGE / 001
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#articles"
        className={styles.scrollIndicator}
        aria-label="Scroll to articles"
      >
        <span>SCROLL TO DISCOVER</span>
        <ArrowDown size={15} />
      </a>

      <div className={styles.bottomLine} />
    </section>
  );
}
