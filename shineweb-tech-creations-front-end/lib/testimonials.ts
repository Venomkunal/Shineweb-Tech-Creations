
export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  category: string;
  text: string;
  rating: number;
  avatarUrl: string;
  isPublished: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export type TestimonialInput = Pick<
  Testimonial,
  | "name"
  | "role"
  | "company"
  | "category"
  | "text"
  | "rating"
  | "avatarUrl"
  | "isPublished"
  | "sortOrder"
>;

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  count?: number;
  data: T;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getBaseUrl(): string {
  if (!API_URL) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is missing from .env.local"
    );
  }

  return API_URL.replace(/\/+$/, "");
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const response = await fetch(`${getBaseUrl()}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const result: ApiResponse<T> = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Testimonial request failed."
    );
  }

  return result;
}

// Public: published testimonials only
export async function getTestimonials(): Promise<Testimonial[]> {
  const result = await request<Testimonial[]>("/api/testimonials");
  return result.data;
}

// Admin: all testimonials, including drafts
export async function getAllTestimonials(
  token: string
): Promise<Testimonial[]> {
  const result = await request<Testimonial[]>(
    "/api/testimonials/admin",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return result.data;
}

export async function createTestimonial(
  data: TestimonialInput,
  token: string
): Promise<Testimonial> {
  const result = await request<Testimonial>("/api/testimonials", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return result.data;
}

export async function updateTestimonial(
  id: string,
  data: Partial<TestimonialInput>,
  token: string
): Promise<Testimonial> {
  const result = await request<Testimonial>(
    `/api/testimonials/${encodeURIComponent(id)}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  return result.data;
}

export async function deleteTestimonial(
  id: string,
  token: string
): Promise<void> {
  await request<null>(
    `/api/testimonials/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
