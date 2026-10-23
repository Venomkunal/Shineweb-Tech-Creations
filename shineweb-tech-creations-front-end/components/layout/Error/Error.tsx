
"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
  ShieldAlert,
} from "lucide-react";

import styles from "./Error.module.css";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({
  error,
  reset,
}: ErrorProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className={styles.errorPage}>
      <div className={styles.glow} />

      <section className={styles.container}>
        <div className={styles.badge}>
          <span className={styles.dot} />
          SYSTEM ERROR
        </div>

        <div className={styles.iconBox}>
          <ShieldAlert size={42} />
        </div>

        <p className={styles.code}>ERROR 500</p>

        <h1>
          Something went
          <span> wrong.</span>
        </h1>

        <p className={styles.description}>
          An unexpected error occurred while processing
          your request. Please try again or return to
          our homepage.
        </p>

        {error.digest && (
          <p className={styles.reference}>
            Reference ID: {error.digest}
          </p>
        )}

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={reset}
          >
            <RefreshCw size={17} />
            Try Again
          </button>

          <Link href="/" className={styles.secondaryButton}>
            <ArrowLeft size={17} />
            Back to Home
          </Link>
        </div>

        <div className={styles.support}>
          <AlertTriangle size={20} />
          <div>
            <h2>Need assistance?</h2>
            <p>
              Contact our support team if the problem
              continues.
            </p>
            <a href="mailto:kunalsarma@shinewebtechcretions.online">
              Contact Support
            </a>
          </div>
        </div>

        <footer className={styles.footer}>
          <span className={styles.brand}>SW</span>
          Shineweb Tech Creations
        </footer>
      </section>
    </main>
  );
}
