
import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Blog from "../models/Blog";

const PUBLIC_FIELDS = [
  "title",
  "slug",
  "excerpt",
  "category",
  "coverImage",
  "imageAlt",
  "authorName",
  "readingTime",
  "status",
  "isFeatured",
  "publishedAt",
  "tags",
  "seo",
  "createdAt",
  "updatedAt",
].join(" ");

const STATUSES = ["draft", "published", "archived"] as const;

type BlogStatus = (typeof STATUSES)[number];

const isRecord = (
  value: unknown
): value is Record<string, unknown> =>
  typeof value === "object" &&
  value !== null &&
  !Array.isArray(value);

function makeSlug(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 280)
    .replace(/-+$/g, "");
}

function validateBlog(body: Record<string, unknown>) {
  const required = [
    "title",
    "category",
    "excerpt",
    "content",
  ];

  for (const field of required) {
    if (
      typeof body[field] !== "string" ||
      !body[field].trim()
    ) {
      return `${field} is required`;
    }
  }

  const limits: Record<string, number> = {
    title: 250,
    category: 100,
    excerpt: 500,
    content: 200_000,
  };

  for (const [field, max] of Object.entries(limits)) {
    if (
      typeof body[field] === "string" &&
      body[field].length > max
    ) {
      return `${field} cannot exceed ${max} characters`;
    }
  }

  if (
    body.coverImage !== undefined &&
    body.coverImage !== null &&
    typeof body.coverImage !== "string"
  ) {
    return "coverImage must be a string or null";
  }

  if (
    body.status !== undefined &&
    !STATUSES.includes(body.status as BlogStatus)
  ) {
    return "Invalid article status";
  }

  if (
    body.isFeatured !== undefined &&
    typeof body.isFeatured !== "boolean"
  ) {
    return "isFeatured must be a boolean";
  }

  if (
    body.tags !== undefined &&
    (!Array.isArray(body.tags) ||
      body.tags.length > 20 ||
      !body.tags.every(
        (tag) =>
          typeof tag === "string" &&
          tag.trim().length > 0 &&
          tag.length <= 50
      ))
  ) {
    return "Tags must contain up to 20 non-empty strings of at most 50 characters";
  }

  if (
    body.authorName !== undefined &&
    (typeof body.authorName !== "string" ||
      !body.authorName.trim() ||
      body.authorName.length > 150)
  ) {
    return "authorName must be a non-empty string of at most 150 characters";
  }

  if (
    body.imageAlt !== undefined &&
    (typeof body.imageAlt !== "string" ||
      body.imageAlt.length > 250)
  ) {
    return "imageAlt must be a string of at most 250 characters";
  }

  if (
    body.readingTime !== undefined &&
    (!Number.isInteger(body.readingTime) ||
      Number(body.readingTime) < 1 ||
      Number(body.readingTime) > 180)
  ) {
    return "readingTime must be an integer between 1 and 180";
  }

  if (body.seo !== undefined) {
    if (!isRecord(body.seo)) {
      return "seo must be an object";
    }

    const limits: Record<string, number> = {
      metaTitle: 70,
      metaDescription: 170,
      canonicalUrl: 2048,
    };

    for (const [key, max] of Object.entries(limits)) {
      const value = body.seo[key];

      if (
        value !== undefined &&
        (typeof value !== "string" || value.length > max)
      ) {
        return `seo.${key} must be a string of at most ${max} characters`;
      }
    }
  }

  if (body.slug !== undefined) {
    if (
      typeof body.slug !== "string" ||
      !body.slug.trim() ||
      body.slug.length > 280
    ) {
      return "slug must be a non-empty string of at most 280 characters";
    }
  }

  return null;
}

function isDuplicateKeyError(
  error: unknown
): error is { code: number } {
  return (
    isRecord(error) &&
    error.code === 11000
  );
}

function isValidationError(
  error: unknown
): error is mongoose.Error.ValidationError {
  return (
    error instanceof mongoose.Error.ValidationError
  );
}

function sendError(
  res: Response,
  error: unknown,
  fallback: string
) {
  if (isValidationError(error)) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  if (isDuplicateKeyError(error)) {
    return res.status(409).json({
      success: false,
      message: "An article with this slug already exists",
    });
  }

  console.error(fallback, error);

  return res.status(500).json({
    success: false,
    message: fallback,
  });
}

// GET /api/blogs
// Public: published articles only.
export async function getPublishedBlogs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);

    if (
      !Number.isInteger(page) ||
      !Number.isInteger(limit) ||
      page < 1 ||
      limit < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "Page and limit must be positive integers",
      });
    }

    const safeLimit = Math.min(limit, 30);

    const filter: Record<string, unknown> = {
      status: "published",
      publishedAt: { $lte: new Date() },
    };

    if (typeof req.query.category === "string") {
      const category = req.query.category.trim();

      if (category) {
        filter.category = category;
      }
    }

    if (typeof req.query.search === "string") {
      const search = req.query.search.trim().slice(0, 100);

      if (search) {
        const escaped = search.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        );

        const regex = new RegExp(escaped, "i");

        filter.$or = [
          { title: regex },
          { excerpt: regex },
          { category: regex },
          { tags: regex },
        ];
      }
    }

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .select(PUBLIC_FIELDS)
        .sort({ isFeatured: -1, publishedAt: -1, _id: -1 })
        .skip((page - 1) * safeLimit)
        .limit(safeLimit)
        .lean(),

      Blog.countDocuments(filter),
    ]);

    return res.json({
      success: true,
      data: blogs,
      pagination: {
        page,
        limit: safeLimit,
        total,
        pages: Math.ceil(total / safeLimit),
      },
    });
  } catch (error) {
    return next(error);
  }
}

// GET /api/blogs/featured
export async function getFeaturedBlog(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const blog = await Blog.findOne({
      status: "published",
      isFeatured: true,
      publishedAt: { $lte: new Date() },
    })
      .select(PUBLIC_FIELDS)
      .sort({ publishedAt: -1 })
      .lean();

    return res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    return next(error);
  }
}

// GET /api/blogs/categories
export async function getBlogCategories(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const categories = await Blog.distinct("category", {
      status: "published",
      publishedAt: { $lte: new Date() },
    });

    return res.json({
      success: true,
      data: categories.sort((a, b) => a.localeCompare(b)),
    });
  } catch (error) {
    return next(error);
  }
}

// GET /api/blogs/:slug
export async function getPublishedBlogBySlug(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      status: "published",
      publishedAt: { $lte: new Date() },
    })
      .select("+content")
      .lean();

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    return res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    return next(error);
  }
}

// GET /api/blogs/admin/all
// Must be protected by admin authentication middleware.
export async function getAllBlogs(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const blogs = await Blog.find()
      .sort({ updatedAt: -1 })
      .select(PUBLIC_FIELDS + " content")
      .lean();

    return res.json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    return next(error);
  }
}

// POST /api/blogs
// Must be protected by admin authentication middleware.
export async function createBlog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!isRecord(req.body)) {
      return res.status(400).json({
        success: false,
        message: "Request body must be an object",
      });
    }

    const error = validateBlog(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }

    const slug = makeSlug(
      typeof req.body.slug === "string"
        ? req.body.slug
        : String(req.body.title)
    );

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "A valid slug is required",
      });
    }

    const status = (req.body.status ?? "draft") as BlogStatus;

    const blog = await Blog.create({
      title: req.body.title,
      slug,
      category: req.body.category,
      excerpt: req.body.excerpt,
      content: req.body.content,
      coverImage: req.body.coverImage || null,
      imageAlt: req.body.imageAlt ?? "",
      authorName:
        req.body.authorName ?? "Shineweb Tech Creations",
      readingTime: req.body.readingTime ?? 5,
      tags: req.body.tags ?? [],
      isFeatured: req.body.isFeatured ?? false,
      seo: req.body.seo ?? {},
      status,
      publishedAt:
        status === "published" ? new Date() : null,
    });

    return res.status(201).json({
      success: true,
      message: "Blog article created",
      data: blog,
    });
  } catch (error) {
    return sendError(res, error, "Failed to create blog article");
  }
}

// PATCH /api/blogs/:id
// Must be protected by admin authentication middleware.
export async function updateBlog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID",
      });
    }

    if (!isRecord(req.body)) {
      return res.status(400).json({
        success: false,
        message: "Request body must be an object",
      });
    }

    const allowed = [
      "title",
      "slug",
      "category",
      "excerpt",
      "content",
      "coverImage",
      "imageAlt",
      "authorName",
      "readingTime",
      "tags",
      "status",
      "isFeatured",
      "seo",
    ];

    const updates: Record<string, unknown> = {};

    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update",
      });
    }

    const existing = await Blog.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Blog article not found",
      });
    }

    // Validate the merged document, not just the partial PATCH body.
    const candidate = {
      title: updates.title ?? existing.title,
      category: updates.category ?? existing.category,
      excerpt: updates.excerpt ?? existing.excerpt,
      content: updates.content ?? existing.content,
      coverImage: updates.coverImage ?? existing.coverImage,
      slug: updates.slug ?? existing.slug,
      status: updates.status ?? existing.status,
      isFeatured: updates.isFeatured ?? existing.isFeatured,
      authorName: updates.authorName ?? existing.authorName,
      readingTime: updates.readingTime ?? existing.readingTime,
      tags: updates.tags ?? existing.tags,
      imageAlt: updates.imageAlt ?? existing.imageAlt,
      seo: updates.seo ?? existing.seo,
    };

    const error = validateBlog(candidate);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }

    if (updates.slug !== undefined) {
      updates.slug = makeSlug(String(updates.slug));
    } else if (updates.title !== undefined) {
      // Preserve existing URLs when only the title changes.
      // Explicitly send a slug to change the URL.
      delete updates.slug;
    }

    if (
      updates.slug !== undefined &&
      !updates.slug
    ) {
      return res.status(400).json({
        success: false,
        message: "A valid slug is required",
      });
    }

    const nextStatus = candidate.status as BlogStatus;

    if (nextStatus === "published") {
      // Preserve an existing publication date when editing a post.
      updates.publishedAt =
        existing.status === "published" && existing.publishedAt
          ? existing.publishedAt
          : new Date();
    } else {
      updates.publishedAt = null;
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.json({
      success: true,
      message: "Blog article updated",
      data: blog,
    });
  } catch (error) {
    return sendError(res, error, "Failed to update blog article");
  }
}

// DELETE /api/blogs/:id
// Must be protected by admin authentication middleware.
export async function deleteBlog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID",
      });
    }

    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog article not found",
      });
    }

    return res.json({
      success: true,
      message: "Blog article deleted",
    });
  } catch (error) {
    return next(error);
  }
}
