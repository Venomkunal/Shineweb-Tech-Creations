"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = getProducts;
exports.getFeaturedProducts = getFeaturedProducts;
exports.getProductById = getProductById;
exports.getProductBySlug = getProductBySlug;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
const mongoose_1 = __importDefault(require("mongoose"));
const Product_1 = __importDefault(require("../models/Product"));
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
];
function pickProductFields(body) {
    if (!body || typeof body !== "object" || Array.isArray(body)) {
        return {};
    }
    const input = body;
    const data = {};
    for (const field of PRODUCT_FIELDS) {
        if (input[field] !== undefined) {
            data[field] = input[field];
        }
    }
    return data;
}
function isValidId(id) {
    return mongoose_1.default.isValidObjectId(id);
}
function getProductId(req) {
    const id = req.params.id;
    return typeof id === "string" && id.trim() ? id : null;
}
function normalizeSlug(value) {
    return value
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}
function isNonEmptyString(value) {
    return typeof value === "string" && value.trim().length > 0;
}
function isNonNegativeNumber(value) {
    return (typeof value === "number" &&
        Number.isFinite(value) &&
        value >= 0);
}
function validOptionalFields(data) {
    for (const field of ["oldPrice", "rating", "reviews"]) {
        const value = data[field];
        if (value !== undefined && !isNonNegativeNumber(value)) {
            return false;
        }
    }
    for (const field of ["image", "badge", "slug"]) {
        const value = data[field];
        if (value !== undefined && typeof value !== "string") {
            return false;
        }
    }
    for (const field of ["featured", "active"]) {
        const value = data[field];
        if (value !== undefined && typeof value !== "boolean") {
            return false;
        }
    }
    return true;
}
function parsePositiveInteger(value, fallback, maximum) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
        return fallback;
    }
    return Math.min(Math.max(Math.floor(parsed), 1), maximum);
}
function sendInvalidId(res) {
    res.status(400).json({
        success: false,
        message: "Invalid product ID",
    });
}
// GET /api/products
async function getProducts(req, res, next) {
    try {
        const page = parsePositiveInteger(req.query.page, 1, 1000000);
        const limit = parsePositiveInteger(req.query.limit, 12, 100);
        const filter = {};
        if (typeof req.query.category === "string" &&
            req.query.category.trim()) {
            filter.category = req.query.category.trim();
        }
        if (req.query.featured === "true")
            filter.featured = true;
        if (req.query.featured === "false")
            filter.featured = false;
        if (req.query.active === "true")
            filter.active = true;
        if (req.query.active === "false")
            filter.active = false;
        if (typeof req.query.search === "string" &&
            req.query.search.trim()) {
            const search = req.query.search.trim().slice(0, 100);
            const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            filter.$or = [
                { name: { $regex: escaped, $options: "i" } },
                { description: { $regex: escaped, $options: "i" } },
                { category: { $regex: escaped, $options: "i" } },
            ];
        }
        const [products, total] = await Promise.all([
            Product_1.default.find(filter)
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .select("name slug description category price oldPrice rating reviews image badge featured active createdAt updatedAt")
                .lean(),
            Product_1.default.countDocuments(filter),
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
    }
    catch (error) {
        next(error);
    }
}
// GET /api/products/featured?limit=8
async function getFeaturedProducts(req, res, next) {
    try {
        const limit = parsePositiveInteger(req.query.limit, 8, 24);
        const products = await Product_1.default.find({
            active: true,
            featured: true,
        })
            .sort({ createdAt: -1 })
            .limit(limit)
            .select("name slug description category price oldPrice rating reviews image badge")
            .lean();
        res.status(200).json({
            success: true,
            count: products.length,
            data: products.map((product) => ({
                ...product,
                id: String(product._id),
            })),
        });
    }
    catch (error) {
        next(error);
    }
}
// GET /api/products/:id
async function getProductById(req, res, next) {
    try {
        const id = getProductId(req);
        if (!id || !isValidId(id)) {
            sendInvalidId(res);
            return;
        }
        const product = await Product_1.default.findById(id).lean();
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
    }
    catch (error) {
        next(error);
    }
}
// GET /api/products/slug/:slug
async function getProductBySlug(req, res, next) {
    try {
        const slug = req.params.slug;
        if (typeof slug !== "string" || !slug.trim()) {
            res.status(400).json({
                success: false,
                message: "Invalid product slug",
            });
            return;
        }
        const product = await Product_1.default.findOne({
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
    }
    catch (error) {
        next(error);
    }
}
// POST /api/products
async function createProduct(req, res, next) {
    try {
        const data = pickProductFields(req.body);
        if (!isNonEmptyString(data.name) ||
            !isNonEmptyString(data.category) ||
            typeof data.description !== "string" ||
            !isNonNegativeNumber(data.price) ||
            !isNonEmptyString(data.image)) {
            res.status(400).json({
                success: false,
                message: "Valid name, category, description, price and image are required",
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
        const slug = normalizeSlug(isNonEmptyString(data.slug) ? data.slug : data.name);
        if (!slug) {
            res.status(400).json({
                success: false,
                message: "A valid product slug is required",
            });
            return;
        }
        const existing = await Product_1.default.findOne({ slug }).lean();
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
        if (data.featured === undefined)
            data.featured = false;
        if (data.active === undefined)
            data.active = true;
        if (data.rating === undefined)
            data.rating = 0;
        if (data.reviews === undefined)
            data.reviews = 0;
        const product = await Product_1.default.create(data);
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: {
                ...product.toObject(),
                id: product.id,
            },
        });
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
            return;
        }
        if (typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === 11000) {
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
async function updateProduct(req, res, next) {
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
        if (data.category !== undefined &&
            !isNonEmptyString(data.category)) {
            res.status(400).json({
                success: false,
                message: "Category must be a non-empty string",
            });
            return;
        }
        if (data.description !== undefined &&
            typeof data.description !== "string") {
            res.status(400).json({
                success: false,
                message: "Description must be a string",
            });
            return;
        }
        if (data.price !== undefined &&
            !isNonNegativeNumber(data.price)) {
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
        }
        else if (typeof data.name === "string") {
            data.slug = normalizeSlug(data.name);
        }
        if (typeof data.slug === "string") {
            const duplicate = await Product_1.default.findOne({
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
        const product = await Product_1.default.findByIdAndUpdate(id, data, {
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
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
            return;
        }
        if (typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === 11000) {
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
async function deleteProduct(req, res, next) {
    try {
        const id = getProductId(req);
        if (!id || !isValidId(id)) {
            sendInvalidId(res);
            return;
        }
        const product = await Product_1.default.findByIdAndDelete(id);
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
    }
    catch (error) {
        next(error);
    }
}
