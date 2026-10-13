
"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getPartners, type Partner } from "@/lib/partners";
import styles from "./Partners.module.css";

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPartners = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getPartners();
      setPartners(data.filter((partner) => partner.featured));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load partners."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPartners();
  }, [loadPartners]);

  return (
    <section
      className={styles.partners}
      id="partners"
      aria-labelledby="partners-title"
    >
      <div className={styles.container}>
        <div className={styles.topLine}>
          <span className={styles.eyebrow}>
            <span className={styles.statusDot} />
            OUR TECHNOLOGY ECOSYSTEM
          </span>
          <span className={styles.topNote}>
            Technology for every business
          </span>
        </div>

        <div className={styles.header}>
          <div className={styles.headingContent}>
            <span className={styles.sectionLabel}>
              BUILT ON TRUST. POWERED BY TECHNOLOGY.
            </span>

            <h2 id="partners-title" className={styles.title}>
              Better technology.
              <br />
              <span>Stronger partnerships.</span>
            </h2>

            <p className={styles.description}>
              We connect businesses with technology solutions across
              software, computing, networking, and cybersecurity.
              One team to help you source, deploy, and manage your IT.
            </p>
          </div>

          <Link href="/contact" className={styles.contactLink}>
            <span>Discuss your requirements</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className={styles.gridHeader}>
          <div>
            <h3>Technology brands</h3>
            <p>Solutions for modern business infrastructure</p>
          </div>

          {!loading && !error && (
            <span className={styles.count}>
              {partners.length.toString().padStart(2, "0")}{" "}
              <span>FEATURED</span>
            </span>
          )}
        </div>

        {loading ? (
          <div className={styles.logoGrid} aria-label="Loading partners">
            {Array.from({ length: 4 }).map((_, index) => (
              <div className={styles.skeleton} key={index}>
                <span />
                <span />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className={styles.message} role="alert">
            <span className={styles.messageIcon}>!</span>
            <div>
              <h3>Partners could not be loaded</h3>
              <p>{error}</p>
            </div>
            <button
              type="button"
              onClick={() => void loadPartners()}
              className={styles.retryButton}
            >
              Try again
            </button>
          </div>
        ) : partners.length === 0 ? (
          <div className={styles.message}>
            <div>
              <h3>Our partner network is growing</h3>
              <p>Contact our team to discuss your technology requirements.</p>
            </div>
            <Link href="/contact" className={styles.retryButton}>
              Contact us ↗
            </Link>
          </div>
        ) : (
          <div className={styles.logoGrid}>
            {partners.map((partner, index) => (
              <article
                className={styles.brandCard}
                key={partner._id}
                style={{ animationDelay: `${index * 65}ms` }}
              >
                <div className={styles.cardTop}>
                  <span className={styles.cardIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.brandArrow} aria-hidden="true">
                    ↗
                  </span>
                </div>

                <div className={styles.logoFrame}>
                  {partner.logoUrl ? (
                    <img
                      src={partner.logoUrl}
                      alt={`${partner.name} logo`}
                      className={styles.brandLogo}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className={styles.logoFallback}>
                      {partner.name}
                    </span>
                  )}
                </div>

                <div className={styles.cardInfo}>
                  <h4>{partner.name}</h4>
                  <p>{partner.category}</p>
                </div>

                {partner.websiteUrl && (
                  <a
                    href={partner.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.brandLink}
                    aria-label={`Visit ${partner.name} website`}
                  >
                    Visit website <span aria-hidden="true">↗</span>
                  </a>
                )}
              </article>
            ))}
          </div>
        )}

        <div className={styles.bottomBar}>
          <div className={styles.bottomMessage}>
            <span className={styles.bottomIcon} aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M12 3v5m0 8v5M3 12h5m8 0h5M5.64 5.64l3.54 3.54m5.64 5.64 3.54 3.54m0-12.72-3.54 3.54m-5.64 5.64-3.54 3.54" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
            <p>
              <strong>Your business. The right technology.</strong>
              <span>
                Hardware, software, networking, and IT services under one roof.
              </span>
            </p>
          </div>

          <Link href="/products" className={styles.exploreLink}>
            Explore our solutions <span aria-hidden="true">→</span>
          </Link>
        </div>

        <p className={styles.disclaimer}>
          All trademarks belong to their respective owners. Display does not
          necessarily indicate an official partnership or reseller authorization.
        </p>
      </div>
    </section>
  );
}
