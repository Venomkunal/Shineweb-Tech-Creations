
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { FormEvent } from "react";
import styles from "./Footer.module.css";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const services = [
  { label: "IT Hardware Supply", href: "/services/it-hardware" },
  { label: "Software Licensing", href: "/services/software-licensing" },
  { label: "Web Development", href: "/services/web-development" },
  { label: "Software Development", href: "/services/software-development" },
  { label: "Networking & Infrastructure", href: "/services/networking" },
  { label: "IT Support & AMC", href: "/services/it-support" },
  { label: "Cloud & Security", href: "/services/cloud-security" },
];

const contactDetails = [
  {
    icon: "⌖",
    label: "Location",
    value: "Guwahati, Assam, India",
    href: "https://maps.google.com/?q=Guwahati,Assam,India",
  },
  {
    icon: "☎",
    label: "Phone",
    value: "+91 93656 963310",
    href: "tel:+9193656963310",
  },
  {
    icon: "✉",
    label: "Email",
    value: "support@shinewebtechcretions.online",
    href: "mailto:support@shinewebtechcretions.online",
  },
];

const socialLinks = [
  {
    label: "Facebook",
    short: "f",
    href: "https://www.facebook.com/profile.php?id=61585427836552",
  },
  {
    label: "Instagram",
    short: "◎",
    href: "https://www.instagram.com/shineweb_tech_creations/",
  },
  {
    label: "LinkedIn",
    short: "in",
    href: "https://www.linkedin.com/",
  },
  {
    label: "YouTube",
    short: "▶",
    href: "https://www.youtube.com/@ShinewebTechCreations",
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setMessage("Please enter your email address.");
      return;
    }

    const subject = encodeURIComponent("Newsletter Subscription Request");
    const body = encodeURIComponent(
      `Please add this email address to the Shineweb Tech Creations newsletter: ${normalizedEmail}`
    );

    setMessage("Opening your email application to send your request.");

    window.location.href =
      `mailto:support@shinewebtechcretions.online?subject=${subject}&body=${body}`;
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.main}>
          {/* Brand */}
          <div className={styles.brandColumn}>
            <Link
              href="/"
              className={styles.brand}
              aria-label="Shineweb Tech Creations home"
            >
              <span className={styles.logoMark}>
                <Image
                  src="/shineweb_icon.png"
                  alt=""
                  width={52}
                  height={52}
                  className={styles.logoImage}
                  priority
                />
              </span>

              <span className={styles.brandText}>
                <strong>SHINEWEB</strong>
                <span>TECH CREATIONS</span>
              </span>
            </Link>

            <p className={styles.brandDescription}>
              Your Tech Partner for a Smarter Tomorrow. IT products,
              software, networking, and web solutions — all under one roof.
            </p>

            <Link href="/contact" className={styles.brandCta}>
              Let&apos;s work together <span aria-hidden="true">↗</span>
            </Link>

            <div className={styles.socials} aria-label="Social media">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={social.label}
                >
                  {social.short}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav className={styles.linkColumn} aria-label="Quick links">
            <h2 className={styles.columnTitle}>Quick Links</h2>

            <ul className={styles.linkList}>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>
                    <span aria-hidden="true">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav className={styles.linkColumn} aria-label="Our services">
            <h2 className={styles.columnTitle}>Our Services</h2>

            <ul className={styles.linkList}>
              {services.map((service) => (
                <li key={service.label}>
                  <Link href={service.href}>
                    <span aria-hidden="true">›</span>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className={styles.contactColumn}>
            <h2 className={styles.columnTitle}>Contact Info</h2>

            <ul className={styles.contactList}>
              {contactDetails.map((contact) => (
                <li key={contact.label}>
                  <span className={styles.contactIcon} aria-hidden="true">
                    {contact.icon}
                  </span>

                  <div className={styles.contactContent}>
                    <span className={styles.contactLabel}>
                      {contact.label}
                    </span>

                    <a
                      href={contact.href}
                      target={
                        contact.label === "Location" ? "_blank" : undefined
                      }
                      rel={
                        contact.label === "Location"
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {contact.value}
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.hours}>
              <span className={styles.statusDot} aria-hidden="true" />

              <div>
                <strong>Business Hours</strong>
                <span>Mon – Sat: 9:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className={styles.newsletterColumn}>
            <div className={styles.newsletterIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="m4 7 8 6 8-6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h2 className={styles.columnTitle}>Stay Connected</h2>

            <p className={styles.newsletterDescription}>
              Get the latest products, technology updates, offers, and
              insights delivered to your inbox.
            </p>

            <form
              className={styles.newsletterForm}
              onSubmit={handleNewsletterSubmit}
            >
              <label className={styles.srOnly} htmlFor="footer-email">
                Your email address
              </label>

              <input
                id="footer-email"
                type="email"
                name="email"
                placeholder="Your email address"
                autoComplete="email"
                maxLength={254}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setMessage("");
                }}
                required
              />

              <button
                type="submit"
                aria-label="Request newsletter subscription"
              >
                <span aria-hidden="true">→</span>
              </button>
            </form>

            <p className={styles.formMessage} role="status" aria-live="polite">
              {message}
            </p>

            <p className={styles.newsletterNote}>
              <span aria-hidden="true">🔒</span>
              Your inbox, your choice. No spam.
            </p>

            <Link href="/contact" className={styles.helpLink}>
              Need expert advice?
              <span>Talk to our team ↗</span>
            </Link>
          </div>
        </div>

        {/* Copyright and legal links */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Shineweb Tech Creations.
            All rights reserved.
          </p>

          <div className={styles.bottomLinks}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span aria-hidden="true" />
            <Link href="/terms-and-conditions">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/917099093224"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsapp}
        aria-label="Chat with Shineweb Tech Creations on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2a9.87 9.87 0 0 0-8.49 14.9L2 22l5.24-1.52A9.99 9.99 0 0 0 12.04 22 10 10 0 0 0 12.04 2Zm0 18.18a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.1.9.93-3.02-.2-.31a8.15 8.15 0 1 1 6.8 3.74Zm4.47-6.1c-.25-.13-1.48-.73-1.71-.81-.23-.09-.4-.13-.57.13-.17.25-.65.81-.8.97-.15.17-.3.19-.56.06-.25-.13-1.07-.4-2.03-1.25-.75-.67-1.25-1.49-1.4-1.74-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.57-1.37-.78-1.88-.2-.49-.42-.42-.57-.43h-.49c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09 0 1.24.9 2.43 1.03 2.6.13.17 1.77 2.7 4.3 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.48-.61 1.69-1.2.21-.59.21-1.09.15-1.2-.07-.1-.23-.17-.49-.3Z" />
        </svg>
      </a>
    </footer>
  );
}
