
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Network,
  Server,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

import styles from "./ProductsHero.module.css";

const productCategories = [
  {
    name: "Hardware",
    description: "Business-ready devices",
    icon: Cpu,
  },
  {
    name: "Networking",
    description: "Connected infrastructure",
    icon: Network,
  },
  {
    name: "Servers",
    description: "Reliable computing",
    icon: Server,
  },
  {
    name: "Security",
    description: "Protected operations",
    icon: ShieldCheck,
  },
];

const highlights = [
  "Business-focused technology",
  "Quotation-based purchasing",
  "Technical consultation",
];

export default function ProductsHero() {
  return (
    <section className={styles.hero} aria-labelledby="products-hero-title">
      <div className={styles.backgroundGrid} aria-hidden="true" />
      <div className={styles.glowOne} aria-hidden="true" />
      <div className={styles.glowTwo} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIcon}>
              <Sparkles size={15} />
            </span>
            <span>TECHNOLOGY & IT SOLUTIONS</span>
            <span className={styles.eyebrowLine} />
          </div>

          <h1 id="products-hero-title" className={styles.title}>
            The right technology
            <br />
            for your <span>next move.</span>
          </h1>

          <p className={styles.description}>
            Discover hardware, software, networking equipment, servers, and
            security solutions selected to support your business. Find the
            right products with expert guidance from Shineweb Tech Creations.
          </p>

          <div className={styles.actions}>
            <Link href="#product-catalogue" className={styles.primaryButton}>
              Explore Products
              <ArrowRight size={18} />
            </Link>

            <Link href="/contact" className={styles.secondaryButton}>
              Request a Quotation
              <ArrowUpRight size={18} />
            </Link>
          </div>

          <div className={styles.highlights}>
            {highlights.map((highlight) => (
              <div className={styles.highlight} key={highlight}>
                <CheckCircle2 size={16} />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.visualTop}>
            <div>
              <span className={styles.visualLabel}>PRODUCT ECOSYSTEM</span>
              <h2>Technology, connected.</h2>
            </div>

            <span className={styles.status}>
              <span className={styles.statusDot} />
              Business solutions
            </span>
          </div>

          <div className={styles.orbitScene}>
            <div className={`${styles.orbit} ${styles.orbitOuter}`} />
            <div className={`${styles.orbit} ${styles.orbitMiddle}`} />
            <div className={`${styles.orbit} ${styles.orbitInner}`} />

            <div className={styles.centerGlow} />

            <div className={styles.core}>
              <div className={styles.coreLogo}>
                <Image
              src="/logo.svg"
              alt="Shineweb Tech Creations"
              width={60}
              height={60}
              priority
              className={styles.brandLogo}
            />
              </div>
              <span className={styles.coreTitle}>SHINEWEB</span>
              <span className={styles.coreSubtitle}>TECH CREATIONS</span>
            </div>

            <div className={`${styles.categoryNode} ${styles.nodeHardware}`}>
              <div className={styles.nodeIcon}>
                <Cpu size={23} />
              </div>
              <div className={styles.nodeText}>
                <strong>Hardware</strong>
                <span>Devices & components</span>
              </div>
              <span className={styles.nodeIndicator} />
            </div>

            <div className={`${styles.categoryNode} ${styles.nodeNetwork}`}>
              <div className={styles.nodeIcon}>
                <Network size={23} />
              </div>
              <div className={styles.nodeText}>
                <strong>Networking</strong>
                <span>Connectivity solutions</span>
              </div>
              <span className={styles.nodeIndicator} />
            </div>

            <div className={`${styles.categoryNode} ${styles.nodeServer}`}>
              <div className={styles.nodeIcon}>
                <Server size={23} />
              </div>
              <div className={styles.nodeText}>
                <strong>Infrastructure</strong>
                <span>Servers & systems</span>
              </div>
              <span className={styles.nodeIndicator} />
            </div>

            <div className={`${styles.categoryNode} ${styles.nodeSecurity}`}>
              <div className={styles.nodeIcon}>
                <ShieldCheck size={23} />
              </div>
              <div className={styles.nodeText}>
                <strong>Security</strong>
                <span>Protection & control</span>
              </div>
              <span className={styles.nodeIndicator} />
            </div>

            <span className={`${styles.particle} ${styles.particleOne}`} />
            <span className={`${styles.particle} ${styles.particleTwo}`} />
            <span className={`${styles.particle} ${styles.particleThree}`} />
            <span className={`${styles.particle} ${styles.particleFour}`} />
          </div>

          <div className={styles.visualFooter}>
            <span className={styles.visualFooterIcon}>
              <ShieldCheck size={17} />
            </span>
            <div>
              <strong>Built around your business</strong>
              <span>Products and solutions for your requirements</span>
            </div>
            <span className={styles.footerArrow}>
              <ArrowUpRight size={19} />
            </span>
          </div>
        </div>
      </div>

      <div className={styles.categoryStrip}>
        <div className={styles.categoryStripInner}>
          <div className={styles.categoryIntro}>
            <span>EXPLORE OUR RANGE</span>
            <ArrowDown size={16} />
          </div>

          {productCategories.map((category) => {
            const Icon = category.icon;

            return (
              <a
                className={styles.categoryItem}
                href="#product-catalogue"
                key={category.name}
              >
                <span className={styles.categoryIcon}>
                  <Icon size={20} />
                </span>

                <span className={styles.categoryCopy}>
                  <strong>{category.name}</strong>
                  <span>{category.description}</span>
                </span>

                <ArrowUpRight
                  size={16}
                  className={styles.categoryArrow}
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
