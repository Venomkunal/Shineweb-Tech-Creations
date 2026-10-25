import Link from "next/link";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Blocks,
  CheckCircle2,
  Code2,
  Database,
  Network,
  ShieldCheck,
} from "lucide-react";

import styles from "./SolutionsHero.module.css";

const capabilities = [
  {
    icon: Code2,
    title: "Software & Web",
    description: "Digital platforms and custom applications",
    number: "01",
  },
  {
    icon: Network,
    title: "IT Infrastructure",
    description: "Networking, servers and connectivity",
    number: "02",
  },
  {
    icon: ShieldCheck,
    title: "Security & Cloud",
    description: "Protection and infrastructure solutions",
    number: "03",
  },
  {
    icon: Database,
    title: "Business Systems",
    description: "Connected workflows and data management",
    number: "04",
  },
];

export default function SolutionsHero() {
  return (
    <section
      className={styles.hero}
      aria-labelledby="solutions-hero-heading"
    >
      <div className={styles.backgroundGrid} />
      <div className={styles.backgroundGlow} />

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>

            <span>/</span>

            <span aria-current="page">Solutions</span>
          </div>

          <div className={styles.eyebrow}>
            <span className={styles.statusDot} />

            <span>BUSINESS & TECHNOLOGY SOLUTIONS</span>
          </div>

          <h1 id="solutions-hero-heading">
            The right technology
            <br />
            <span>for every challenge.</span>
          </h1>

          <p className={styles.description}>
            From custom software and digital platforms to IT
            infrastructure, networking, and cybersecurity,
            we help businesses find practical technology solutions
            built around their goals.
          </p>

          <div className={styles.actions}>
            <Link
              href="/contact"
              className={styles.primaryButton}
            >
              Discuss Your Project

              <ArrowUpRight
                size={18}
                aria-hidden="true"
              />
            </Link>

            <Link
              href="#solution-categories"
              className={styles.secondaryButton}
            >
              Explore Solutions

              <ArrowRight
                size={17}
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className={styles.highlights}>
            <div className={styles.highlight}>
              <CheckCircle2
                size={16}
                aria-hidden="true"
              />

              <span>Business-focused approach</span>
            </div>

            <div className={styles.highlight}>
              <CheckCircle2
                size={16}
                aria-hidden="true"
              />

              <span>Integrated technology</span>
            </div>

            <div className={styles.highlight}>
              <CheckCircle2
                size={16}
                aria-hidden="true"
              />

              <span>Scalable implementations</span>
            </div>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.visualHeader}>
            <div>
              <span className={styles.visualEyebrow}>
                TECHNOLOGY ECOSYSTEM
              </span>

              <h2>Connected by design.</h2>
            </div>

            <span className={styles.visualBadge}>
              <span className={styles.statusDot} />
              SOLUTIONS
            </span>
          </div>

          <div className={styles.diagram}>
            <div className={`{styles.orbit} orbitOuter`} />
            <div className={`{styles.orbit} orbitInner`} />

            <svg
              className={styles.connections}
              viewBox="0 0 440 360"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <path
                d="M220 180 L104 87"
                className={styles.connection}
              />

              <path
                d="M220 180 L336 87"
                className={styles.connection}
              />

              <path
                d="M220 180 L104 273"
                className={styles.connection}
              />

              <path
                d="M220 180 L336 273"
                className={styles.connection}
              />

              <circle
                cx="162"
                cy="133"
                r="3"
                className={styles.connectionPoint}
              />

              <circle
                cx="278"
                cy="133"
                r="3"
                className={styles.connectionPoint}
              />

              <circle
                cx="162"
                cy="227"
                r="3"
                className={styles.connectionPoint}
              />

              <circle
                cx="278"
                cy="227"
                r="3"
                className={styles.connectionPoint}
              />
            </svg>

            <div className={styles.core}>
              <div className={styles.coreIcon}>
                <Blocks
                  size={34}
                  strokeWidth={1.6}
                />
              </div>

              <span className={styles.coreTitle}>
                YOUR BUSINESS
              </span>

              <span className={styles.coreSubtitle}>
                One connected ecosystem
              </span>

              <span className={styles.coreIndicator}>
                <span />
                TECHNOLOGY THAT WORKS TOGETHER
              </span>
            </div>

            <div className={`${styles.node} ${styles.nodeOne}`}>
              <div className={styles.nodeIcon}>
                <Code2 size={19} />
              </div>

              <span>Software</span>
            </div>

            <div className={`${styles.node} ${styles.nodeTwo}`}>
              <div className={styles.nodeIcon}>
                <Network size={19} />
              </div>

              <span>Networking</span>
            </div>

            <div className={`${styles.node} ${styles.nodeThree}`}>
              <div className={styles.nodeIcon}>
                <ShieldCheck size={19} />
              </div>

              <span>Security</span>
            </div>

            <div className={`${styles.node} ${styles.nodeFour}`}>
              <div className={styles.nodeIcon}>
                <Database size={19} />
              </div>

              <span>Systems</span>
            </div>
          </div>

          <div className={styles.visualFooter}>
            <div className={styles.footerIcon}>
              <CheckCircle2 size={18} />
            </div>

            <div className={styles.footerText}>
              <strong>Designed around your needs</strong>

              <span>
                Technology aligned with your business objectives.
              </span>
            </div>

            <ArrowUpRight
              className={styles.footerArrow}
              size={19}
            />
          </div>
        </div>
      </div>

      <Link
        href="#solutions-overview"
        className={styles.scrollIndicator}
        aria-label="Scroll to solutions overview"
      >
        <span>DISCOVER OUR APPROACH</span>

        <ArrowDown size={15} />
      </Link>
    </section>
  );
}