"use client";

import Link from "next/link";
import {
ArrowRight,
MessageCircle,
Sparkles,
ShieldCheck,
Zap,
ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import styles from "./ContactCTA.module.css";

const WHATSAPP_NUMBER = "+917099093224";

const whatsappMessage = encodeURIComponent(
"Hello Shineweb Tech Creations, I would like to discuss a project. Please share more details about your services."
);

const whatsappUrl = "https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}";

export default function ContactCTA() {
return (
<section
className={styles.ctaSection}
aria-labelledby="contact-cta-title"
>
<div className={styles.sectionContainer}>
<div className={styles.ctaCard}>
{/* Decorative background */}
<div className={styles.backgroundGrid} aria-hidden="true" />
<div className={styles.ctaGlow} aria-hidden="true" />
<div className={styles.ctaGlowSecondary} aria-hidden="true" />

      <div className={styles.orbit} aria-hidden="true">
        <span className={styles.orbitDot} />
        <span className={styles.orbitDotSecondary} />
      </div>

      <div className={styles.ctaContent}>
        <span className={styles.eyebrow}>
          <Sparkles size={15} aria-hidden="true" />
          YOUR NEXT STEP STARTS HERE
        </span>

        <h2 id="contact-cta-title" className={styles.ctaTitle}>
          Let&apos;s turn your
          <span> ideas into impact.</span>
        </h2>

        <p className={styles.ctaDescription}>
          From your first website to a complete business
          technology ecosystem, we help turn ambitious ideas
          into practical digital solutions built for growth.
        </p>

        <div className={styles.ctaActions}>
          <Link
            href="#contact-form"
            className={styles.primaryButton}
          >
            <span>Discuss your project</span>
            <ArrowRight
              size={18}
              aria-hidden="true"
              className={styles.buttonArrow}
            />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryButton}
            aria-label="Contact Shineweb Tech Creations on WhatsApp"
          >
            <MessageCircle size={19} aria-hidden="true" />
            <span>WhatsApp us</span>
            <ArrowUpRight
              size={15}
              aria-hidden="true"
              className={styles.externalArrow}
            />
          </a>
        </div>

        <div className={styles.trustRow}>
          <div className={styles.trustItem}>
            <ShieldCheck size={17} aria-hidden="true" />
            <span>Business-focused solutions</span>
          </div>

          <span className={styles.trustDivider} aria-hidden="true" />

          <div className={styles.trustItem}>
            <Zap size={16} aria-hidden="true" />
            <span>Built around your goals</span>
          </div>
        </div>
      </div>

      <div className={styles.ctaFooter}>
        <div className={styles.brandMark} aria-label="Shineweb Tech Creations">
          <span className={styles.brandInitials}><Image
                                          src="/logo.svg"
                                          alt="Shineweb Tech Creations"
                                          width={30}
                                          height={30}
                                          priority
                                          className={styles.brandLogo}
                                        /></span>
          <span className={styles.brandName}>
            <strong>SHINEWEB</strong>
            <span>TECH CREATIONS</span>
          </span>
        </div>

        <span className={styles.footerTagline}>
          Technology. Creativity. Growth.
        </span>
      </div>
    </div>
  </div>
</section>

);
}