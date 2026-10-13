
export type PartnerStatus = "active" | "inactive";

export interface Partner {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  logoUrl: string;
  websiteUrl: string;
  sortOrder: number;
  status: PartnerStatus;
  featured: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type PartnerInput = Partial<
  Omit<Partner, "_id" | "createdAt" | "updatedAt">
> & {
  name: string;
  category: string;
};

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    cache: "no-store",
  });

  const result = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !result.success) {
    throw new Error(result.message || "The request failed.");
  }

  return result.data as T;
}

// Public: homepage
export function getPartners(): Promise<Partner[]> {
  return request<Partner[]>("/partners");
}

// Admin: read all partners
export function getAdminPartners(token: string): Promise<Partner[]> {
  return request<Partner[]>("/partners/admin", {}, token);
}

// Admin: create
export function createPartner(
  input: PartnerInput,
  token: string
): Promise<Partner> {
  return request<Partner>(
    "/partners",
    { method: "POST", body: JSON.stringify(input) },
    token
  );
}

// Admin: update
export function updatePartner(
  id: string,
  input: Partial<PartnerInput>,
  token: string
): Promise<Partner> {
  return request<Partner>(
    `/partners/${encodeURIComponent(id)}`,
    { method: "PATCH", body: JSON.stringify(input) },
    token
  );
}

// Admin: delete
export function deletePartner(id: string, token: string): Promise<void> {
  return request<void>(
    `/partners/${encodeURIComponent(id)}`,
    { method: "DELETE" },
    token
  );
}
