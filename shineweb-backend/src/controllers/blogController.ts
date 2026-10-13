
import type { Request, Response } from "express";
import mongoose from "mongoose";
import Blog from "../models/Blog";

function makeSlug(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function validateBlog(body: Record<string, unknown>) {
  const required = [
    "title",
    "category",
    "excerpt",
    "content",
    "coverImage",
  ];

  for (const field of required) {
    if (
      typeof body[field] !== "string" ||
      !body[field].trim()
    ) {
      return `${field} is required`;
    }
  }

  if (String(body.title).length > 180) {
    return "Title cannot exceed 180 characters";
  }

  if (String(body.excerpt).length > 400) {
    return "Excerpt cannot exceed 400 characters";
  }

  if (
    body.status !== undefined &&
    !["draft", "published"].includes(String(body.status))
  ) {
    return "Status must be draft or published";
  }

  if (
    body.featured !== undefined &&
    typeof body.featured !== "boolean"
  ) {
    return "Featured must be a boolean";
  }

  if (
    body.tags !== undefined &&
    (!Array.isArray(body.tags) ||
      !body.tags.every(
        (tag) => typeof tag === "string" && tag.length <= 50
      ))
  ) {
    return "Tags must be an array of strings";
  }

  return null;
}

// GET /api/blogs — public, published articles only
export async function getPublishedBlogs(
  req: Request,
  res: Response
) {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(
      30,
      Math.max(1, Number(req.query.limit) || 10)
    );

    const filter: Record<string, unknown> = {
      status: "published",
      publishedAt: { $lte: new Date() },
    };

    if (typeof req.query.category === "string") {
      filter.category = req.query.category;
    }

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .select("-content")
        .sort({ featured: -1, publishedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Blog.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog articles",
    });
  }
}

// GET /api/blogs/:slug — public article detail
export async function getPublishedBlogBySlug(
  req: Request,
  res: Response
) {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      status: "published",
      publishedAt: { $lte: new Date() },
    }).lean();

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    return res.json({ success: true, data: blog });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch article",
    });
  }
}

// GET /api/blogs/admin/all — protected
export async function getAllBlogs(
  _req: Request,
  res: Response
) {
  try {
    const blogs = await Blog.find()
      .sort({ updatedAt: -1 })
      .lean();

    res.json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin articles",
    });
  }
}

// POST /api/blogs — protected
export async function createBlog(
  req: Request,
  res: Response
) {
  try {
    const error = validateBlog(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }

    const slug = makeSlug(
      typeof req.body.slug === "string" && req.body.slug.trim()
        ? req.body.slug
        : req.body.title
    );

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "A valid slug is required",
      });
    }

    const status =
      req.body.status === "published" ? "published" : "draft";

    const blog = await Blog.create({
      title: req.body.title,
      slug,
      category: req.body.category,
      excerpt: req.body.excerpt,
      content: req.body.content,
      coverImage: req.body.coverImage,
      imageAlt: req.body.imageAlt ?? "",
      author: req.body.author || "Shineweb Tech Creations",
      tags: req.body.tags ?? [],
      featured: req.body.featured ?? false,
      status,
      publishedAt:
        status === "published" ? new Date() : undefined,
    });

    return res.status(201).json({
      success: true,
      message: "Blog article created",
      data: blog,
    });
  } catch (error: unknown) {
    if (
      error instanceof mongoose.Error &&
      error.name === "ValidationError"
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return res.status(409).json({
        success: false,
        message: "This blog slug already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create blog article",
    });
  }
}

// PATCH /api/blogs/:id — protected
export async function updateBlog(
  req: Request,
  res: Response
) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID",
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
      "author",
      "tags",
      "status",
      "featured",
    ];

    const updates: Record<string, unknown> = {};

    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    const merged = {
      title: updates.title,
      category: updates.category,
      excerpt: updates.excerpt,
      content: updates.content,
      coverImage: updates.coverImage,
    };

    for (const [key, value] of Object.entries(merged)) {
      if (value !== undefined && typeof value !== "string") {
        return res.status(400).json({
          success: false,
          message: `${key} must be a string`,
        });
      }
    }

    if (
      updates.title !== undefined &&
      !String(updates.title).trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Title cannot be empty",
      });
    }

    if (updates.slug !== undefined) {
      updates.slug = makeSlug(String(updates.slug));
    } else if (updates.title !== undefined) {
      updates.slug = makeSlug(String(updates.title));
    }

    if (updates.status !== undefined) {
      if (!["draft", "published"].includes(String(updates.status))) {
        return res.status(400).json({
          success: false,
          message: "Invalid article status",
        });
      }

      if (updates.status === "published") {
        const existing = await Blog.findById(req.params.id).lean();

        if (
          existing &&
          (existing.status !== "published" || !existing.publishedAt)
        ) {
          updates.publishedAt = new Date();
        }
      } else {
        updates.publishedAt = undefined;
      }
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog article not found",
      });
    }

    return res.json({
      success: true,
      message: "Blog article updated",
      data: blog,
    });
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return res.status(409).json({
        success: false,
        message: "This blog slug already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update blog article",
    });
  }
}

// DELETE /api/blogs/:id — protected
export async function deleteBlog(
  req: Request,
  res: Response
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
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to delete blog article",
    });
  }
}
