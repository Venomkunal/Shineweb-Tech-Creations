
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  ExternalLink,
  MapPin,
  Navigation,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import styles from "./ContactLocation.module.css";

const mapUrl =
  "https://maps.app.goo.gl/DoQSduCJqRbREJC36";

const mapEmbedUrl =
  "https://maps.google.com/maps?q=Shineweb%20Tech%20Creations%2C%20Japorigog%2C%20Krishnanagar%2C%20Guwahati%2C%20Assam%20781036&z=16&output=embed";

export default function ContactLocation() {
  return (
    <section
      className={styles.locationSection}
      aria-labelledby="location-heading"
    >
      <div className={styles.backgroundGlow} aria-hidden="true" />
      <div className={styles.backgroundGrid} aria-hidden="true" />

      <div className={styles.sectionContainer}>
        {/* Section heading */}
        <header className={styles.locationHeader}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span>OUR LOCATION</span>
            <span className={styles.eyebrowLine} />
          </div>

          <h2
            id="location-heading"
            className={styles.sectionTitle}
          >
            Rooted in Assam.
            <span> Connected to your vision.</span>
          </h2>

          <p className={styles.sectionDescription}>
            Great partnerships start with a conversation.
            Based in Guwahati, Shineweb Tech Creations helps
            businesses turn technology challenges into
            opportunities for growth.
          </p>
        </header>

        {/* Main location layout */}
        <div className={styles.locationLayout}>
          {/* Company information */}
          <div className={styles.locationInfo}>
            <div className={styles.infoTop}>
              <div className={styles.locationIcon}>
                <MapPin size={24} strokeWidth={1.7} />
              </div>

              <div className={styles.locationTag}>
                <span className={styles.statusDot} />
                <span>GUWAHATI, ASSAM</span>
              </div>
            </div>

            <p className={styles.cardEyebrow}>
              LET&apos;S CONNECT
            </p>

            <h3 className={styles.cardTitle}>
              Your next big idea
              <span> starts here.</span>
            </h3>

            <p className={styles.cardDescription}>
              From web development and custom software to
              digital marketing and IT infrastructure, we help
              businesses build reliable digital experiences.
              Let&apos;s discuss your requirements.
            </p>

            <div className={styles.divider} />

            {/* Company address */}
            <div className={styles.detail}>
              <div className={styles.detailIcon}>
                <MapPin size={19} />
              </div>

              <div className={styles.detailContent}>
                <span className={styles.detailLabel}>
                  OUR OFFICE
                </span>

                <strong>Shineweb Tech Creations</strong>

                <p>
                  Japorigog, Krishnanagar, Guwahati,
                  Assam 781005, India
                </p>
              </div>
            </div>

            {/* Business hours */}
            <div className={styles.detail}>
              <div className={styles.detailIcon}>
                <Clock3 size={19} />
              </div>

              <div className={styles.detailContent}>
                <span className={styles.detailLabel}>
                  BUSINESS HOURS
                </span>

                <strong>Monday – Saturday</strong>

                <p>9:00 AM – 6:00 PM IST</p>
              </div>
            </div>

            {/* Service coverage */}
            <div className={styles.detail}>
              <div className={styles.detailIcon}>
                <Navigation size={19} />
              </div>

              <div className={styles.detailContent}>
                <span className={styles.detailLabel}>
                  SERVICE AREA
                </span>

                <strong>Across India</strong>

                <p>
                  Digital services, software and IT solutions
                </p>
              </div>
            </div>

            {/* Primary action */}
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primaryButton}
              aria-label="Open Shineweb Tech Creations location in Google Maps"
            >
              <span>Explore our location</span>

              <span className={styles.buttonIcon}>
                <ArrowUpRight size={19} />
              </span>
            </a>

            <div className={styles.trustNote}>
              <ShieldCheck
                size={17}
                aria-hidden="true"
              />

              <span>
                Practical technology. Purposeful partnerships.
              </span>
            </div>
          </div>

          {/* Google Maps panel */}
          <div className={styles.mapPanel}>
            <div className={styles.mapHeader}>
              <div className={styles.mapHeading}>
                <span className={styles.mapIndicator} />

                <div>
                  <span className={styles.mapOverline}>
                    FIND OUR OFFICE
                  </span>

                  <strong>Shineweb Tech Creations</strong>
                </div>
              </div>

              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapIconButton}
                aria-label="Open the company location in Google Maps"
                title="Open Google Maps"
              >
                <ExternalLink size={18} />
              </a>
            </div>

            {/* Interactive map */}
            <div className={styles.mapFrame}>
              <iframe
                title="Google Maps showing Shineweb Tech Creations in Guwahati, Assam"
                src={mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

              {/* Decorative overlay; does not block map interaction */}
              <div
                className={styles.mapOverlay}
                aria-hidden="true"
              >
                <div className={styles.mapLocationCard}>
                  <div className={styles.mapPinIcon}>
                    <MapPin size={23} />
                  </div>

                  <div className={styles.mapLocationText}>
                    <strong>Shineweb Tech Creations</strong>

                    <span>
                      Japorigog, Guwahati, Assam
                    </span>
                  </div>

                  <ArrowUpRight
                    className={styles.mapLocationArrow}
                    size={19}
                  />
                </div>
              </div>
            </div>

            {/* Map footer */}
            <div className={styles.mapFooter}>
              <div className={styles.mapBrand}>
                <div
                  className={styles.brandMark}
                  aria-hidden="true"
                >
                  <Image
                                src="/logo.svg"
                                alt="Shineweb Tech Creations"
                                width={30}
                                height={30}
                                priority
                                className={styles.brandLogo}
                              />
                  <span className={styles.brandMarkDot} />
                </div>

                <div className={styles.brandInfo}>
                  <strong>Shineweb Tech Creations</strong>
                  <span>
                    Ideas into digital reality.
                  </span>
                </div>
              </div>

              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.directionsLink}
              >
                <span>Get directions</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Closing statement */}
        <div className={styles.locationBottom}>
          <span className={styles.bottomLine} />

          <p>
            Local understanding.{" "}
            <span>Technology without boundaries.</span>
          </p>

          <span className={styles.bottomLine} />
        </div>
      </div>
    </section>
  );
}
