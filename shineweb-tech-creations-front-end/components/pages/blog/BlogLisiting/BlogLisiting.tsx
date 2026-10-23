
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Clock3,
  Search,
} from "lucide-react";

import { getBlogPosts } from "@/lib/blog-api";
import type { BlogPost } from "@/lib/blog-api";
import styles from "./BlogListing.module.css";

const PAGE_SIZE = 6;

export default function BlogListing() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getBlogPosts({
        category: activeCategory === "All" ? undefined : activeCategory,
        search: search.trim() || undefined,
        page,
        limit: PAGE_SIZE,
      });

      if (!result.success) {
        throw new Error("Unable to load articles.");
      }

      setPosts(result.data ?? []);
      setTotalPages(Math.max(1, result.pagination?.pages ?? 1));
    } catch (err) {
      console.error("[BlogListing] Failed to load articles:", err);
      setPosts([]);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading articles."
      );
    } finally {
      setLoading(false);
    }
  }, [activeCategory, page, search]);

  useEffect(() => {
    void loadPosts();
  }, [loadPosts]);

  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/blog/categories`,
          { cache: "no-store" }
        );

        if (!response.ok) return;

        const result = await response.json();

        if (!cancelled && result.success && Array.isArray(result.data)) {
          setCategories(result.data);
        }
      } catch (err) {
        console.error("[BlogListing] Failed to load categories:", err);
      }
    }

    void loadCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  function selectCategory(category: string) {
    setActiveCategory(category);
    setPage(1);
  }

  function updateSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  return (
    <section id="articles" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <div>
            <span className={styles.eyebrow}>
              <BookOpen size={15} />
              The Knowledge Hub
            </span>

            <h2 className={styles.title}>
              Explore our <span>insights</span>
            </h2>

            <p className={styles.description}>
              Practical ideas, technical guides, and strategies to help
              your business grow with technology.
            </p>
          </div>

          <div className={styles.articleCount}>
            <span>{posts.length.toString().padStart(2, "0")}</span>
            <small>Articles on this page</small>
          </div>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.categories}>
            <button
              type="button"
              className={`${styles.categoryButton} ${
                activeCategory === "All" ? styles.activeCategory : ""
              }`}
              onClick={() => selectCategory("All")}
            >
              All articles
            </button>

            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`${styles.categoryButton} ${
                  activeCategory === category ? styles.activeCategory : ""
                }`}
                onClick={() => selectCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <label className={styles.searchBox}>
            <Search size={17} />
            <input
              type="search"
              placeholder="Search articles..."
              value={search}
              onChange={(event) => updateSearch(event.target.value)}
              aria-label="Search articles"
            />
          </label>
        </div>

        {loading ? (
          <div className={styles.stateMessage}>
            <span className={styles.loader} />
            <p>Loading articles...</p>
          </div>
        ) : error ? (
          <div className={styles.stateMessage}>
            <h3>Unable to load articles</h3>
            <p>{error}</p>
            <button
              type="button"
              className={styles.retryButton}
              onClick={() => void loadPosts()}
            >
              Try again <ArrowRight size={16} />
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className={styles.stateMessage}>
            <BookOpen size={30} />
            <h3>No articles found</h3>
            <p>Try another search term or choose a different category.</p>
            <button
              type="button"
              className={styles.retryButton}
              onClick={() => {
                setSearch("");
                selectCategory("All");
              }}
            >
              View all articles <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {posts.map((post, index) => {
                const imageSrc =
                  post.coverImage?.trim() ||
                  "/images/blog-placeholder.jpg";

                const formattedDate = post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : null;

                return (
                  <article
                    key={post._id ?? post.slug}
                    className={styles.card}
                    style={{ animationDelay: `${index * 70}ms` }}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className={styles.imageLink}
                      aria-label={`Read ${post.title}`}
                    >
                      <div className={styles.imageWrapper}>
                        <Image
                          src={imageSrc}
                          alt={post.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className={styles.image}
                        />
                      </div>

                      <span className={styles.imageArrow}>
                        <ArrowUpRight size={19} />
                      </span>
                    </Link>

                    <div className={styles.cardContent}>
                      <div className={styles.meta}>
                        <span className={styles.categoryTag}>
                          {post.category}
                        </span>

                        {formattedDate && (
                          <span className={styles.date}>
                            <CalendarDays size={13} />
                            {formattedDate}
                          </span>
                        )}
                      </div>

                      <h3 className={styles.cardTitle}>
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>

                      <p className={styles.excerpt}>{post.excerpt}</p>

                      <div className={styles.cardFooter}>
                        <span className={styles.readingTime}>
                          <Clock3 size={14} />
                          {post.readingTime} min read
                        </span>

                        <Link
                          href={`/blog/${post.slug}`}
                          className={styles.readMore}
                        >
                          Read article <ArrowRight size={15} />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {totalPages > 1 && (
              <nav className={styles.pagination} aria-label="Article pages">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => {
                    setPage((current) => Math.max(1, current - 1));
                    document
                      .getElementById("articles")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Previous
                </button>

                <span>
                  Page <strong>{page}</strong> of {totalPages}
                </span>

                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => {
                    setPage((current) =>
                      Math.min(totalPages, current + 1)
                    );
                    document
                      .getElementById("articles")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Next <ArrowRight size={15} />
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </section>
  );
}
