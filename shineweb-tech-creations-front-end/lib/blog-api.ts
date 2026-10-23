
export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  coverImage: string | null;
  authorName: string;
  readingTime: number;
  isFeatured: boolean;
  publishedAt: string;
  tags: string[];
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

async function request<T>(
  path: string,
  signal?: AbortSignal
): Promise<T> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const response = await fetch(`${API_URL}/api/blogs${path}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
    signal,
  });

  if (!response.ok) {
    throw new Error(`Blog API failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function getBlogPosts(
  options: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
  } = {},
  signal?: AbortSignal
): Promise<BlogResponse> {
  const params = new URLSearchParams({
    page: String(options.page ?? 1),
    limit: String(options.limit ?? 6),
  });

  if (options.category && options.category !== "All Articles") {
    params.set("category", options.category);
  }

  if (options.search?.trim()) {
    params.set("search", options.search.trim());
  }

  return request(`/?${params.toString()}`, signal);
}

export function getFeaturedPost(
  signal?: AbortSignal
): Promise<{
  success: boolean;
  data: BlogPost | null;
}> {
  return request("/featured", signal);
}

export function getBlogCategories(
  signal?: AbortSignal
): Promise<{
  success: boolean;
  data: string[];
}> {
  return request("/categories", signal);
}

export function getBlogPost(
  slug: string,
  signal?: AbortSignal
): Promise<{
  success: boolean;
  data: BlogPost;
}> {
  return request(`/${encodeURIComponent(slug)}`, signal);
}
