"use client";

import Link from "next/link";
import {
ArrowLeft,
ArrowRight,
Home,
ShieldAlert,
} from "lucide-react";
import styles from "./NotFound.module.css";

export default function NotFound() {
return (
<main className={styles.page}>
<div className={styles.gridBackground} />
<div className={styles.glow} />

  <div className={styles.container}>
    <Link href="/" className={styles.brand}>
      <span className={styles.logo}>SW</span>
      <span className={styles.brandText}>
        <strong>Shineweb</strong>
        <small>TECH CREATIONS</small>
      </span>
    </Link>

    <section className={styles.content}>
      <div className={styles.visual}>
        <div className={`${styles.orbit} ${styles.orbitOne}`} />
        <div className={`${styles.orbit} ${styles.orbitTwo}`} />

        <div className={styles.errorCode}>
          <span>4</span>
          <div className={styles.errorIcon}>
            <ShieldAlert size={48} strokeWidth={1.4} />
          </div>
          <span>4</span>
        </div>
      </div>

      <span className={styles.badge}>
        <span className={styles.dot} />
        ERROR 404 — PAGE NOT FOUND
      </span>

      <h1>
        Lost in the
        <span> digital space?</span>
      </h1>

      <p className={styles.description}>
        The page you are looking for might have been removed,
        renamed, or temporarily unavailable. Let us help you
        find your way back.
      </p>

      <div className={styles.actions}>
        <Link href="/" className={styles.primaryButton}>
          <Home size={18} />
          Back to Homepage
          <ArrowRight size={17} />
        </Link>

        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={17} />
          Go Back
        </button>
      </div>

      <div className={styles.quickLinks}>
        <span>QUICK LINKS</span>
        <nav aria-label="Quick links">
          <Link href="/services">Services</Link>
          <Link href="/about">About Us</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </section>

    <footer className={styles.footer}>
      © {new Date().getFullYear()} Shineweb Tech Creations
      <span>
        <span className={styles.dot} />
        Building digital experiences
      </span>
    </footer>
  </div>
</main>

);
}