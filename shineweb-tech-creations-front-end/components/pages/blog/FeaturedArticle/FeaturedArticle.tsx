"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowRight,
  Clock3,
  CalendarDays,
  Sparkles,
} from "lucide-react";

import type { BlogPost } from "@/lib/blog-api";
import styles from "./FeaturedArticle.module.css";

interface FeaturedArticleProps {
  post?: BlogPost | null;
}

export default function FeaturedArticle({
  post,
}: FeaturedArticleProps) {
  if (!post) return null;

  const imageSrc =
    post.coverImage?.trim() || "/images/blog-placeholder.jpg";

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.eyebrow}>
              <Sparkles size={14} />
              Editor's Pick
            </span>

            <h2 className={styles.sectionTitle}>
              Featured <span>Article</span>
            </h2>

            <p className={styles.sectionDescription}>
              A closer look at ideas, technologies, and strategies shaping
              the digital world.
            </p>
          </div>

          <Link href="/blog#articles" className={styles.viewAll}>
            View all articles
            <ArrowRight size={16} />
          </Link>
        </div>

        <article className={styles.featuredCard}>
          <Link
            href={`/blog/${post.slug}`}
            className={styles.imageWrapper}
            aria-label={`Read ${post.title}`}
          >
            <Image
              src={imageSrc}
              alt={post.title}
              fill
              sizes="(max-width: 760px) 100vw, 50vw"
              className={styles.coverImage}
            />

            <span className={styles.imageBadge}>
              <Sparkles size={13} />
              Featured Story
            </span>

            <span className={styles.imageArrow}>
              <ArrowUpRight size={20} />
            </span>
          </Link>

          <div className={styles.content}>
            <div className={styles.meta}>
              <span className={styles.category}>{post.category}</span>

              {formattedDate && (
                <span className={styles.metaItem}>
                  <CalendarDays size={14} />
                  {formattedDate}
                </span>
              )}

              <span className={styles.metaItem}>
                <Clock3 size={14} />
                {post.readingTime} min read
              </span>
            </div>

            <Link href={`/blog/${post.slug}`} className={styles.titleLink}>
              <h3 className={styles.title}>{post.title}</h3>
            </Link>

            <p className={styles.excerpt}>{post.excerpt}</p>

            <div className={styles.footer}>
              <div className={styles.author}>
                <span className={styles.authorAvatar}>
                  {post.authorName?.charAt(0)?.toUpperCase() || "S"}
                </span>

                <div>
                  <span className={styles.authorLabel}>Written by</span>
                  <span className={styles.authorName}>
                    {post.authorName || "Shineweb Tech Creations"}
                  </span>
                </div>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className={styles.readMore}
              >
                Read article
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}