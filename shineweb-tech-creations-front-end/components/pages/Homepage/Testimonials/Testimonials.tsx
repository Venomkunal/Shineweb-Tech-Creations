
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  Quote,
  MessageSquareQuote,
  Star,
} from "lucide-react";

import styles from "./Testimonials.module.css";
import {
  getTestimonials,
  type Testimonial,
} from "@/lib/testimonials";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadTestimonials() {
      try {
        setLoading(true);
        setFailed(false);

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
          throw new Error("API URL is not configured.");
        }

        const response = await fetch(
          `${apiUrl.replace(/\/+$/, "")}/testimonials`,
          { signal: controller.signal, cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error("Could not load testimonials.");
        }

        const result = await response.json();

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error("Invalid testimonials response.");
        }

        setTestimonials(result.data);
      } catch {
        if (!controller.signal.aborted) {
          setFailed(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadTestimonials();

    return () => controller.abort();
  }, []);

  const highlights = [
    { value: "01", label: "Dedicated partnership" },
    { value: "02", label: "Business-focused solutions" },
    { value: "03", label: "Ongoing technical support" },
  ];

  return (
    <section
      className={styles.section}
      id="testimonials"
      aria-labelledby="testimonials-title"
    >
      <div className={styles.backgroundGlow} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headingContent}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              <span>CLIENT EXPERIENCES</span>
            </div>

            <h2 id="testimonials-title" className={styles.title}>
              Built on trust.
              <br />
              <span>Driven by results.</span>
            </h2>

            <p className={styles.description}>
              Great technology starts with understanding your
              business. Discover what working with Shineweb Tech
              Creations means to our clients.
            </p>
          </div>

          <Link href="/contact" className={styles.headerLink}>
            Work with us
            <ArrowDownRight size={18} aria-hidden="true" />
          </Link>
        </div>

        {loading ? (
          <div
            className={styles.testimonialGrid}
            aria-label="Loading testimonials"
            aria-busy="true"
          >
            {[1, 2, 3].map((item) => (
              <div className={styles.card} key={item}>
                <div className={styles.cardTop}>
                  <div className={styles.quoteIcon}>
                    <Quote size={23} aria-hidden="true" />
                  </div>
                </div>
                <p className={styles.reviewText}>
                  Loading customer feedback...
                </p>
              </div>
            ))}
          </div>
        ) : failed ? (
          <p role="status" className={styles.description}>
            Customer testimonials are temporarily unavailable.
          </p>
        ) : testimonials.length === 0 ? (
          <p className={styles.description}>
            Customer testimonials will appear here soon.
          </p>
        ) : (
          <div className={styles.testimonialGrid}>
            {testimonials.map((testimonial, index) => {
              const initials = testimonial.name
                .trim()
                .split(/\s+/)
                .slice(0, 2)
                .map((part) => part[0])
                .join("")
                .toUpperCase();

              return (
                <article
                  className={`${styles.card} ${
                    index === 1 ? styles.featuredCard : ""
                  }`}
                  key={testimonial._id}
                >
                  <div className={styles.cardTop}>
                    <div className={styles.quoteIcon}>
                      <Quote size={23} aria-hidden="true" />
                    </div>
                    <span className={styles.cardNumber}>
                      / {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <span className={styles.category}>
                    {testimonial.category}
                  </span>

                  <div
                    className={styles.rating}
                    aria-label={`${testimonial.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }, (_, starIndex) => (
                      <Star
                        key={starIndex}
                        size={15}
                        fill={
                          starIndex < testimonial.rating
                            ? "currentColor"
                            : "none"
                        }
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <p className={styles.reviewText}>
                    “{testimonial.text}”
                  </p>

                  <div className={styles.cardDivider} />

                  <div className={styles.reviewer}>
                    {testimonial.avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        className={styles.avatar}
                        src={testimonial.avatarUrl}
                        alt=""
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className={styles.avatar}
                        aria-hidden="true"
                      >
                        {initials || "CL"}
                      </div>
                    )}

                    <div className={styles.reviewerInfo}>
                      <h3>{testimonial.name}</h3>
                      <p>
                        {testimonial.role}
                        {testimonial.role && testimonial.company && (
                          <span className={styles.companyDot}>·</span>
                        )}
                        {testimonial.company}
                      </p>
                    </div>

                    <div className={styles.reviewerArrow}>
                      <ArrowRight size={17} aria-hidden="true" />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className={styles.bottomPanel}>
          <div className={styles.bottomIntro}>
            <div className={styles.bottomIcon}>
              <MessageSquareQuote size={21} aria-hidden="true" />
            </div>
            <div>
              <h3>Have a project in mind?</h3>
              <p>
                Let's create something that works for your business.
              </p>
            </div>
          </div>

          <div className={styles.highlights}>
            {highlights.map((item) => (
              <div className={styles.highlight} key={item.value}>
                <span>{item.value}</span>
                <p>{item.label}</p>
              </div>
            ))}
          </div>

          <Link href="/contact" className={styles.ctaButton}>
            Start a conversation
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.footerNote}>
          <span className={styles.footerDot} />
          <p>Your business goals. Our technology expertise.</p>
        </div>
      </div>
    </section>
  );
}
