
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Headset,
  MessageSquareText,
  PackageCheck,
  Sparkles,
} from "lucide-react";

import styles from "./ProductsCTA.module.css";

const benefits = [
  "Product recommendations for your requirements",
  "Quotation-based pricing",
  "Technical and compatibility guidance",
];

export default function ProductsCTA() {
  return (
    <section
      className={styles.cta}
      aria-labelledby="products-cta-title"
    >
      <div className={styles.backgroundGrid} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.ctaCard}>
          <div className={styles.content}>
            <span className={styles.eyebrow}>
              <Sparkles size={15} />
              LET'S FIND YOUR SOLUTION
            </span>

            <h2 id="products-cta-title" className={styles.title}>
              Have a project
              <br />
              in <span>mind?</span>
            </h2>

            <p className={styles.description}>
              Tell us what your business needs. From computers and networking
              equipment to servers and security solutions, our team can help
              you explore suitable products and request a quotation.
            </p>

            <div className={styles.benefits}>
              {benefits.map((benefit) => (
                <div className={styles.benefit} key={benefit}>
                  <CheckCircle2 size={17} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className={styles.actions}>
              <Link href="/contact" className={styles.primaryButton}>
                Request a Quotation
                <ArrowRight size={18} />
              </Link>

              <a
                href="mailto:kunalsarma@shinewebtechcretions.online?subject=Product%20Enquiry%20-%20Shineweb%20Tech%20Creations"
                className={styles.secondaryButton}
              >
                <MessageSquareText size={17} />
                Email Our Team
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>

          <div className={styles.visual}>
            <div className={styles.visualOrb} aria-hidden="true" />
            <div className={styles.visualRing} aria-hidden="true" />
            <div className={styles.visualRingInner} aria-hidden="true" />

            <div className={styles.mainIcon}>
              <Headset size={40} strokeWidth={1.4} />
            </div>

            <div className={`${styles.floatingCard} ${styles.cardTop}`}>
              <span className={styles.floatingIcon}>
                <PackageCheck size={19} />
              </span>
              <span>
                <strong>Product sourcing</strong>
                <small>Options for your requirements</small>
              </span>
              <ArrowUpRight size={15} className={styles.floatingArrow} />
            </div>

            <div className={`${styles.floatingCard} ${styles.cardBottom}`}>
              <span className={styles.floatingIcon}>
                <MessageSquareText size={19} />
              </span>
              <span>
                <strong>Quotation support</strong>
                <small>Discuss your project needs</small>
              </span>
              <ArrowUpRight size={15} className={styles.floatingArrow} />
            </div>

            <div className={styles.visualCaption}>
              <span className={styles.captionDot} />
              <span>Let's plan your next technology purchase</span>
            </div>
          </div>

          <div className={styles.cornerMark} aria-hidden="true">
            <ArrowUpRight size={22} />
          </div>
        </div>

        <div className={styles.bottomNote}>
          <span className={styles.bottomNoteIcon}>
            <CheckCircle2 size={16} />
          </span>
          <p>
            <strong>Not sure what you need?</strong>
            <span>
              Start with your requirements. We can help you identify suitable
              options.
            </span>
          </p>
          <Link href="/contact" className={styles.textLink}>
            Talk to us
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
