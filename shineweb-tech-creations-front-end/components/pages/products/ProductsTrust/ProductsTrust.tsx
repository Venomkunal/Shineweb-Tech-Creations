
import {
  BadgeCheck,
  Headset,
  PackageCheck,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

import styles from "./ProductsTrust.module.css";

const trustFeatures = [
  {
    number: "01",
    title: "Business-Ready Products",
    description:
      "Technology products selected to support everyday business operations and infrastructure needs.",
    icon: BadgeCheck,
  },
  {
    number: "02",
    title: "Quotation-Based Purchasing",
    description:
      "Get pricing and product options tailored to your requirements, quantities, and project scope.",
    icon: PackageCheck,
  },
  {
    number: "03",
    title: "Technical Guidance",
    description:
      "Get assistance comparing specifications, compatibility, and suitable technology options.",
    icon: Headset,
  },
  {
    number: "04",
    title: "Solution-Focused Support",
    description:
      "Make informed purchasing decisions with guidance aligned to your business requirements.",
    icon: ShieldCheck,
  },
];

export default function ProductsTrust() {
  return (
    <section
      className={styles.trust}
      aria-labelledby="products-trust-title"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headingGroup}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              THE SHINEWEB ADVANTAGE
            </span>

            <h2 id="products-trust-title" className={styles.title}>
              More than products.
              <br />
              <span>A technology partner.</span>
            </h2>
          </div>

          <p className={styles.intro}>
            Choosing the right technology matters. We help businesses evaluate
            product options, understand specifications, and identify solutions
            that fit their operational requirements.
          </p>
        </div>

        <div className={styles.featureGrid}>
          {trustFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <article className={styles.featureCard} key={feature.number}>
                <div className={styles.cardTop}>
                  <span className={styles.featureNumber}>
                    {feature.number}
                  </span>

                  <span className={styles.iconBox}>
                    <Icon size={22} strokeWidth={1.7} />
                  </span>
                </div>

                <h3 className={styles.featureTitle}>{feature.title}</h3>

                <p className={styles.featureDescription}>
                  {feature.description}
                </p>

                <div className={styles.cardBottom}>
                  <span className={styles.cardLine} />
                  <ArrowUpRight
                    size={17}
                    className={styles.cardArrow}
                    aria-hidden="true"
                  />
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles.bottomNote}>
          <div className={styles.noteIcon}>
            <ShieldCheck size={19} />
          </div>

          <p>
            <strong>Need help choosing?</strong>
            <span>
              Tell us what your business needs, and we can help you explore
              suitable options.
            </span>
          </p>

          <a href="/contact" className={styles.contactLink}>
            Talk to our team
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
