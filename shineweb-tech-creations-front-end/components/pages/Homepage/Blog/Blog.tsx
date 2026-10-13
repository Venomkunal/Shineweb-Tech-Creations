
import Link from "next/link";
import { getBlogs, type BlogPost } from "@/lib/blog";
import styles from "./Blog.module.css";

function formatDate(date?: string) {
  if (!date) return "Recently published";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function estimateReadTime(content?: string) {
  const words = content?.trim().split(/\s+/).length ?? 0;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

export default async function Blog() {
  let posts: BlogPost[] = [];
  let failed = false;

  try {
    const response = await getBlogs(1, 3);
    posts = response.data;
  } catch (error) {
    console.error("Failed to load homepage blogs:", error);
    failed = true;
  }

  const featuredPost =
    posts.find((post) => post.featured) ?? posts[0];

  const otherPosts = posts
    .filter((post) => post._id !== featuredPost?._id)
    .slice(0, 2);

  return (
    <section
      id="blog"
      className={styles.blog}
      aria-labelledby="blog-heading"
    >
      <div className={styles.container}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowLine} />
          <span>SHINEWEB INSIGHTS</span>
          <span className={styles.eyebrowDot} />
          <span className={styles.eyebrowLabel}>
            Ideas. Innovation. Impact.
          </span>
        </div>

        <div className={styles.headingRow}>
          <div className={styles.headingContent}>
            <h2 id="blog-heading" className={styles.heading}>
              Knowledge that
              <br />
              <span>moves you forward.</span>
            </h2>

            <p className={styles.description}>
              Expert insights, practical guides, and fresh perspectives
              to help your business make smarter technology decisions.
            </p>
          </div>

          <Link href="/blog" className={styles.viewAll}>
            Explore all articles
            <span className={styles.viewAllArrow}>↗</span>
          </Link>
        </div>

        {failed ? (
          <p role="status" className={styles.description}>
            Articles are temporarily unavailable. Please try again later.
          </p>
        ) : posts.length === 0 ? (
          <p className={styles.description}>
            New insights are coming soon. Check back for our latest articles.
          </p>
        ) : (
          <>
            <div className={styles.topicRow}>
              <span className={styles.topicLabel}>EXPLORE TOPICS</span>
              {[
                "Web Development",
                "Cybersecurity",
                "IT Solutions",
                "Digital Marketing",
              ].map((topic) => (
                <Link
                  key={topic}
                  href={`/blog?category=${encodeURIComponent(topic)}`}
                  className={styles.topic}
                >
                  {topic}
                </Link>
              ))}
            </div>

            <div className={styles.articleLayout}>
              {featuredPost && (
                <article className={styles.featuredCard}>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className={styles.featuredLink}
                  >
                    <div className={styles.featuredImageWrap}>
                      <img
                        src={featuredPost.coverImage}
                        alt={featuredPost.imageAlt || featuredPost.title}
                        className={styles.featuredImage}
                      />

                      <span className={styles.featuredBadge}>
                        <span className={styles.badgeDot} />
                        FEATURED ARTICLE
                      </span>

                      <span className={styles.imageArrow}>↗</span>
                    </div>

                    <div className={styles.featuredBody}>
                      <div className={styles.meta}>
                        <span className={styles.category}>
                          {featuredPost.category}
                        </span>
                        <span className={styles.metaDivider} />
                        <span>
                          {estimateReadTime(featuredPost.content)}
                        </span>
                      </div>

                      <h3 className={styles.featuredTitle}>
                        {featuredPost.title}
                      </h3>

                      <p className={styles.excerpt}>
                        {featuredPost.excerpt}
                      </p>

                      <div className={styles.cardFooter}>
                        <span className={styles.date}>
                          {formatDate(featuredPost.publishedAt)}
                        </span>
                        <span className={styles.readLink}>
                          Read article →
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              )}

              <div className={styles.sideArticles}>
                {otherPosts.map((post, index) => (
                  <article className={styles.articleCard} key={post._id}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className={styles.articleLink}
                    >
                      <div className={styles.thumbnailWrap}>
                        <img
                          src={post.coverImage}
                          alt={post.imageAlt || post.title}
                          className={styles.thumbnail}
                        />
                        <span className={styles.thumbnailNumber}>
                          0{index + 2}
                        </span>
                      </div>

                      <div className={styles.articleContent}>
                        <div className={styles.meta}>
                          <span className={styles.category}>
                            {post.category}
                          </span>
                        </div>

                        <h3 className={styles.articleTitle}>
                          {post.title}
                        </h3>

                        <p className={styles.articleExcerpt}>
                          {post.excerpt}
                        </p>

                        <div className={styles.articleBottom}>
                          <span>{formatDate(post.publishedAt)}</span>
                          <span className={styles.readTime}>
                            {estimateReadTime(post.content)}
                          </span>
                          <span className={styles.smallArrow}>↗</span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </>
        )}

        <div className={styles.bottomBanner}>
          <div className={styles.bannerIcon} aria-hidden="true">
            ✳
          </div>

          <div className={styles.bannerContent}>
            <h3>Stay ahead of what&apos;s next.</h3>
            <p>
              Practical technology insights for businesses ready to grow.
            </p>
          </div>

          <Link href="/blog" className={styles.bannerLink}>
            Discover more ↗
          </Link>

          <div className={styles.bannerGlow} />
        </div>
      </div>
    </section>
  );
}
