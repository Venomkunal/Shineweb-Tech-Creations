
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Cloud,
  Code2,
  Network,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import styles from "./AboutHero.module.css";

const technologies = [
  { icon: Code2, className: "nodeCode", label: "Web development" },
  { icon: Cloud, className: "nodeCloud", label: "Cloud solutions" },
  { icon: ShieldCheck, className: "nodeSecurity", label: "Cybersecurity" },
  { icon: Network, className: "nodeNetwork", label: "IT infrastructure" },
] as const;

function DigitalGlobe() {
  return (
    <div className={styles.visual}>
      <div className={styles.visualGlow} aria-hidden="true" />

      <div className={styles.visualLabel}>
        <span className={styles.statusDot} />
        <span>TECHNOLOGY THAT MOVES BUSINESS FORWARD</span>
      </div>

      <div className={styles.globeStage}>
        <div className={`${styles.orbit} ${styles.orbitOne}`} />
        <div className={`${styles.orbit} ${styles.orbitTwo}`} />
        <div className={`${styles.orbit} ${styles.orbitThree}`} />

        <div className={styles.globe}>
          <div className={styles.globeGrid} />
          <div className={styles.globeLatitude} />
          <div className={styles.globeLongitude} />

          <div className={styles.globeCore}>
            <Image
              src="/logo.svg"
              alt="Shineweb Tech Creations"
              width={110}
              height={110}
              priority
              className={styles.brandLogo}
            />

            <span className={styles.coreLine} />

            <span className={styles.coreLabel}>
              DIGITAL INNOVATION
            </span>
          </div>
        </div>

        <svg
          className={styles.connections}
          viewBox="0 0 500 430"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="aboutConnectionGradient"
              x1="40"
              y1="100"
              x2="450"
              y2="330"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#55D9FF" stopOpacity=".15" />
              <stop offset=".5" stopColor="#55D9FF" stopOpacity=".7" />
              <stop offset="1" stopColor="#8194FF" stopOpacity=".2" />
            </linearGradient>
          </defs>

          <path d="M250 215 L91 108 L48 145" />
          <path d="M250 215 L411 102 L450 132" />
          <path d="M250 215 L94 323 L49 290" />
          <path d="M250 215 L407 324 L449 287" />

          <circle cx="91" cy="108" r="3" />
          <circle cx="411" cy="102" r="3" />
          <circle cx="94" cy="323" r="3" />
          <circle cx="407" cy="324" r="3" />

          <circle className={styles.signal} r="3">
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              path="M48 145 L91 108 L250 215"
            />
          </circle>

          <circle className={styles.signal} r="3">
            <animateMotion
              dur="5s"
              repeatCount="indefinite"
              path="M449 287 L407 324 L250 215"
            />
          </circle>
        </svg>

        {technologies.map(({ icon: Icon, className, label }) => (
          <div
            key={className}
            className={`${styles.node} ${styles[className]}`}
            aria-hidden="true"
          >
            <Icon size={21} strokeWidth={1.7} />
            <span className={styles.nodeTooltip}>{label}</span>
          </div>
        ))}

        <div className={styles.floatingCard}>
          <span className={styles.floatingIcon}>
            <Zap size={17} />
          </span>

          <span className={styles.floatingText}>
            <strong>Built around your goals</strong>
            <small>Technology. Connected.</small>
          </span>

          <Sparkles
            className={styles.floatingSparkle}
            size={17}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className={styles.visualFooter} aria-label="Our approach">
        <span>DEVELOP</span>
        <i />
        <span>CONNECT</span>
        <i />
        <span>PROTECT</span>
      </div>
    </div>
  );
}

export default function AboutHero() {
  return (
    <section className={styles.hero} id="about-hero">
      <div className={styles.backgroundGrid} aria-hidden="true" />
      <div className={styles.backgroundGlow} aria-hidden="true" />

      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">About Us</span>
        </nav>

        <div className={styles.heroLayout}>
          <div className={styles.heroContent}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              <span>ABOUT SHINEWEB TECH CREATIONS</span>
            </div>

            <h1>
              We turn technology
              <br />
              into <span className={styles.gradientText}>possibility.</span>
            </h1>

            <p className={styles.description}>
              We bring digital creativity and practical IT expertise
              together to help businesses build better experiences,
              strengthen their infrastructure, and grow with confidence.
            </p>

            <div className={styles.actions}>
              <Link
                href="/contact"
                className={styles.primaryButton}
              >
                Let&apos;s work together
                <ArrowUpRight size={18} />
              </Link>

              <a
                href="#our-story"
                className={styles.secondaryButton}
              >
                Discover our story
                <ArrowRight size={17} />
              </a>
            </div>

            <div className={styles.trustNote}>
              <span className={styles.trustIcon}>
                <Sparkles size={16} />
              </span>

              <p>
                One technology partner.
                <strong> Multiple ways to grow.</strong>
              </p>
            </div>

            <div className={styles.heroCapabilities}>
              <span>Web &amp; software</span>
              <span>IT infrastructure</span>
              <span>Digital solutions</span>
            </div>
          </div>

          <DigitalGlobe />
        </div>

        <a href="#our-story" className={styles.scrollCue}>
          <span>GET TO KNOW US</span>
          <ArrowDown size={15} />
        </a>
      </div>
    </section>
  );
}
