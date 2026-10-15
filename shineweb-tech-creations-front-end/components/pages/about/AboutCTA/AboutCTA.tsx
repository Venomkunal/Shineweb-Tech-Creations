
import Link from "next/link";
import {
    ArrowRight,
    ArrowUpRight,
    CheckCircle2,
    Sparkles,
} from "lucide-react";
import Image from "next/image";
import styles from "./AboutCTA.module.css";

const benefits = [
    "Solutions tailored to your business",
    "Technology built for long-term growth",
    "A dedicated team focused on results",
];

export default function AboutCTA() {
    return (
        <section className={styles.section} aria-labelledby="about-cta-title">
            <div className={styles.container}>
                <div className={styles.panel}>
                    <div className={styles.gridPattern} aria-hidden="true" />
                    <div className={styles.glowOne} aria-hidden="true" />
                    <div className={styles.glowTwo} aria-hidden="true" />

                    <div className={styles.content}>
                        <span className={styles.eyebrow}>
                            <Sparkles size={15} aria-hidden="true" />
                            LET'S BUILD SOMETHING BETTER
                        </span>

                        <h2 id="about-cta-title" className={styles.title}>
                            Your Vision.
                            <br />
                            Our <span>Technology.</span>
                            <br />
                            Endless Possibilities.
                        </h2>

                        <p className={styles.description}>
                            Every great business deserves technology that moves it forward.
                            Let's turn your ideas into meaningful digital experiences with
                            solutions designed around your goals.
                        </p>

                        <ul className={styles.benefits}>
                            {benefits.map((benefit) => (
                                <li key={benefit}>
                                    <CheckCircle2
                                        size={18}
                                        className={styles.checkIcon}
                                        aria-hidden="true"
                                    />
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>

                        <div className={styles.actions}>
                            <Link href="/contact" className={styles.primaryButton}>
                                Let's Talk About Your Project
                                <ArrowRight size={18} aria-hidden="true" />
                            </Link>

                            <Link href="/services" className={styles.secondaryButton}>
                                Explore Our Services
                                <ArrowUpRight size={18} aria-hidden="true" />
                            </Link>
                        </div>

                        <p className={styles.note}>
                            From the first idea to the final solution — let's make it happen.
                        </p>
                    </div>

                    <div className={styles.visual} aria-hidden="true">
                        <div className={`${styles.orbit} ${styles.orbitOne}`} />
                        <div className={`${styles.orbit} ${styles.orbitTwo}`} />
                        <div className={`${styles.orbit} ${styles.orbitThree}`} />

                        <div className={styles.centerLogo}>
                            <Image
                                src="/logo.svg"
                                alt="Shineweb Tech Creations"
                                width={58}
                                height={58}
                                className={styles.identityLogo}
                                priority={false}
                            />
                            {/* <span className={styles.logoLetters}>SW</span> */}
                            <span className={styles.logoCaption}>SHINEWEB</span>
                        </div>

                        <div className={`${styles.node} ${styles.nodeTop}`}>
                            <span className={styles.nodeDot} />
                            <span>INNOVATION</span>
                        </div>

                        <div className={`${styles.node} ${styles.nodeRight}`}>
                            <span className={styles.nodeDot} />
                            <span>TECHNOLOGY</span>
                        </div>

                        <div className={`${styles.node} ${styles.nodeBottom}`}>
                            <span className={styles.nodeDot} />
                            <span>GROWTH</span>
                        </div>

                        <div className={`${styles.node} ${styles.nodeLeft}`}>
                            <span className={styles.nodeDot} />
                            <span>YOUR VISION</span>
                        </div>

                        <span className={`${styles.spark} ${styles.sparkOne}`} />
                        <span className={`${styles.spark} ${styles.sparkTwo}`} />
                        <span className={`${styles.spark} ${styles.sparkThree}`} />
                    </div>

                    <div className={styles.bottomLine} aria-hidden="true" />
                </div>
            </div>
        </section>
    );
}
