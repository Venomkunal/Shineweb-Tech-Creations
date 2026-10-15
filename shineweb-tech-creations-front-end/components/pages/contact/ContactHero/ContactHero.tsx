import Link from "next/link";
import {
ArrowDown,
ArrowRight,
ArrowUpRight,
CheckCircle2,
Code2,
MessageCircle,
Network,
ShieldCheck,
Sparkles,
Zap,
} from "lucide-react";
import Image from "next/image";
import styles from "./ContactHero.module.css";

const WHATSAPP_URL =
"https://wa.me/917099093224?text=" +
encodeURIComponent(
"Hello Shineweb Tech Creations! I would like to discuss a project."
);

export default function ContactHero() {
return (
<section
className={styles.hero}
aria-labelledby="contact-hero-title"
>
{/* Atmospheric background */}
<div className={styles.heroGrid} aria-hidden="true" />
<div className={styles.heroGlow} aria-hidden="true" />
<div className={styles.heroGlowSecondary} aria-hidden="true" />

  <div className={styles.heroInner}>
    {/* Left: headline and actions */}
    <div className={styles.heroContent}>
      <div className={styles.eyebrow}>
        <span className={styles.eyebrowIcon}>
          <Sparkles size={15} />
        </span>

        <span>LET&apos;S BUILD SOMETHING BETTER</span>

        <span className={styles.eyebrowLine} />
      </div>

      <h1 id="contact-hero-title" className={styles.heroTitle}>
        Great ideas start
        <br />
        with a <span>conversation.</span>
      </h1>

      <p className={styles.heroDescription}>
        Looking to build a website, develop custom software,
        strengthen your IT infrastructure, or grow your digital
        presence? Tell us where you want to go. We&apos;ll help
        you explore the right technology solutions.
      </p>

      {/* Service highlights */}
      <div className={styles.heroHighlights}>
        <span>
          <CheckCircle2 size={16} />
          Tailored solutions
        </span>

        <span>
          <CheckCircle2 size={16} />
          Practical expertise
        </span>

        <span>
          <CheckCircle2 size={16} />
          Business-focused
        </span>
      </div>

      {/* Main actions */}
      <div className={styles.heroActions}>
        <Link
          href="#contact-form"
          className={styles.primaryButton}
        >
          <span>Start a project</span>
          <span className={styles.buttonIcon}>
            <ArrowRight size={18} />
          </span>
        </Link>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.secondaryButton}
        >
          <MessageCircle size={18} />
          <span>Chat on WhatsApp</span>
          <ArrowUpRight
            size={16}
            className={styles.secondaryArrow}
          />
        </a>
      </div>

      {/* Trust and contact note */}
      <div className={styles.heroNote}>
        <span className={styles.statusDot} />

        <span>
          Let&apos;s discuss your next digital solution.
        </span>
      </div>
    </div>

    {/* Right: branded technology illustration */}
    <div
      className={styles.heroVisual}
      role="img"
      aria-label="Shineweb Tech Creations technology illustration representing web development, software, and IT infrastructure"
    >
      <div className={styles.visualAmbient} aria-hidden="true" />

      <div className={`${styles.orbit} ${styles.orbitOne}`} aria-hidden="true">
        <span className={`${styles.orbitPoint} ${styles.pointOne}`} />
        <span className={`${styles.orbitPoint} ${styles.pointTwo}`} />
      </div>

      <div className={`${styles.orbit} ${styles.orbitTwo}`} aria-hidden="true">
        <span className={`${styles.orbitPoint} ${styles.pointThree}`} />
      </div>

      <div className={styles.orbitRing} aria-hidden="true" />

      {/* Central brand emblem */}
      <div className={styles.glowCore}>
        <div className={styles.coreInner}>
          <div className={styles.coreLogo}>
            <Image
              src="/logo.svg"
              alt="Shineweb Tech Creations"
              width={90}
              height={90}
              priority
              className={styles.brandLogo}
            /></div>

          <span className={styles.coreDivider} />

          <span className={styles.coreName}>SHINEWEB</span>
          <small>TECH CREATIONS</small>
        </div>
      </div>

      {/* Floating service card */}
      <div className={`${styles.floatingCard} ${styles.cardTop}`}>
        <span className={`${styles.miniIcon} ${styles.codeIcon}`}>
          <Code2 size={19} />
        </span>

        <div className={styles.cardCopy}>
          <strong>Web &amp; Software</strong>
          <small>Digital experiences</small>
        </div>

        <span className={styles.cardStatus} />
      </div>

      <div className={`${styles.floatingCard} ${styles.cardBottom}`}>
        <span className={`${styles.miniIcon} ${styles.networkIcon}`}>
          <Network size={19} />
        </span>

        <div className={styles.cardCopy}>
          <strong>IT Solutions</strong>
          <small>Connected. Secure. Scalable.</small>
        </div>

        <ShieldCheck
          size={17}
          className={styles.cardCheck}
        />
      </div>

      {/* Small decorative technology markers */}
      <div className={styles.visualBadge}>
        <Zap size={14} />
        <span>BUILT FOR GROWTH</span>
      </div>

      <span className={styles.visualCross} aria-hidden="true">
        +
      </span>
    </div>
  </div>

  {/* Bottom navigation hint */}
  <a
    href="#contact-channels"
    className={styles.scrollLink}
    aria-label="Scroll to contact options"
  >
    <span className={styles.scrollIcon}>
      <ArrowDown size={15} />
    </span>

    <span>EXPLORE CONTACT OPTIONS</span>

    <span className={styles.scrollLine} />
  </a>
</section>

);
}