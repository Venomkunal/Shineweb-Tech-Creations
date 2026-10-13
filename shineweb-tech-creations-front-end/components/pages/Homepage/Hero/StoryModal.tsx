
"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import YouTube, { type YouTubeProps } from "react-youtube";
import {
  X,
  Play,
  Clapperboard,
  ArrowRight,
  Sparkles,
  Clock3,
} from "lucide-react";
import styles from "./StoryModal.module.css";

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDurationDetected?: (duration: string) => void;
}

type YouTubePlayer = {
  getDuration: () => Promise<number> | number;
};

const VIDEO_ID = "t77teduBprc";

function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "--:--";
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  }

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

export default function StoryModal({
  isOpen,
  onClose,
  onDurationDetected,
}: StoryModalProps) {
  const [mounted, setMounted] = useState(false);
  const [duration, setDuration] = useState("--:--");

  useEffect(() => {
    setMounted(true);
  }, []);

  const detectDuration = useCallback(
    async (player: YouTubePlayer) => {
      try {
        const seconds = await player.getDuration();

        if (Number.isFinite(seconds) && seconds > 0) {
          const formatted = formatDuration(seconds);
          setDuration(formatted);
          onDurationDetected?.(formatted);
        }
      } catch (error) {
        console.error("Unable to read YouTube duration:", error);
      }
    },
    [onDurationDetected]
  );

  const handleReady: YouTubeProps["onReady"] = (event) => {
    void detectDuration(event.target);
  };

  const handleStateChange: YouTubeProps["onStateChange"] = (event) => {
    void detectDuration(event.target);
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const playerOptions: YouTubeProps["opts"] = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 0,
      playsinline: 1,
      rel: 0,
      controls: 1,
      modestbranding: 1,
    },
  };

  if (!mounted || !isOpen) {
    return null;
  }

  return createPortal(
    <div
      className={styles.overlay}
      onClick={onClose}
      role="presentation"
    >
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="story-modal-title"
        aria-describedby="story-modal-description"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.topGlow} aria-hidden="true" />

        <header className={styles.header}>
          <div className={styles.brandMark} aria-hidden="true">
            <Clapperboard size={23} strokeWidth={1.7} />
          </div>

          <div className={styles.heading}>
            <span className={styles.eyebrow}>
              <Sparkles size={12} />
              MEET OUR BRAND
            </span>

            <h2 id="story-modal-title" className={styles.title}>
              Our Story<span className={styles.titleDot}>.</span>
            </h2>

            <p
              id="story-modal-description"
              className={styles.subtitle}
            >
              Technology with purpose. Digital experiences with impact.
            </p>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close Our Story"
            autoFocus
          >
            <X size={20} />
          </button>
        </header>

        <div className={styles.content}>
          <div className={styles.videoHeading}>
            <div className={styles.videoLabel}>
              <span className={styles.liveDot} />
              <span>THE STORY BEHIND OUR BRAND</span>
            </div>

            <span className={styles.videoCaption}>
              Watch our introduction
            </span>
          </div>

          <div className={styles.videoStage}>
            <div className={styles.videoContainer}>
              <YouTube
                videoId={VIDEO_ID}
                className={styles.youtubePlayer}
                iframeClassName={styles.video}
                title="Shineweb Tech Creations — Our Story"
                opts={playerOptions}
                onReady={handleReady}
                onStateChange={handleStateChange}
              />
            </div>

            <div className={styles.videoCorner} aria-hidden="true" />
          </div>

          <div className={styles.videoMeta}>
            <div className={styles.videoInfo}>
              <span className={styles.playIcon}>
                <Play size={17} fill="currentColor" />
              </span>

              <div className={styles.videoText}>
                <strong>Our Story</strong>
                <span>Shineweb Tech Creations</span>
              </div>
            </div>

            <div className={styles.durationGroup}>
              <Clock3 size={15} />
              <span>{duration}</span>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.bottomSection}>
            <div className={styles.bottomCopy}>
              <span className={styles.bottomEyebrow}>
                BEYOND THE STORY
              </span>

              <h3>Let’s build something meaningful.</h3>

              <p>
                Discover who we are, what we do, and how we help
                businesses grow through technology.
              </p>
            </div>

            <div className={styles.actions}>
              <Link
                href="/about"
                className={styles.knowMoreButton}
                onClick={onClose}
              >
                Know More
                <ArrowRight size={17} />
              </Link>

              <button
                type="button"
                className={styles.secondaryButton}
                onClick={onClose}
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>

        <footer className={styles.footer}>
          <span className={styles.footerDot} />
          <span>SHINEWEB TECH CREATIONS</span>
          <span className={styles.footerSeparator}>/</span>
          <span>Ideas into reality</span>
        </footer>
      </section>
    </div>,
    document.body
  );
}
