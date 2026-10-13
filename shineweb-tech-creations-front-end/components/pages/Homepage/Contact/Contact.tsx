
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Globe2,
  Mail,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import styles from "./Contact.module.css";

const enquiryTypes = [
  "Hardware & IT Products",
  "Website Development",
  "Custom Software",
  "Networking & Cybersecurity",
  "Microsoft Licensing",
  "IT Support & AMC",
  "Other Enquiry",
];

export default function Contact() {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const service = String(data.get("service") || "");
    const message = String(data.get("message") || "").trim();

    const subject = encodeURIComponent(
      `Website Enquiry — ${service}`
    );

    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone || "Not provided"}\n` +
      `Service: ${service}\n\n` +
      `Project details:\n${message}`
    );

    setIsSubmitting(true);
    setStatus("Opening your email application…");

    window.location.href =
      `mailto:kunalsarma@shinewebtechcretions.online` +
      `?subject=${subject}&body=${body}`;

    window.setTimeout(() => {
      setIsSubmitting(false);
      setStatus(
        "If your email application did not open, email us directly at kunalsarma@shinewebtechcretions.online."
      );
    }, 1200);
  }

  return (
    <section
      className={styles.contact}
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className={styles.orb} aria-hidden="true" />
      <div className={styles.gridPattern} aria-hidden="true" />

      <div className={styles.container}>
        {/* Section heading */}
        <div className={styles.heading}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIcon}>
              <Sparkles size={15} />
            </span>
            <span>LET&apos;S BUILD SOMETHING BETTER</span>
            <span className={styles.eyebrowLine} />
          </div>

          <h2 id="contact-title" className={styles.title}>
            Your next big idea
            <br />
            starts <span>with a conversation.</span>
          </h2>

          <p className={styles.subtitle}>
            From business technology and IT infrastructure to websites,
            software, and cybersecurity, we help you find the right
            solution for your business.
          </p>
        </div>

        <div className={styles.layout}>
          {/* Left: Contact information */}
          <aside className={styles.info}>
            <div className={styles.infoHeader}>
              <span className={styles.infoLabel}>
                <MessageSquare size={16} />
                TALK TO OUR TEAM
              </span>

              <h3>
                Let&apos;s understand
                <br />
                <span>your requirements.</span>
              </h3>

              <p>
                Tell us what you are planning. We&apos;ll help you explore
                the right technology, services, and next steps.
              </p>
            </div>

            <div className={styles.contactLinks}>
              <a
                className={styles.contactLink}
                href="mailto:kunalsarma@shinewebtechcretions.online"
              >
                <span className={styles.contactIcon}>
                  <Mail size={19} />
                </span>
                <span className={styles.contactText}>
                  <span className={styles.contactLabel}>EMAIL US</span>
                  <span className={styles.contactValue}>
                    kunalsarma@shinewebtechcretions.online
                  </span>
                </span>
                <ArrowUpRight
                  size={17}
                  className={styles.linkArrow}
                />
              </a>

              <div className={styles.contactLink}>
                <span className={styles.contactIcon}>
                  <MapPin size={19} />
                </span>
                <span className={styles.contactText}>
                  <span className={styles.contactLabel}>
                    OUR LOCATION
                  </span>
                  <span className={styles.contactValue}>
                    Guwahati, Assam, India
                  </span>
                </span>
                <Globe2
                  size={17}
                  className={styles.linkArrow}
                />
              </div>
            </div>

            <div className={styles.responseCard}>
              <span className={styles.responseIcon}>
                <Clock3 size={19} />
              </span>
              <div>
                <strong>Every project starts with clarity.</strong>
                <p>
                  Share your requirements and we&apos;ll discuss the
                  scope, suitable solutions, and quotation.
                </p>
              </div>
            </div>

            <div className={styles.trustNote}>
              <ShieldCheck size={17} />
              <span>
                Your project enquiry stays between you and our team.
              </span>
            </div>

            <div className={styles.infoBottom}>
              <span>SHINEWEB TECH CREATIONS</span>
              <ArrowDownRight size={21} />
            </div>
          </aside>

          {/* Right: Enquiry form */}
          <div className={styles.formPanel}>
            <div className={styles.formTop}>
              <div>
                <span className={styles.formEyebrow}>
                  PROJECT ENQUIRY
                </span>
                <h3>Tell us about your project</h3>
                <p>
                  Fill in the details below to prepare your enquiry.
                </p>
              </div>

              <div className={styles.formBadge}>
                <MessageSquare size={19} />
              </div>
            </div>

            <form
              className={styles.form}
              onSubmit={handleSubmit}
            >
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="contact-name">
                    Full name <span>*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    autoComplete="name"
                    maxLength={100}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-email">
                    Work email <span>*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    maxLength={254}
                    required
                  />
                </div>
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="contact-phone">
                    Phone number
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    autoComplete="tel"
                    maxLength={30}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-service">
                    Interested in <span>*</span>
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {enquiryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-message">
                  Project details <span>*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell us what you need, your goals, project scope, or any specific requirements..."
                  rows={5}
                  maxLength={5000}
                  required
                />
                <span className={styles.fieldHint}>
                  A little detail helps us understand your requirements.
                </span>
              </div>

              <button
                className={styles.submitButton}
                type="submit"
                disabled={isSubmitting}
              >
                <span>
                  {isSubmitting
                    ? "Preparing enquiry..."
                    : "Let's discuss your project"}
                </span>
                <ArrowRight size={19} />
              </button>

              <p className={styles.formFootnote}>
                <CheckCircle2 size={15} />
                No commitment required. Just a conversation about your
                project.
              </p>

              {status && (
                <p className={styles.statusMessage} role="status">
                  {status}
                </p>
              )}
            </form>

            <div className={styles.formFooter}>
              <span>HAVE A QUICK QUESTION?</span>
              <Link href="/contact">
                Visit our contact page
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={styles.bottomCta}>
          <div className={styles.bottomCtaText}>
            <span className={styles.bottomCtaDot} />
            <p>
              <strong>Have a bigger project in mind?</strong>{" "}
              Let&apos;s plan the right solution for your business.
            </p>
          </div>

          <Link href="/contact?type=quote" className={styles.quoteLink}>
            Request a quotation
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
