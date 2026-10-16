
"use client";

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  LoaderCircle,
  Mail,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

import styles from "./RequestQuoteModal.module.css";

const services = [
  "Website Development",
  "Software Development",
  "UI/UX Design",
  "SEO & Digital Marketing",
  "Branding & Graphic Design",
  "Cloud Hosting & Server Setup",
  "IT Infrastructure & Networking",
  "Hardware & Software Procurement",
  "Microsoft Licensing",
  "Other Services",
];

const budgets = [
  "Under ₹10,000",
  "₹10,000 – ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹3,00,000",
  "₹3,00,000+",
  "Not sure yet",
];

const timelines = [
  "As soon as possible",
  "Within 2 weeks",
  "Within 1 month",
  "Within 2–3 months",
  "Flexible",
];

type QuoteForm = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  details: string;
};

type RequestQuoteModalProps = {
  open: boolean;
  onClose: () => void;
};

const initialForm: QuoteForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  budget: "",
  timeline: "",
  details: "",
};

export default function RequestQuoteModal({
  open,
  onClose,
}: RequestQuoteModalProps) {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<QuoteForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Wait until the component is mounted in the browser.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock page scrolling while the modal is open.
  useEffect(() => {
    if (!mounted || !open) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !loading) {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [mounted, open, loading, onClose]);

  function updateField(
    field: keyof QuoteForm,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setError("");
  }

  function closeModal() {
    if (loading) return;

    onClose();

    setForm(initialForm);
    setSubmitted(false);
    setError("");
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");

    if (!form.service) {
      setError("Please select a service.");
      return;
    }

    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error(
          "Quote submission is not configured yet. Please try again later."
        );
      }

      const response = await fetch(
        `${apiUrl.replace(/\/$/, "")}/api/quotes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            source: "Shineweb Tech Creations Website",
          }),
        }
      );

      if (!response.ok) {
        const result = await response
          .json()
          .catch(() => null);

        throw new Error(
          result?.message ||
            "We couldn't submit your request. Please try again."
        );
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  // Render the modal outside the header.
  if (!mounted || !open) return null;

  return createPortal(
    <div
      className={styles.overlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closeModal();
        }
      }}
    >
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-title"
        aria-describedby="quote-description"
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={closeModal}
          aria-label="Close quote request"
          disabled={loading}
        >
          <X size={20} />
        </button>

        <div className={styles.layout}>
          {/* LEFT BRANDING PANEL */}

          <aside className={styles.sidebar}>
            <div className={styles.brandMark}>
              <div className={styles.brandIcon}>
                <Image
              src="/shineweb_icon.png"
              alt=""
              width={35}
              height={35}
              priority
              className={styles.logoImage}
            />
              </div>

              <span>
                SHINEWEB
                <strong>TECH CREATIONS</strong>
              </span>
            </div>

            <div className={styles.sidebarContent}>
              <span className={styles.eyebrow}>
                <Sparkles size={14} />
                LET&apos;S BUILD SOMETHING
              </span>

              <h2>
                Your idea.
                <br />
                Our expertise.
                <br />
                <span>Your next big move.</span>
              </h2>

              <p>
                Tell us what you need. We&apos;ll help you
                find the right solution for your business.
              </p>

              <div className={styles.benefits}>
                <div className={styles.benefit}>
                  <span className={styles.benefitIcon}>
                    <CheckCircle2 size={18} />
                  </span>

                  <div>
                    <strong>Tailored proposals</strong>
                    <span>
                      Solutions designed around your needs
                    </span>
                  </div>
                </div>

                <div className={styles.benefit}>
                  <span className={styles.benefitIcon}>
                    <Clock3 size={18} />
                  </span>

                  <div>
                    <strong>Clear project scope</strong>
                    <span>
                      Understand costs and timelines
                    </span>
                  </div>
                </div>

                <div className={styles.benefit}>
                  <span className={styles.benefitIcon}>
                    <ShieldCheck size={18} />
                  </span>

                  <div>
                    <strong>Business-first approach</strong>
                    <span>
                      Practical, scalable solutions
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.sidebarFooter}>
              <MessageCircle size={16} />
              <span>
                Have a project in mind? Let&apos;s talk.
              </span>
            </div>
          </aside>

          {/* RIGHT FORM PANEL */}

          <div className={styles.formPanel}>
            {submitted ? (
              <div className={styles.successState}>
                <div className={styles.successIcon}>
                  <CheckCircle2 size={38} />
                </div>

                <span className={styles.eyebrow}>
                  REQUEST RECEIVED
                </span>

                <h2>
                  Thank you, {form.name.split(" ")[0]}!
                </h2>

                <p>
                  Your quote request has been submitted
                  successfully. Our team can review your
                  requirements and follow up with you.
                </p>

                <div className={styles.summary}>
                  <span>Selected service</span>
                  <strong>{form.service}</strong>

                  <span>Estimated budget</span>
                  <strong>
                    {form.budget || "Not specified"}
                  </strong>

                  <span>Preferred timeline</span>
                  <strong>
                    {form.timeline || "Not specified"}
                  </strong>
                </div>

                <button
                  type="button"
                  className={styles.submitButton}
                  onClick={closeModal}
                >
                  Done <CheckCircle2 size={18} />
                </button>
              </div>
            ) : (
              <>
                <div className={styles.formHeader}>
                  <span className={styles.eyebrow}>
                    <span className={styles.statusDot} />
                    PROJECT ENQUIRY
                  </span>

                  <h2 id="quote-title">
                    Request a Quote
                  </h2>

                  <p id="quote-description">
                    Share a few details to help us prepare
                    the right proposal for you.
                  </p>
                </div>

                <form
                  className={styles.form}
                  onSubmit={handleSubmit}
                >
                  <div className={styles.formGrid}>
                    <div className={styles.field}>
                      <label htmlFor="quote-name">
                        Full name <span>*</span>
                      </label>

                      <input
                        id="quote-name"
                        name="name"
                        autoComplete="name"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={(event) =>
                          updateField(
                            "name",
                            event.target.value
                          )
                        }
                        required
                        maxLength={100}
                      />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="quote-email">
                        Work email <span>*</span>
                      </label>

                      <input
                        id="quote-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={(event) =>
                          updateField(
                            "email",
                            event.target.value
                          )
                        }
                        required
                        maxLength={254}
                      />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="quote-phone">
                        Phone number <span>*</span>
                      </label>

                      <input
                        id="quote-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={form.phone}
                        onChange={(event) =>
                          updateField(
                            "phone",
                            event.target.value
                          )
                        }
                        required
                        maxLength={20}
                        pattern="[+0-9() .-]{7,20}"
                        title="Enter a valid phone number."
                      />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="quote-company">
                        Company name
                      </label>

                      <input
                        id="quote-company"
                        name="company"
                        autoComplete="organization"
                        placeholder="Your company"
                        value={form.company}
                        onChange={(event) =>
                          updateField(
                            "company",
                            event.target.value
                          )
                        }
                        maxLength={150}
                      />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="quote-service">
                        Service required <span>*</span>
                      </label>

                      <div className={styles.selectWrap}>
                        <select
                          id="quote-service"
                          name="service"
                          value={form.service}
                          onChange={(event) =>
                            updateField(
                              "service",
                              event.target.value
                            )
                          }
                          required
                        >
                          <option value="" disabled>
                            Select a service
                          </option>

                          {services.map((service) => (
                            <option
                              key={service}
                              value={service}
                            >
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="quote-budget">
                        Estimated budget
                      </label>

                      <div className={styles.selectWrap}>
                        <select
                          id="quote-budget"
                          name="budget"
                          value={form.budget}
                          onChange={(event) =>
                            updateField(
                              "budget",
                              event.target.value
                            )
                          }
                        >
                          <option value="">
                            Select a budget
                          </option>

                          {budgets.map((budget) => (
                            <option
                              key={budget}
                              value={budget}
                            >
                              {budget}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div
                      className={`${styles.field} ${styles.fullWidth}`}
                    >
                      <label htmlFor="quote-timeline">
                        Expected project timeline
                      </label>

                      <div className={styles.selectWrap}>
                        <select
                          id="quote-timeline"
                          name="timeline"
                          value={form.timeline}
                          onChange={(event) =>
                            updateField(
                              "timeline",
                              event.target.value
                            )
                          }
                        >
                          <option value="">
                            When would you like to start?
                          </option>

                          {timelines.map((timeline) => (
                            <option
                              key={timeline}
                              value={timeline}
                            >
                              {timeline}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div
                      className={`${styles.field} ${styles.fullWidth}`}
                    >
                      <label htmlFor="quote-details">
                        Project requirements <span>*</span>
                      </label>

                      <textarea
                        id="quote-details"
                        name="details"
                        placeholder="Describe your project, goals, required features, or technical requirements..."
                        value={form.details}
                        onChange={(event) =>
                          updateField(
                            "details",
                            event.target.value
                          )
                        }
                        required
                        rows={4}
                        maxLength={5000}
                      />

                      <span className={styles.charCount}>
                        {form.details.length}/5000
                      </span>
                    </div>
                  </div>

                  {error && (
                    <p
                      className={styles.errorMessage}
                      role="alert"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <LoaderCircle
                          size={19}
                          className={styles.spinner}
                        />
                        Submitting request...
                      </>
                    ) : (
                      <>
                        Submit Quote Request
                        <ArrowRight size={19} />
                      </>
                    )}
                  </button>

                  <p className={styles.privacyNote}>
                    <ShieldCheck size={15} />
                    Your information is used to respond to
                    your enquiry.
                  </p>

                  <div className={styles.alternative}>
                    <Mail size={15} />

                    <span>
                      Prefer email?{" "}
                      <a href="mailto:kunalsarma@shinewebtechcretions.online">
                        Contact our team
                      </a>
                    </span>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>,
    document.body
  );
}
