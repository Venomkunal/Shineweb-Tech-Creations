
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content?: string;
  coverImage: string;
  imageAlt: string;
  author: string;
  tags: string[];
  status: "draft" | "published";
  featured: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogResponse {
  success: boolean;
  data: BlogPost[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface SingleBlogResponse {
  success: boolean;
  data: BlogPost;
}

export interface BlogInput {
  title: string;
  slug?: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage: string;
  imageAlt?: string;
  author?: string;
  tags?: string[];
  status: "draft" | "published";
  featured?: boolean;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const result = await response.json();

  if (!response.ok || result.success === false) {
    throw new Error(result.message || "Blog API request failed");
  }

  return result as T;
}

// PUBLIC: fetch published articles for homepage/listing
export async function getBlogs(
  page = 1,
  limit = 10,
  category?: string
): Promise<BlogResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (category) params.set("category", category);

  const response = await fetch(
    `${API_URL}/api/blogs?${params.toString()}`,
    {
      next: { revalidate: 60, tags: ["blogs"] },
    }
  );

  return parseResponse<BlogResponse>(response);
}

// PUBLIC: fetch one article
export async function getBlogBySlug(
  slug: string
): Promise<BlogPost | null> {
  const response = await fetch(
    `${API_URL}/api/blogs/${encodeURIComponent(slug)}`,
    { next: { revalidate: 60, tags: ["blogs", `blog-${slug}`] } }
  );

  if (response.status === 404) return null;

  const result =
    await parseResponse<SingleBlogResponse>(response);

  return result.data;
}

// ADMIN: fetch all articles, including drafts
export async function getAdminBlogs(token: string) {
  const response = await fetch(`${API_URL}/api/blogs/admin/all`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  const result = await parseResponse<BlogResponse>(response);
  return result.data;
}

// ADMIN: create an article
export async function createBlog(
  token: string,
  input: BlogInput
): Promise<BlogPost> {
  const response = await fetch(`${API_URL}/api/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });

  const result =
    await parseResponse<SingleBlogResponse>(response);

  return result.data;
}

// ADMIN: update an article
export async function updateBlog(
  token: string,
  id: string,
  input: Partial<BlogInput>
): Promise<BlogPost> {
  const response = await fetch(
    `${API_URL}/api/blogs/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    }
  );

  const result =
    await parseResponse<SingleBlogResponse>(response);

  return result.data;
}

// ADMIN: delete an article
export async function deleteBlog(
  token: string,
  id: string
): Promise<void> {
  const response = await fetch(
    `${API_URL}/api/blogs/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  await parseResponse<{ success: boolean }>(response);
}
