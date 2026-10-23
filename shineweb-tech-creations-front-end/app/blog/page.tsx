
import type { Metadata } from "next";

import BlogHero from "@/components/pages/blog/BlogHero/BlogHero";
import FeaturedArticle from "@/components/pages/blog/FeaturedArticle/FeaturedArticle";
import BlogListing from "@/components/pages/blog/BlogLisiting/BlogLisiting";
import BlogNewsletter from "@/components/pages/blog/BlogNewsletter/BlogNewsletter";
import BlogCTA from "@/components/pages/blog/BlogCTA/BlogCTA";
import { getFeaturedPost } from "@/lib/blog-api";

export const metadata: Metadata = {
  title: "Technology Blog | Shineweb Tech Creations",
  description:
    "Explore insights on web development, software, SEO, cybersecurity, and IT infrastructure.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  let featured = null;
  let errorMessage = "";

  try {
    const result = await getFeaturedPost();

    console.log("[Blog] Featured API response:", result);

    if (result.success && result.data) {
      featured = result.data;
    } else {
      errorMessage = "No featured article was returned by the API.";
    }
  } catch (error) {
    console.error("[Blog] Failed to load featured article:", error);

    errorMessage =
      error instanceof Error
        ? error.message
        : "An unknown error occurred while loading the article.";
  }

  return (
    <main>
      <BlogHero />

      {featured ? (
        <FeaturedArticle post={featured} />
      ) : (
        <section
          style={{
            maxWidth: 1200,
            margin: "40px auto",
            padding: "32px 20px",
            textAlign: "center",
          }}
        >
          <h2>Featured article unavailable</h2>
          <p>
            {errorMessage ||
              "Please check the API and published article settings."}
          </p>
        </section>
      )}

      <section id="articles">
        {/* Add your BlogListing component here to show all articles. */}
        <BlogListing />
      </section>
      <BlogNewsletter />
      <BlogCTA />
    </main>
  );
}
