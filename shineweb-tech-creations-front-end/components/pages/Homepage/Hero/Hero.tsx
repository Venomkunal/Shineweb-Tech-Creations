
"use client";

import { useEffect, useRef, useState } from "react";
import StoryModal from "./StoryModal";
import Link from "next/link";

import {
  Monitor,
  Server,
  Network,
  Video,
  ShieldCheck,
  Cloud,
  Code2,
  Headset,
  Package,
  Heart,
  Sparkles,
  Clock3,
  ArrowRight,
  ArrowUpRight,
  Play,
  Laptop,
  AppWindow,
  Headphones,
} from "lucide-react";

import styles from "./Hero.module.css";

const stats = [
  { icon: Package, value: "500+", label: "Products Available" },
  { icon: Heart, value: "100+", label: "Happy Clients" },
  { icon: Sparkles, value: "10+", label: "Years Experience" },
  { icon: Clock3, value: "24/7", label: "Expert Support" },
];

const services = [
  { icon: Monitor, label: "IT Hardware", href: "/services#hardware" },
  { icon: AppWindow, label: "Software Licensing", href: "/services#software" },
  { icon: Network, label: "Networking", href: "/services#networking" },
  { icon: ShieldCheck, label: "Cybersecurity", href: "/services#cybersecurity" },
  { icon: Cloud, label: "Cloud Solutions", href: "/services#cloud" },
  { icon: Code2, label: "Web Development", href: "/services#web-development" },
  { icon: Headset, label: "IT Support & AMC", href: "/services#support" },
];

const categories = [
  {
    icon: Laptop,
    title: "Laptops &",
    subtitle: "Desktops",
    href: "/products?category=computers",
  },
  {
    icon: Server,
    title: "Servers &",
    subtitle: "Workstations",
    href: "/products?category=servers",
  },
  {
    icon: Network,
    title: "Networking",
    subtitle: "Infrastructure",
    href: "/products?category=networking",
  },
  {
    icon: Video,
    title: "CCTV &",
    subtitle: "Surveillance",
    href: "/products?category=cctv",
  },
  {
    icon: AppWindow,
    title: "Software",
    subtitle: "Licensing",
    href: "/products?category=software",
  },
  {
    icon: Headphones,
    title: "Accessories",
    subtitle: "& Peripherals",
    href: "/products?category=accessories",
  },
];

function useCountUp(
  target: number,
  active: boolean,
  duration = 1400
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    let frame = 0;
    let startTime: number | null = null;

    const animate = (time: number) => {
      if (startTime === null) startTime = time;

      const progress = Math.min(
        (time - startTime) / duration,
        1
      );

      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(target * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [target, active, duration]);

  return count;
}


export default function Hero() {
  const categoryBarRef = useRef<HTMLElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);

  const [statsVisible, setStatsVisible] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [storyDuration, setStoryDuration] = useState("--:--");

  const closeStory = () => setIsStoryOpen(false);

  const productsCount = useCountUp(500, statsVisible);
  const clientsCount = useCountUp(100, statsVisible);
  const experienceCount = useCountUp(10, statsVisible);
  const supportCount = useCountUp(24, statsVisible);

  const animatedStats = statsVisible
    ? [
        `${productsCount}+`,
        `${clientsCount}+`,
        `${experienceCount}+`,
        `${supportCount}/7`,
      ]
    : stats.map(({ value }) => value);

  // Start the count-up animation when statistics enter the viewport.
  useEffect(() => {
    const element = statsRef.current;

    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setStatsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Automatically scroll categories on mobile.
  useEffect(() => {
    const element = categoryBarRef.current;

    if (!element) return;

    const mobile = window.matchMedia("(max-width: 600px)");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let animationFrame = 0;
    let lastTime = 0;
    let paused = false;
    let resumeTimer: ReturnType<typeof setTimeout> | undefined;

    const speed = 30;

    const getLoopWidth = () => {
      const firstItem = element.children[0] as
        | HTMLElement
        | undefined;

      const duplicateItem = element.children[categories.length] as
        | HTMLElement
        | undefined;

      if (!firstItem || !duplicateItem) return 0;

      return duplicateItem.offsetLeft - firstItem.offsetLeft;
    };

    const stop = () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      animationFrame = 0;
      lastTime = 0;
    };

    const animate = (time: number) => {
      if (
        !mobile.matches ||
        reducedMotion.matches ||
        document.hidden ||
        paused
      ) {
        stop();
        return;
      }

      if (lastTime === 0) lastTime = time;

      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      const loopWidth = getLoopWidth();

      if (loopWidth > 0) {
        element.scrollLeft += speed * delta;

        if (element.scrollLeft >= loopWidth) {
          element.scrollLeft %= loopWidth;
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    const start = () => {
      stop();

      if (
        mobile.matches &&
        !reducedMotion.matches &&
        !document.hidden &&
        !paused
      ) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const pause = () => {
      paused = true;
      stop();

      if (resumeTimer) clearTimeout(resumeTimer);

      resumeTimer = setTimeout(() => {
        paused = false;
        start();
      }, 2000);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };

    element.addEventListener("touchstart", pause, {
      passive: true,
    });
    element.addEventListener("pointerdown", pause);
    element.addEventListener("wheel", pause, {
      passive: true,
    });
    element.addEventListener("focusin", pause);

    document.addEventListener(
      "visibilitychange",
      onVisibilityChange
    );

    mobile.addEventListener("change", start);
    reducedMotion.addEventListener("change", start);

    const resizeObserver = new ResizeObserver(start);
    resizeObserver.observe(element);

    start();

    return () => {
      stop();

      if (resumeTimer) clearTimeout(resumeTimer);

      resizeObserver.disconnect();

      element.removeEventListener("touchstart", pause);
      element.removeEventListener("pointerdown", pause);
      element.removeEventListener("wheel", pause);
      element.removeEventListener("focusin", pause);

      document.removeEventListener(
        "visibilitychange",
        onVisibilityChange
      );

      mobile.removeEventListener("change", start);
      reducedMotion.removeEventListener("change", start);
    };
  }, []);

  const duplicatedCategories = [...categories, ...categories];

useEffect(() => {
  let cancelled = false;

  async function loadStoryDuration() {
    try {
      const response = await fetch("/api/youtube-duration");

      if (!response.ok) {
        throw new Error("Could not fetch video duration.");
      }

      const data: { duration: string } = await response.json();

      if (!cancelled) {
        setStoryDuration(data.duration);
      }
    } catch (error) {
      console.error("Story duration detection failed:", error);
    }
  }

  void loadStoryDuration();

  return () => {
    cancelled = true;
  };
}, []);


  return (
    <section
      className={styles.hero}
      aria-labelledby="hero-heading"
    >
      <div className={styles.background} aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span>YOUR IT PARTNER FOR A SMARTER TOMORROW</span>
          </div>

          <h1 id="hero-heading" className={styles.heading}>
            Transforming
            <br />
            Businesses with
            <br />
            <span>Next-Gen Technology</span>
          </h1>

          <p className={styles.description}>
            IT hardware, software licensing, networking,
            cybersecurity, web and software development,
            and cloud solutions — all under one roof.
            Helping businesses in Assam, across India and beyond.
          </p>

          <div className={styles.ctaGroup}>
            <Link href="/solutions" className={styles.primaryButton}>
              Explore Solutions
              <ArrowRight size={17} aria-hidden="true" />
            </Link>

            <Link
              href="/contact?type=quote"
              className={styles.secondaryButton}
            >
              <ArrowUpRight size={16} aria-hidden="true" />
              Request a Quote
            </Link>
          </div>

          <div className={styles.stats} ref={statsRef}>
            {stats.map(({ icon: Icon, label, value }, index) => (
              <div className={styles.stat} key={label}>
                <span className={styles.statIcon}>
                  <Icon
                    size={18}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </span>

                <div className={styles.statText}>
                  <strong>
                    <span aria-hidden="true">
                      {animatedStats[index]}
                    </span>
                    <span className={styles.srOnly}>{value}</span>
                  </strong>
                  <span>{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside
          className={styles.servicePanel}
          aria-label="Our services"
        >
          {services.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className={styles.serviceLink}
            >
              <span className={styles.serviceIcon}>
                <Icon
                  size={17}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </span>

              <span className={styles.serviceLabel}>{label}</span>

              <ArrowUpRight
                className={styles.serviceArrow}
                size={15}
                aria-hidden="true"
              />
            </Link>
          ))}
        </aside>

        <button
          type="button"
          className={styles.storyCard}
          aria-label={`Watch Our Story${
            storyDuration !== "--:--"
              ? `, duration ${storyDuration}`
              : ""
          }`}
          onClick={() => setIsStoryOpen(true)}
        >
          <span className={styles.playButton}>
            <Play
              size={16}
              fill="currentColor"
              aria-hidden="true"
            />
          </span>

          <span className={styles.storyText}>
            <strong>Our Story</strong>
            <small>Watch our story</small>
          </span>

          <span className={styles.storyDuration}>
            {storyDuration}
          </span>
        </button>

        <div className={styles.imageCaption} aria-hidden="true">
          <span>Technology</span>
          <span>Today.</span>
          <span>For a Better</span>
          <span>Tomorrow.</span>
        </div>
      </div>

      <div className={styles.categoryScroller}>
        <nav
          ref={categoryBarRef}
          className={styles.categoryBar}
          aria-label="Product categories"
          tabIndex={0}
        >
          {duplicatedCategories.map(
            ({ icon: Icon, title, subtitle, href }, index) => {
              const isDuplicate = index >= categories.length;

              return (
                <Link
                  key={`${href}-${index}`}
                  href={href}
                  className={styles.category}
                  aria-hidden={isDuplicate || undefined}
                  tabIndex={isDuplicate ? -1 : undefined}
                >
                  <span className={styles.categoryIcon}>
                    <Icon
                      size={25}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </span>

                  <span className={styles.categoryText}>
                    <span>{title}</span>
                    <span>{subtitle}</span>
                  </span>

                  <ArrowRight
                    className={styles.categoryArrow}
                    size={15}
                    aria-hidden="true"
                  />
                </Link>
              );
            }
          )}
        </nav>
      </div>

      <StoryModal
        isOpen={isStoryOpen}
        onClose={closeStory}
        onDurationDetected={setStoryDuration}
      />
    </section>
  );
}
