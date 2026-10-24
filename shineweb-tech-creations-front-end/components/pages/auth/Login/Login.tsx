"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import styles from "./Login.module.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Connect your authentication API here.
    console.log({ email, rememberMe });
  }

  return (
    <main className={styles.loginPage}>
      <div className={styles.backgroundGlow} />

      {/* <Link href="/" className={styles.brand}>
        <span className={styles.logo}>
          <ShieldCheck size={27} />
        </span>

        <span className={styles.brandText}>
          <strong>SHINEWEB</strong>
          <small>TECH CREATIONS</small>
        </span>
      </Link> */}

      <section className={styles.loginLayout}>
        <div className={styles.intro}>
          <span className={styles.eyebrow}>
            <span className={styles.statusDot} />
            YOUR DIGITAL WORKSPACE
          </span>

          <h1>
            Welcome back
            <br />
            to <span>Shineweb.</span>
          </h1>

          <p>
            Sign in to manage your projects, services, quotations,
            and digital workspace from one secure place.
          </p>

          <div className={styles.securityNote}>
            <ShieldCheck size={20} />
            <span>
              <strong>Secure account access</strong>
              <small>Built for your digital business.</small>
            </span>
          </div>
        </div>

        <div className={styles.loginCard}>
          <div className={styles.cardHeader}>
            <h2>Sign in</h2>
            <p>Enter your account details to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="email">Email address</label>

              <div className={styles.inputWrapper}>
                <Mail size={19} />

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <div className={styles.passwordLabel}>
                <label htmlFor="password">Password</label>

                <Link href="/forgot-password">
                  Forgot password?
                </Link>
              </div>

              <div className={styles.inputWrapper}>
                <LockKeyhole size={19} />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            <label className={styles.remember}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>

            <button type="submit" className={styles.submitButton}>
              Sign in
              <ArrowRight size={19} />
            </button>
          </form>

          <div className={styles.signup}>
            Don&apos;t have an account?{" "}
            <Link href="/register">Create account</Link>
          </div>

          <div className={styles.cardFooter}>
            <ShieldCheck size={15} />
            Protected account access
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Shineweb Tech Creations</span>

        <div>
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/contact">Support</Link>
        </div>
      </footer>
    </main>
  );
}