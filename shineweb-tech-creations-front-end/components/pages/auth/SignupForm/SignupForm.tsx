"use client";

import {
  useState,
  type FormEvent,
  type ChangeEvent,
} from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
  Phone,
  Sparkles,
} from "lucide-react";

import styles from "./SignupForm.module.css";

type SignupFields = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

type ApiResponse = {
  message?: string;
  error?: string;
};

const initialFields: SignupFields = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export default function SignupForm() {
  const router = useRouter();

  const [fields, setFields] =
    useState<SignupFields>(initialFields);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target;

    setFields((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  }

  function validateForm(): string | null {
    const name = fields.name.trim();
    const email = fields.email.trim();

    if (name.length < 2 || name.length > 100) {
      return "Name must contain between 2 and 100 characters.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Enter a valid email address.";
    }

    if (
      fields.phone &&
      !/^\+?[0-9\s()-]{7,20}$/.test(fields.phone)
    ) {
      return "Enter a valid phone number.";
    }

    if (
      fields.password.length < 12 ||
      fields.password.length > 128
    ) {
      return "Password must contain between 12 and 128 characters.";
    }

    if (fields.password !== fields.confirmPassword) {
      return "Your passwords do not match.";
    }

    if (!acceptedTerms) {
      return "Please accept the Terms of Service and Privacy Policy.";
    }

    return null;
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim().toLowerCase(),
          phone: fields.phone.trim(),
          password: fields.password,
        }),
      });

      const data = (await response.json()) as ApiResponse;

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Unable to create your account. Please try again."
        );
      }

      setSuccess(
        data.message ||
          "Your account has been created. Check your email to verify your address before logging in."
      );

      setFields(initialFields);
      setAcceptedTerms(false);

      // Do not automatically sign in an unverified account.
      // Keep the success message visible.
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "A network error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.backgroundGlow} aria-hidden="true" />

      <Link href="/" className={styles.backHome}>
        <ArrowLeft size={17} />
        <span>Back to Home</span>
      </Link>

      <div className={styles.layout}>
        {/* Brand panel */}

        <aside className={styles.brandPanel}>
          <div className={styles.brandContent}>
            <Link href="/" className={styles.brand}>
              <span className={styles.brandMark}>
                <Image
              src="/logo.svg"
              alt="Shineweb Tech Creations"
              width={39}
              height={39}
              priority
              className={styles.brandLogo}
            />
              </span>

              <span className={styles.brandText}>
                <strong>SHINEWEB</strong>
                <span>TECH CREATIONS</span>
              </span>
            </Link>

            <div className={styles.eyebrow}>
              <Sparkles size={15} />
              <span>YOUR DIGITAL PARTNER</span>
            </div>

            <h1 className={styles.brandHeading}>
              Everything you need.
              <br />
              <span>One account.</span>
            </h1>

            <p className={styles.brandDescription}>
              Bring your digital projects, quotations, orders,
              and service requests together in one secure place.
            </p>

            <div className={styles.benefits}>
              <div className={styles.benefit}>
                <span className={styles.benefitIcon}>
                  <CheckCircle2 size={19} />
                </span>

                <div>
                  <strong>Manage quotations</strong>
                  <p>Keep track of your project enquiries.</p>
                </div>
              </div>

              <div className={styles.benefit}>
                <span className={styles.benefitIcon}>
                  <CheckCircle2 size={19} />
                </span>

                <div>
                  <strong>Track your orders</strong>
                  <p>Access your order information in one place.</p>
                </div>
              </div>

              <div className={styles.benefit}>
                <span className={styles.benefitIcon}>
                  <CheckCircle2 size={19} />
                </span>

                <div>
                  <strong>Request support</strong>
                  <p>Stay connected with our service team.</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.brandFooter}>
            <ShieldCheck size={16} />
            <span>Designed for secure customer access</span>
          </div>

          <div
            className={styles.decorativeOrb}
            aria-hidden="true"
          />
        </aside>

        {/* Registration form */}

        <section className={styles.formPanel}>
          <div className={styles.formContainer}>
            <div className={styles.mobileBrand}>
              <span className={styles.brandMark}>
                <span>S</span>
                <span>W</span>
              </span>

              <span className={styles.brandText}>
                <strong>SHINEWEB</strong>
                <span>TECH CREATIONS</span>
              </span>
            </div>

            <div className={styles.formHeading}>
              <div className={styles.headingIcon}>
                <UserRound size={23} />
              </div>

              <div>
                <p className={styles.formEyebrow}>
                  CUSTOMER REGISTRATION
                </p>

                <h2>Create your account</h2>

                <p className={styles.formSubtitle}>
                  Get started with Shineweb Tech Creations.
                </p>
              </div>
            </div>

            {error && (
              <div
                className={styles.errorMessage}
                role="alert"
                aria-live="polite"
              >
                {error}
              </div>
            )}

            {success && (
              <div
                className={styles.successMessage}
                role="status"
                aria-live="polite"
              >
                <CheckCircle2 size={21} />

                <div>
                  <strong>Registration successful</strong>
                  <p>{success}</p>
                </div>
              </div>
            )}

            <form
              className={styles.form}
              onSubmit={handleSubmit}
              noValidate
            >
              <div className={styles.field}>
                <label htmlFor="name">Full name</label>

                <div className={styles.inputWrapper}>
                  <UserRound
                    className={styles.inputIcon}
                    size={19}
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    value={fields.name}
                    onChange={handleChange}
                    minLength={2}
                    maxLength={100}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="email">Email address</label>

                <div className={styles.inputWrapper}>
                  <Mail
                    className={styles.inputIcon}
                    size={19}
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={fields.email}
                    onChange={handleChange}
                    maxLength={254}
                    required
                    disabled={loading}
                  />
                </div>

                <span className={styles.fieldHint}>
                  Use an email address you can access.
                </span>
              </div>

              <div className={styles.field}>
                <label htmlFor="phone">
                  Phone number{" "}
                  <span className={styles.optional}>
                    (Optional)
                  </span>
                </label>

                <div className={styles.inputWrapper}>
                  <Phone
                    className={styles.inputIcon}
                    size={19}
                  />

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    value={fields.phone}
                    onChange={handleChange}
                    maxLength={20}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="password">Password</label>

                <div className={styles.inputWrapper}>
                  <LockKeyhole
                    className={styles.inputIcon}
                    size={19}
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    value={fields.password}
                    onChange={handleChange}
                    minLength={12}
                    maxLength={128}
                    required
                    disabled={loading}
                  />

                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() =>
                      setShowPassword((value) => !value)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>

                <span className={styles.fieldHint}>
                  Use at least 12 characters.
                </span>
              </div>

              <div className={styles.field}>
                <label htmlFor="confirmPassword">
                  Confirm password
                </label>

                <div className={styles.inputWrapper}>
                  <LockKeyhole
                    className={styles.inputIcon}
                    size={19}
                  />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword ? "text" : "password"
                    }
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    value={fields.confirmPassword}
                    onChange={handleChange}
                    minLength={12}
                    maxLength={128}
                    required
                    disabled={loading}
                  />

                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() =>
                      setShowConfirmPassword((value) => !value)
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirmation password"
                        : "Show confirmation password"
                    }
                    aria-pressed={showConfirmPassword}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              <label className={styles.terms}>
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(event) =>
                    setAcceptedTerms(event.target.checked)
                  }
                  disabled={loading}
                />

                <span>
                  I agree to the{" "}
                  <Link href="/terms" target="_blank">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" target="_blank">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={loading || Boolean(success)}
              >
                <span>
                  {loading
                    ? "Creating account..."
                    : "Create account"}
                </span>

                {!loading && <ArrowRight size={19} />}
              </button>
            </form>

            <div className={styles.divider}>
              <span>Already registered?</span>
            </div>

            <p className={styles.loginPrompt}>
              <Link href="/login" className={styles.loginLink}>
                Sign in to your account
                <ArrowRight size={16} />
              </Link>
            </p>

            <p className={styles.securityNote}>
              <ShieldCheck size={15} />
              Your account is protected with secure authentication.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}