
import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Product from "../models/Product";

const PRODUCT_FIELDS = [
  "name",
  "slug",
  "description",
  "category",
  "price",
  "oldPrice",
  "rating",
  "reviews",
  "image",
  "badge",
  "featured",
  "active",
] as const;

type ProductInput = Record<string, unknown>;

function pickProductFields(body: unknown): ProductInput {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return {};
  }

  const input = body as Record<string, unknown>;
  const data: ProductInput = {};

  for (const field of PRODUCT_FIELDS) {
    if (input[field] !== undefined) {
      data[field] = input[field];
    }
  }

  return data;
}

function isValidId(id: string): boolean {
  return mongoose.isValidObjectId(id);
}

function getProductId(req: Request): string | null {
  const id = req.params.id;

  return typeof id === "string" && id.trim() ? id : null;
}

function normalizeSlug(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isNonNegativeNumber(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    value >= 0
  );
}

function validOptionalFields(data: ProductInput): boolean {
  for (const field of ["oldPrice", "rating", "reviews"] as const) {
    const value = data[field];

    if (value !== undefined && !isNonNegativeNumber(value)) {
      return false;
    }
  }

  for (const field of ["image", "badge", "slug"] as const) {
    const value = data[field];

    if (value !== undefined && typeof value !== "string") {
      return false;
    }
  }

  for (const field of ["featured", "active"] as const) {
    const value = data[field];

    if (value !== undefined && typeof value !== "boolean") {
      return false;
    }
  }

  return true;
}

function parsePositiveInteger(
  value: unknown,
  fallback: number,
  maximum: number
): number {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.min(Math.max(Math.floor(parsed), 1), maximum);
}

function sendInvalidId(res: Response): void {
  res.status(400).json({
    success: false,
    message: "Invalid product ID",
  });
}

// GET /api/products
export async function getProducts(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const page = parsePositiveInteger(req.query.page, 1, 1000000);
    const limit = parsePositiveInteger(req.query.limit, 12, 100);

    const filter: Record<string, unknown> = {};

    if (
      typeof req.query.category === "string" &&
      req.query.category.trim()
    ) {
      filter.category = req.query.category.trim();
    }

    if (req.query.featured === "true") filter.featured = true;
    if (req.query.featured === "false") filter.featured = false;
    if (req.query.active === "true") filter.active = true;
    if (req.query.active === "false") filter.active = false;

    if (
      typeof req.query.search === "string" &&
      req.query.search.trim()
    ) {
      const search = req.query.search.trim().slice(0, 100);
      const escaped = search.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      filter.$or = [
        { name: { $regex: escaped, $options: "i" } },
        { description: { $regex: escaped, $options: "i" } },
        { category: { $regex: escaped, $options: "i" } },
      ];
    }

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select(
          "name slug description category price oldPrice rating reviews image badge featured active createdAt updatedAt"
        )
        .lean(),

      Product.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: products.map((product) => ({
        ...product,
        id: String(product._id),
      })),
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/products/featured?limit=8
export async function getFeaturedProducts(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const limit = parsePositiveInteger(req.query.limit, 8, 24);

    const products = await Product.find({
      active: true,
      featured: true,
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select(
        "name slug description category price oldPrice rating reviews image badge"
      )
      .lean();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products.map((product) => ({
        ...product,
        id: String(product._id),
      })),
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/products/:id
export async function getProductById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = getProductId(req);

    if (!id || !isValidId(id)) {
      sendInvalidId(res);
      return;
    }

    const product = await Product.findById(id).lean();

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        ...product,
        id: String(product._id),
      },
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/products/slug/:slug
export async function getProductBySlug(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const slug = req.params.slug;

    if (typeof slug !== "string" || !slug.trim()) {
      res.status(400).json({
        success: false,
        message: "Invalid product slug",
      });
      return;
    }

    const product = await Product.findOne({
      slug: slug.trim().toLowerCase(),
      active: true,
    }).lean();

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        ...product,
        id: String(product._id),
      },
    });
  } catch (error) {
    next(error);
  }
}

// POST /api/products
export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = pickProductFields(req.body);

    if (
      !isNonEmptyString(data.name) ||
      !isNonEmptyString(data.category) ||
      typeof data.description !== "string" ||
      !isNonNegativeNumber(data.price) ||
      !isNonEmptyString(data.image)
    ) {
      res.status(400).json({
        success: false,
        message:
          "Valid name, category, description, price and image are required",
      });
      return;
    }

    if (!validOptionalFields(data)) {
      res.status(400).json({
        success: false,
        message: "Optional product fields have invalid values",
      });
      return;
    }

    const slug = normalizeSlug(
      isNonEmptyString(data.slug) ? data.slug : data.name
    );

    if (!slug) {
      res.status(400).json({
        success: false,
        message: "A valid product slug is required",
      });
      return;
    }

    const existing = await Product.findOne({ slug }).lean();

    if (existing) {
      res.status(409).json({
        success: false,
        message: "A product with this slug already exists",
      });
      return;
    }

    data.name = data.name.trim();
    data.category = data.category.trim();
    data.description = data.description.trim();
    data.image = data.image.trim();
    data.slug = slug;

    if (data.featured === undefined) data.featured = false;
    if (data.active === undefined) data.active = true;
    if (data.rating === undefined) data.rating = 0;
    if (data.reviews === undefined) data.reviews = 0;

    const product = await Product.create(data);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: {
        ...product.toObject(),
        id: product.id,
      },
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
      return;
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      res.status(409).json({
        success: false,
        message: "A product with this slug already exists",
      });
      return;
    }

    next(error);
  }
}

// PUT /api/products/:id
export async function updateProduct(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = getProductId(req);

    if (!id || !isValidId(id)) {
      sendInvalidId(res);
      return;
    }

    const data = pickProductFields(req.body);

    if (Object.keys(data).length === 0) {
      res.status(400).json({
        success: false,
        message: "No valid product fields provided",
      });
      return;
    }

    if (data.name !== undefined && !isNonEmptyString(data.name)) {
      res.status(400).json({
        success: false,
        message: "Product name must be a non-empty string",
      });
      return;
    }

    if (
      data.category !== undefined &&
      !isNonEmptyString(data.category)
    ) {
      res.status(400).json({
        success: false,
        message: "Category must be a non-empty string",
      });
      return;
    }

    if (
      data.description !== undefined &&
      typeof data.description !== "string"
    ) {
      res.status(400).json({
        success: false,
        message: "Description must be a string",
      });
      return;
    }

    if (
      data.price !== undefined &&
      !isNonNegativeNumber(data.price)
    ) {
      res.status(400).json({
        success: false,
        message: "Price must be a non-negative number",
      });
      return;
    }

    if (!validOptionalFields(data)) {
      res.status(400).json({
        success: false,
        message: "Optional product fields have invalid values",
      });
      return;
    }

    if (typeof data.name === "string") {
      data.name = data.name.trim();
    }

    if (typeof data.category === "string") {
      data.category = data.category.trim();
    }

    if (typeof data.description === "string") {
      data.description = data.description.trim();
    }

    if (typeof data.image === "string") {
      data.image = data.image.trim();
    }

    if (typeof data.slug === "string") {
      data.slug = normalizeSlug(data.slug);

      if (!data.slug) {
        res.status(400).json({
          success: false,
          message: "Invalid product slug",
        });
        return;
      }
    } else if (typeof data.name === "string") {
      data.slug = normalizeSlug(data.name);
    }

    if (typeof data.slug === "string") {
      const duplicate = await Product.findOne({
        slug: data.slug,
        _id: { $ne: id },
      }).lean();

      if (duplicate) {
        res.status(409).json({
          success: false,
          message: "Another product already uses this slug",
        });
        return;
      }
    }

    const product = await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: {
        ...product.toObject(),
        id: product.id,
      },
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
      return;
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      res.status(409).json({
        success: false,
        message: "A product with this slug already exists",
      });
      return;
    }

    next(error);
  }
}

// DELETE /api/products/:id
export async function deleteProduct(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = getProductId(req);

    if (!id || !isValidId(id)) {
      sendInvalidId(res);
      return;
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: {
        id: product.id,
        name: product.name,
      },
    });
  } catch (error) {
    next(error);
  }
}
