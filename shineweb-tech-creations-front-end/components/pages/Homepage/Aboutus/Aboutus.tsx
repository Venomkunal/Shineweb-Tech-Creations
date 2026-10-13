"use client";

import Link from "next/link";
import styles from "./Aboutus.module.css";
import Image from "next/image";

const capabilities = [
  {
    number: "01",
    title: "IT Infrastructure",
    description: "Networking, systems, and reliable IT environments.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="6" rx="1.5" />
        <rect x="3" y="14" width="18" height="6" rx="1.5" />
        <path d="M7 7h.01M7 17h.01M11 7h6M11 17h6" />
      </>
    ),
  },
  {
    number: "02",
    title: "Hardware & Software",
    description: "Business technology, software, and licensing.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M8 21h8M12 17v4M8 9l2 2-2 2M13 13h3" />
      </>
    ),
  },
  {
    number: "03",
    title: "Cybersecurity",
    description: "Security-focused systems and protection.",
    icon: (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    number: "04",
    title: "Digital Solutions",
    description: "Websites, software, and digital experiences.",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M7 8h10M7 12h4M7 16h7M16 12l1.5 1.5L20 11" />
      </>
    ),
  },
];

function LineIcon({
  children,
  size = 22,
}: {
  children: React.ReactNode;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className={styles.about}
      aria-labelledby="about-heading"
    >
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <div className={styles.label}>
            <span className={styles.labelIndicator} />
            <span>GET TO KNOW US</span>
          </div>

          <span className={styles.headerMeta}>
            SHINEWEB TECH CREATIONS
            <span className={styles.metaDivider}>/</span>
            01
          </span>
        </header>

        <div className={styles.hero}>
          <div className={styles.story}>
            <span className={styles.eyebrow}>
              TECHNOLOGY THAT MOVES YOU FORWARD
            </span>

            <h2 id="about-heading" className={styles.heading}>
              Turning
              <br />
              technology into
              <br />
              <span className={styles.accent}>
                opportunity<span className={styles.period}>.</span>
              </span>
            </h2>

            <p className={styles.lead}>
              The right technology doesn't just support your business.
              It helps you discover what's possible next.
            </p>

            <p className={styles.description}>
              Shineweb Tech Creations brings IT infrastructure,
              hardware, software, cybersecurity, and digital development
              together to help businesses solve practical challenges
              and build for the future.
            </p>

            <div className={styles.actions}>
              <Link href="/about" className={styles.primaryButton}>
                Discover our story
                <span aria-hidden="true">↗</span>
              </Link>

              <Link href="/contact" className={styles.secondaryButton}>
                Let&apos;s talk
                <span className={styles.secondaryArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </div>

            <div className={styles.brandSignature}>
              <div className={styles.brandMark} aria-hidden="true">
                <Image 
                  src="/logo.svg"
                  alt="Shineweb Tech Creations logo"
                  width={30}
                  height={30}
                  priority
                />
                <span>.</span>
              </div>

              <div className={styles.brandText}>
                <strong>Shineweb Tech Creations</strong>
                <span>Technology with purpose.</span>
              </div>
            </div>
          </div>

          <div className={styles.visual}>
            <div className={styles.visualGlow} />
            <div className={styles.visualGrid} />

            <div className={styles.visualHeader}>
              <span className={styles.visualLabel}>
                <span className={styles.liveDot} />
                OUR TECHNOLOGY ECOSYSTEM
              </span>

              <span className={styles.visualIndex}>SW / 001</span>
            </div>

            <div className={styles.visualStage}>
              <div className={styles.stageCaption}>
                <span>CONNECTED BY DESIGN</span>
                <span className={styles.captionLine} />
              </div>

              <div className={styles.orbitScene}>
                <div className={`${styles.orbit} ${styles.orbitOuter}`} />
                <div className={`${styles.orbit} ${styles.orbitMiddle}`} />
                <div className={`${styles.orbit} ${styles.orbitInner}`} />

                <span className={`${styles.orbitDot} ${styles.dotOne}`} />
                <span className={`${styles.orbitDot} ${styles.dotTwo}`} />
                <span className={`${styles.orbitDot} ${styles.dotThree}`} />

                <div className={styles.core}>
                  <div className={styles.coreHalo} />

                  <div className={styles.coreLogo}>
                    
                    <Image 
                      src="/logo.svg"
                      alt="Shineweb Tech Creations logo"
                      width={60}
                      height={60}
                      priority
                    />
                    
                  </div>

                  <strong>SHINEWEB</strong>
                  <span>TECH CREATIONS</span>
                </div>

                <div className={`${styles.floatCard} ${styles.cardTop}`}>
                  <span className={styles.floatIcon}>
                    <LineIcon size={19}>
                      <rect x="3" y="4" width="18" height="6" rx="1.5" />
                      <rect x="3" y="14" width="18" height="6" rx="1.5" />
                    </LineIcon>
                  </span>
                  <span className={styles.floatText}>
                    <strong>IT Infrastructure</strong>
                    <small>Connected systems</small>
                  </span>
                </div>

                <div className={`${styles.floatCard} ${styles.cardRight}`}>
                  <span className={styles.floatIcon}>
                    <LineIcon size={19}>
                      <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
                      <path d="m9 12 2 2 4-4" />
                    </LineIcon>
                  </span>
                  <span className={styles.floatText}>
                    <strong>Cybersecurity</strong>
                    <small>Security-focused</small>
                  </span>
                </div>

                <div className={`${styles.floatCard} ${styles.cardBottom}`}>
                  <span className={styles.floatIcon}>
                    <LineIcon size={19}>
                      <rect x="3" y="3" width="18" height="18" rx="3" />
                      <path d="M7 8h10M7 12h4M7 16h7" />
                    </LineIcon>
                  </span>
                  <span className={styles.floatText}>
                    <strong>Digital Solutions</strong>
                    <small>Designed for growth</small>
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.visualFooter}>
              <div className={styles.footerCopy}>
                <span>OUR APPROACH</span>
                <strong>One vision. Connected solutions.</strong>
              </div>

              <span className={styles.footerSymbol} aria-hidden="true">
                ↗
              </span>
            </div>
          </div>
        </div>

        <div className={styles.servicesHeader}>
          <div>
            <span className={styles.servicesEyebrow}>
              OUR CAPABILITIES
            </span>
            <h3>Everything working together.</h3>
          </div>

          <p>
            Integrated technology solutions shaped around your business.
          </p>
        </div>

        <div className={styles.capabilities}>
          {capabilities.map((item) => (
            <article key={item.number} className={styles.capability}>
              <div className={styles.capabilityTop}>
                <span className={styles.capabilityNumber}>
                  {item.number}
                </span>

                <span className={styles.capabilityIcon}>
                  <LineIcon>{item.icon}</LineIcon>
                </span>
              </div>

              <h4>{item.title}</h4>
              <p>{item.description}</p>

              <span className={styles.capabilityAccent} />
            </article>
          ))}
        </div>

        <footer className={styles.closing}>
          <div className={styles.closingCopy}>
            <span>HAVE A PROJECT IN MIND?</span>
            <h3>
              Let&apos;s build something
              <span> that works for you.</span>
            </h3>
          </div>

          <Link href="/contact" className={styles.closingButton}>
            Start a conversation
            <span aria-hidden="true">↗</span>
          </Link>
        </footer>
      </div>
    </section>
  );
}