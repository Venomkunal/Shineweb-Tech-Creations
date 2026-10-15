"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Mail,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import styles from "./ContactForm.module.css";

const SERVICES = [
  "Website Development",
  "Software Development",
  "SEO & Digital Marketing",
  "UI/UX & Branding",
  "IT Infrastructure & Networking",
  "Hardware & Software Procurement",
  "Microsoft Licensing",
  "Hosting & Server Setup",
  "Technical Support",
  "Other",
];

const BUDGETS = [
  "Under ₹10,000",
  "₹10,000 – ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000+",
  "Need a consultation",
];

const CONTACT_EMAIL = "support@shinewebtechcretions.online";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isPreparing) return;

    const form = event.currentTarget;

    if (!form.reportValidity()) return;

    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const service = String(data.get("service") ?? "").trim();
    const budget = String(data.get("budget") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !service || !message) return;

    const subject = `Project Enquiry | ${service}`;

    const body = [
      "NEW PROJECT ENQUIRY",
      "===================",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Company: ${company || "Not provided"}`,
      `Service: ${service}`,
      `Estimated budget: ${budget || "Not specified"}`,
      "",
      "PROJECT DETAILS",
      "---------------",
      message,
      "",
      "Submitted through the Shineweb Tech Creations website.",
    ].join("\n");

    const mailto =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    setIsPreparing(true);
    setSubmitted(true);

    // Allow the status message to render before opening the email client.
    window.setTimeout(() => {
      window.location.href = mailto;
      setIsPreparing(false);
    }, 150);
  }

  return (
    <section
      id="contact-form"
      className={styles.formSection}
      aria-labelledby="contact-form-title"
    >
      <div className={styles.sectionContainer}>
        <div className={styles.sectionTopline}>
          <span className={styles.toplineIcon}>
            <Sparkles size={15} aria-hidden="true" />
          </span>
          <span>LET&apos;S BUILD SOMETHING MEANINGFUL</span>
        </div>

        <div className={styles.formLayout}>
          {/* Left: Introduction */}
          <aside className={styles.formIntro}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              <ClipboardList size={15} aria-hidden="true" />
              PROJECT ENQUIRY
            </span>

            <h2 id="contact-form-title">
              Your next big idea
              <span className={styles.headingAccent}>
                starts with a conversation.
              </span>
            </h2>

            <p className={styles.introDescription}>
              Tell us what you&apos;re planning. From websites and
              custom software to IT infrastructure and business
              technology, we&apos;ll help you identify the right
              solution for your goals.
            </p>

            <div className={styles.benefits}>
              <div className={styles.formBenefit}>
                <span className={styles.benefitIcon}>
                  <CheckCircle2 size={19} aria-hidden="true" />
                </span>
                <div>
                  <h3>Solutions built around you</h3>
                  <p>
                    Recommendations tailored to your requirements,
                    business, and budget.
                  </p>
                </div>
              </div>

              <div className={styles.formBenefit}>
                <span className={styles.benefitIcon}>
                  <ShieldCheck size={19} aria-hidden="true" />
                </span>
                <div>
                  <h3>Clear scope, no guesswork</h3>
                  <p>
                    Understand the proposed approach, deliverables,
                    and next steps.
                  </p>
                </div>
              </div>

              <div className={styles.formBenefit}>
                <span className={styles.benefitIcon}>
                  <Clock3 size={19} aria-hidden="true" />
                </span>
                <div>
                  <h3>Focused on practical outcomes</h3>
                  <p>
                    Start with your objectives and work toward a
                    solution that makes business sense.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.directContact}>
              <div className={styles.directContactIcon}>
                <Mail size={19} aria-hidden="true" />
              </div>

              <div className={styles.directContactContent}>
                <span className={styles.directContactLabel}>
                  PREFER EMAIL?
                </span>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className={styles.emailLink}
                >
                  {CONTACT_EMAIL}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className={styles.privacyNote}>
              <ShieldCheck size={16} aria-hidden="true" />
              <p>
                Share only the information necessary to discuss your
                project. Please don&apos;t include passwords or
                confidential credentials.
              </p>
            </div>
          </aside>

          {/* Right: Form */}
          <div className={styles.formCard}>
            <div className={styles.formCardHeading}>
              <div>
                <span className={styles.cardEyebrow}>
                  GET STARTED
                </span>
                <h3>Tell us about your project</h3>
                <p>
                  Complete the details below to prepare your enquiry.
                </p>
              </div>

              <div className={styles.formCardIcon}>
                <MessageCircle size={22} aria-hidden="true" />
              </div>
            </div>

            <div className={styles.formDivider} />

            <form
              className={styles.contactForm}
              onSubmit={handleSubmit}
            >
              <div className={styles.fieldGrid}>
                <div className={styles.field}>
                  <label htmlFor="contact-name">
                    Full name <span>*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    maxLength={100}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-email">
                    Business email <span>*</span>
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
                  <label htmlFor="contact-company">
                    Company / organisation
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    placeholder="Your organisation"
                    autoComplete="organization"
                    maxLength={150}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-service">
                    Service required <span>*</span>
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

                    {SERVICES.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-budget">
                    Estimated budget
                  </label>
                  <select
                    id="contact-budget"
                    name="budget"
                    defaultValue=""
                  >
                    <option value="">Select a budget</option>

                    {BUDGETS.map((budget) => (
                      <option key={budget} value={budget}>
                        {budget}
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
                  placeholder="What are you looking to build or improve? Include your goals, key requirements, preferred timeline, or current challenges."
                  rows={5}
                  maxLength={5000}
                  required
                />
                <span className={styles.fieldHint}>
                  A little context helps us understand your needs.
                </span>
              </div>

              {submitted && (
                <div
                  className={styles.formNotice}
                  role="status"
                  aria-live="polite"
                >
                  <CheckCircle2 size={19} aria-hidden="true" />
                  <div>
                    <strong>Enquiry email prepared</strong>
                    <p>
                      Your email application should open shortly.
                      Review the draft and press Send to submit it.
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className={styles.primaryButton}
                disabled={isPreparing}
              >
                <span>
                  {isPreparing
                    ? "Preparing enquiry..."
                    : "Prepare my enquiry"}
                </span>
                <ArrowRight size={19} aria-hidden="true" />
              </button>

              <p className={styles.formDisclaimer}>
                <ShieldCheck size={14} aria-hidden="true" />
                <span>
                  This form prepares an email on your device. It does
                  not send or store your information on our server.
                </span>
              </p>
            </form>
          </div>
        </div>

        <div className={styles.bottomNote}>
          <span className={styles.bottomNoteLine} />
          <p>
            Have a complex requirement? Start with the big picture.
            We&apos;ll work through the details together.
          </p>
          <span className={styles.bottomNoteLine} />
        </div>
      </div>
    </section>
  );
}