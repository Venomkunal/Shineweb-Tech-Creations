
export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  coverImage: string | null;
  imageAlt?: string;
  authorName: string;
  readingTime: number;
  isFeatured: boolean;
  publishedAt: string;
  tags: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
  };
  content?: string;
};

export type BlogResponse = {
  success: boolean;
  data: BlogPost[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function request<T>(path: string): Promise<T> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const response = await fetch(`${API_URL}/blogs${path}`, {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Blog API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getBlogPosts(options: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
} = {}): Promise<BlogResponse> {
  const params = new URLSearchParams({
    page: String(options.page ?? 1),
    limit: String(options.limit ?? 6),
  });

  if (
    options.category &&
    options.category !== "All Articles"
  ) {
    params.set("category", options.category);
  }

  if (options.search?.trim()) {
    params.set("search", options.search.trim());
  }

  return request<BlogResponse>(`/?${params.toString()}`);
}

export async function getFeaturedPost(): Promise<{
  success: boolean;
  data: BlogPost | null;
}> {
  return request("/featured");
}

export async function getBlogCategories(): Promise<{
  success: boolean;
  data: string[];
}> {
  return request("/categories");
}

export async function getBlogPost(
  slug: string
): Promise<{ success: boolean; data: BlogPost }> {
  return request(`/${encodeURIComponent(slug)}`);
}
