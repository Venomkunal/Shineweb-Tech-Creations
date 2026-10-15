import { ArrowUpRight } from "lucide-react";
import styles from "./ContactFAQ.module.css";

const faqs = [
  {
    question: "What services does Shineweb Tech Creations offer?",
    answer:
      "Our services include website and software development, SEO, UI/UX design, branding, hosting, server setup, IT infrastructure, networking, hardware and software procurement, and Microsoft licensing.",
  },
  {
    question: "How can I request a project quotation?",
    answer:
      "Complete the enquiry form with your required service and project details. We can use this information to understand your scope and discuss a suitable quotation.",
  },
  {
    question: "Do you work with businesses outside Guwahati?",
    answer:
      "Yes. We can discuss projects with businesses across India. The delivery approach depends on the service, project requirements, and any onsite support needed.",
  },
  {
    question: "Can you help with existing websites or IT systems?",
    answer:
      "Yes. Contact us with details of your existing website, software, server, or network issue so we can evaluate the requirements and determine an appropriate next step.",
  },
  {
    question: "How long does a website or software project take?",
    answer:
      "Timelines depend on scope, complexity, integrations, content, and approvals. We can establish milestones after understanding your requirements.",
  },
];

export default function ContactFAQ() {
  return (
    <section className={styles.faqSection}>
      <div className={styles.sectionContainer}>
        <div className={styles.faqLayout}>
          <div className={styles.faqIntro}>
            <span className={styles.eyebrow}>GOOD TO KNOW</span>
            <h2>
              A few things you might
              <span> want to know.</span>
            </h2>
            <p>
              Have another question? Contact our team directly.
            </p>

            <a
              href="mailto:support@shinewebtechcretions.online"
              className={styles.textLink}
            >
              Ask us a question
              <ArrowUpRight size={17} />
            </a>
          </div>

          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <details className={styles.faqItem} key={faq.question}>
                <summary>
                  <span className={styles.faqNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.faqQuestion}>
                    {faq.question}
                  </span>
                  <span className={styles.faqPlus} aria-hidden="true" />
                </summary>
                <p className={styles.faqAnswer}>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}