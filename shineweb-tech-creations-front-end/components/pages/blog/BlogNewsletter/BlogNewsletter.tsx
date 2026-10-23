
"use client";

import { FormEvent, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import styles from "./BlogNewsletter.module.css";

type SubscriptionState = "idle" | "loading" | "success" | "error";

export default function BlogNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubscriptionState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error("The newsletter API is not configured yet.");
      }

      const response = await fetch(`${apiUrl}/newsletter/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message || "Subscription failed. Please try again."
        );
      }

      setStatus("success");
      setMessage(
        result.message || "You're subscribed! Watch your inbox for updates."
      );
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <section className={styles.section} aria-labelledby="newsletter-title">
      <div className={styles.container}>
        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.gridPattern} aria-hidden="true" />

        <div className={styles.content}>
          <span className={styles.eyebrow}>
            <Sparkles size={14} />
            The Shineweb Brief
          </span>

          <h2 id="newsletter-title" className={styles.title}>
            Technology insights.
            <br />
            <span>Delivered to your inbox.</span>
          </h2>

          <p className={styles.description}>
            Get practical guides, digital trends, development tips, and
            technology insights to help your business move forward.
          </p>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <label className={styles.emailField}>
              <Mail size={19} aria-hidden="true" />

              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                aria-label="Email address"
                aria-describedby="newsletter-message"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);

                  if (status !== "loading") {
                    setStatus("idle");
                    setMessage("");
                  }
                }}
                disabled={status === "loading"}
                required
              />
            </label>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <span className={styles.spinner} />
                  Subscribing
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          <div
            id="newsletter-message"
            className={`${styles.message} ${
              status === "success"
                ? styles.successMessage
                : status === "error"
                  ? styles.errorMessage
                  : ""
            }`}
            role="status"
            aria-live="polite"
          >
            {status === "success" && <CheckCircle2 size={17} />}
            {message}
          </div>

          <div className={styles.privacy}>
            <ShieldCheck size={15} />
            <span>
              Useful insights only. No spam. Unsubscribe whenever you want.
            </span>
          </div>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <div className={styles.orbitOuter}>
            <span className={styles.orbitNode} />
            <span className={styles.orbitNode} />
          </div>

          <div className={styles.orbitInner}>
            <span className={styles.orbitNodeInner} />
          </div>

          <div className={styles.mailCard}>
            <div className={styles.mailCardHeader}>
              <span className={styles.mailIcon}>
                <Mail size={23} />
              </span>

              <span className={styles.mailStatus}>
                <span />
                INSIGHT UPDATE
              </span>
            </div>

            <div className={styles.mailLine} />
            <div className={`${styles.mailLine} ${styles.mailLineShort}`} />
            <div className={`${styles.mailLine} ${styles.mailLineMedium}`} />

            <div className={styles.mailCardFooter}>
              <span>Ideas for what&apos;s next</span>
              <Send size={16} />
            </div>
          </div>

          <div className={styles.floatingLabel}>
            <CheckCircle2 size={16} />
            <span>Stay ahead</span>
          </div>
        </div>
      </div>
    </section>
  );
}
