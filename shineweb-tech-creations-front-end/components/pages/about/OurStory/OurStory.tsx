
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  Globe2,
  Layers3,
  Network,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

import styles from "./OurStory.module.css";

const capabilities = [
  {
    id: "01",
    name: "Digital experiences",
    detail: "Websites & software",
    icon: Globe2,
    className: "digital",
  },
  {
    id: "02",
    name: "Connected systems",
    detail: "Infrastructure & networks",
    icon: Network,
    className: "systems",
  },
  {
    id: "03",
    name: "Trusted technology",
    detail: "Security & IT solutions",
    icon: ShieldCheck,
    className: "security",
  },
];

const journey = [
  {
    number: "01",
    title: "Start with the challenge",
    description:
      "We begin by understanding your business, identifying the real challenge, and defining a practical path forward.",
  },
  {
    number: "02",
    title: "Bring technology together",
    description:
      "We connect websites, software, devices, infrastructure, and security into solutions designed around your needs.",
  },
  {
    number: "03",
    title: "Build for what comes next",
    description:
      "We prioritise reliability, maintainability, and thoughtful engineering so your technology can evolve with your business.",
  },
];

export default function OurStory() {
  return (
    <section
      id="our-story"
      className={styles.story}
      aria-labelledby="our-story-title"
    >
      <div className={styles.ambientGlow} aria-hidden="true" />
      <div className={styles.backgroundGrid} aria-hidden="true" />

      <div className={styles.container}>
        {/* Section heading */}
        <header className={styles.sectionHeader}>
          <div className={styles.sectionIdentity}>
            <Image
              src="/logo.svg"
              alt="Shineweb Tech Creations"
              width={38}
              height={38}
              className={styles.identityLogo}
              priority={false}
            />

            <span>OUR STORY</span>
          </div>

          <span className={styles.headerMeta}>
            INDEPENDENT THINKING. CONNECTED TECHNOLOGY.
          </span>
        </header>

        {/* Main story */}
        <div className={styles.heroGrid}>
          <div className={styles.storyCopy}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              A DIFFERENT WAY TO THINK ABOUT IT
            </span>

            <h2 id="our-story-title" className={styles.heading}>
              Technology should
              <br />
              move business
              <br />
              <span>forward.</span>
            </h2>

            <p className={styles.intro}>
              We created Shineweb Tech Creations around a straightforward
              belief: the right technology should make business simpler,
              stronger, and ready for what comes next.
            </p>

            <p className={styles.description}>
              From the first digital touchpoint to the systems behind
              the scenes, we bring web development, software, IT
              infrastructure, hardware, software licensing, and security
              into one connected perspective.
            </p>

            <p className={styles.description}>
              We focus on understanding the problem before choosing the
              technology. Our goal is to develop practical solutions that
              serve real needs, fit the business, and provide a dependable
              foundation for growth.
            </p>

            <div className={styles.storyValues}>
              <span>
                <Check size={15} aria-hidden="true" />
                Purpose-led solutions
              </span>

              <span>
                <Check size={15} aria-hidden="true" />
                Practical engineering
              </span>

              <span>
                <Check size={15} aria-hidden="true" />
                Long-term thinking
              </span>
            </div>

            <div className={styles.actions}>
              <Link href="/contact" className={styles.primaryButton}>
                Start a conversation
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>

              <Link href="/services" className={styles.textLink}>
                Explore what we do
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Connected technology visual */}
          <div className={styles.storyVisual}>
            <div className={styles.visualTop}>
              <div className={styles.visualLabel}>
                <span className={styles.statusDot} />
                OUR CONNECTED APPROACH
              </div>

              {/* <span className={styles.visualCode}>FIG. 001</span> */}
            </div>

            <div
              className={styles.constellation}
              role="img"
              aria-label="Shineweb emblem connected to digital experiences, infrastructure, networks, and security"
            >
              <div className={styles.constellationGlow} />

              <div
                className={`${styles.ring} ${styles.ringOne}`}
                aria-hidden="true"
              />

              <div
                className={`${styles.ring} ${styles.ringTwo}`}
                aria-hidden="true"
              />

              <div
                className={`${styles.ring} ${styles.ringThree}`}
                aria-hidden="true"
              />

              <svg
                className={styles.connections}
                viewBox="0 0 440 440"
                fill="none"
                aria-hidden="true"
              >
                <path d="M220 220 L110 112" />
                <path d="M220 220 L330 112" />
                <path d="M220 220 L110 328" />
                <path d="M220 220 L330 328" />

                <circle cx="110" cy="112" r="3" />
                <circle cx="330" cy="112" r="3" />
                <circle cx="110" cy="328" r="3" />
                <circle cx="330" cy="328" r="3" />
              </svg>

              {/* Central brand identity */}
              <div className={styles.brandCore}>
                <div className={styles.brandLogoFrame}>
                  <Image
                    src="/logo.svg"
                    alt=""
                    aria-hidden="true"
                    width={100}
                    height={100}
                    className={styles.brandLogo}
                  />
                </div>

                <span className={styles.brandName}>SHINEWEB</span>

                <span className={styles.brandSubtitle}>
                  TECH CREATIONS
                </span>

                <span className={styles.coreDivider} />

                <span className={styles.coreCaption}>
                  TECHNOLOGY
                  <br />
                  WITH PURPOSE
                </span>
              </div>

              {/* Capability nodes */}
              {capabilities.map((capability) => {
                const Icon = capability.icon;

                return (
                  <div
                    key={capability.id}
                    className={`${styles.capability} ${
                      styles[capability.className as keyof typeof styles]
                    }`}
                  >
                    <div className={styles.capabilityIcon}>
                      <Icon size={20} strokeWidth={1.6} />
                    </div>

                    <div className={styles.capabilityText}>
                      <span className={styles.capabilityId}>
                        {capability.id}
                      </span>

                      <strong>{capability.name}</strong>

                      <span className={styles.capabilityDetail}>
                        {capability.detail}
                      </span>
                    </div>
                  </div>
                );
              })}

              <div className={styles.orbitMarker} aria-hidden="true">
                <Sparkles size={15} />
              </div>
            </div>

            <div className={styles.visualBottom}>
              <div className={styles.visualBottomIcon}>
                <Workflow size={19} aria-hidden="true" />
              </div>

              <div className={styles.visualBottomCopy}>
                <span>ONE CONNECTED VISION</span>

                <p>
                  From individual tools to integrated solutions.
                </p>
              </div>

              <ArrowUpRight
                className={styles.bottomArrow}
                size={19}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        <div className={styles.sectionDivider} />

        {/* Our approach */}
        <section
          className={styles.journey}
          aria-labelledby="journey-title"
        >
          <div className={styles.journeyIntro}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              HOW WE THINK
            </span>

            <h3 id="journey-title">
              A better outcome
              <br />
              starts with <span>the right approach.</span>
            </h3>

            <p>
              Technology is only part of the answer. How we understand,
              design, and deliver it matters just as much.
            </p>

            <div className={styles.journeyNote}>
              <Compass size={19} aria-hidden="true" />

              <span>Problem first. Technology second.</span>
            </div>
          </div>

          <div className={styles.journeySteps}>
            {journey.map((step, index) => (
              <article
                className={styles.journeyStep}
                key={step.number}
              >
                <div className={styles.stepRail}>
                  <span className={styles.stepNumber}>
                    {step.number}
                  </span>

                  {index !== journey.length - 1 && (
                    <span className={styles.stepConnector} />
                  )}
                </div>

                <div className={styles.stepContent}>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>

                <ArrowUpRight
                  size={18}
                  className={styles.stepArrow}
                  aria-hidden="true"
                />
              </article>
            ))}
          </div>
        </section>

        {/* Closing statement */}
        <div className={styles.closing}>
          <div className={styles.closingIcon}>
            <Layers3 size={23} strokeWidth={1.5} />
          </div>

          <div className={styles.closingCopy}>
            <span>THE IDEA THAT DRIVES US</span>

            <p>
              Not technology for its own sake.
              <strong> Technology that makes a difference.</strong>
            </p>
          </div>

          <Link href="/contact" className={styles.closingLink}>
            Build with us
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
