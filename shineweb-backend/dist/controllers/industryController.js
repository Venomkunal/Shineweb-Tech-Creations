"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteIndustry = exports.updateIndustry = exports.getIndustryById = exports.getIndustries = exports.createIndustry = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Industry_1 = __importDefault(require("../models/Industry"));
// CREATE INDUSTRY
const createIndustry = async (req, res) => {
    try {
        const { title, slug, description, image, number, href, isPublished, sortOrder, } = req.body;
        if (!title?.trim() ||
            !slug?.trim() ||
            !description?.trim() ||
            !image?.trim()) {
            res.status(400).json({
                success: false,
                message: "Title, slug, description and image are required.",
            });
            return;
        }
        const normalizedSlug = slug.trim().toLowerCase();
        const existingIndustry = await Industry_1.default.findOne({
            slug: normalizedSlug,
        });
        if (existingIndustry) {
            res.status(409).json({
                success: false,
                message: "An industry with this slug already exists.",
            });
            return;
        }
        const industry = await Industry_1.default.create({
            title: title.trim(),
            slug: normalizedSlug,
            description: description.trim(),
            image: image.trim(),
            number,
            href,
            isPublished,
            sortOrder,
        });
        res.status(201).json({
            success: true,
            message: "Industry created successfully.",
            data: industry,
        });
    }
    catch (error) {
        console.error("Create industry error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create industry.",
        });
    }
};
exports.createIndustry = createIndustry;
// GET ALL INDUSTRIES
const getIndustries = async (req, res) => {
    try {
        const page = Math.max(1, Number.parseInt(String(req.query.page ?? "1"), 10) || 1);
        const limit = Math.min(100, Math.max(1, Number.parseInt(String(req.query.limit ?? "50"), 10) || 50));
        const filter = {};
        // Public visitors see published industries only.
        // Admins can pass ?all=true when using an admin-only route.
        if (req.query.all !== "true") {
            filter.isPublished = true;
        }
        const [industries, total] = await Promise.all([
            Industry_1.default.find(filter)
                .sort({ sortOrder: 1, createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .lean(),
            Industry_1.default.countDocuments(filter),
        ]);
        res.status(200).json({
            success: true,
            count: industries.length,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: industries,
        });
    }
    catch (error) {
        console.error("Get industries error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch industries.",
        });
    }
};
exports.getIndustries = getIndustries;
// GET SINGLE INDUSTRY BY MONGODB ID
const getIndustryById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.isValidObjectId(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid industry ID.",
            });
            return;
        }
        const industry = await Industry_1.default.findById(id).lean();
        if (!industry) {
            res.status(404).json({
                success: false,
                message: "Industry not found.",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: industry,
        });
    }
    catch (error) {
        console.error("Get industry error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch industry.",
        });
    }
};
exports.getIndustryById = getIndustryById;
// UPDATE INDUSTRY
const updateIndustry = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.isValidObjectId(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid industry ID.",
            });
            return;
        }
        const allowedFields = [
            "title",
            "slug",
            "description",
            "image",
            "number",
            "href",
            "isPublished",
            "sortOrder",
        ];
        const updates = {};
        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }
        if (Object.keys(updates).length === 0) {
            res.status(400).json({
                success: false,
                message: "Provide at least one field to update.",
            });
            return;
        }
        for (const field of [
            "title",
            "slug",
            "description",
            "image",
        ]) {
            const value = updates[field];
            if (value !== undefined) {
                if (typeof value !== "string" || !value.trim()) {
                    res.status(400).json({
                        success: false,
                        message: `${field} must be a non-empty string.`,
                    });
                    return;
                }
                updates[field] =
                    field === "slug"
                        ? value.trim().toLowerCase()
                        : value.trim();
            }
        }
        if (updates.isPublished !== undefined &&
            typeof updates.isPublished !== "boolean") {
            res.status(400).json({
                success: false,
                message: "isPublished must be a boolean.",
            });
            return;
        }
        if (updates.sortOrder !== undefined &&
            (!Number.isInteger(updates.sortOrder) ||
                updates.sortOrder < 0)) {
            res.status(400).json({
                success: false,
                message: "sortOrder must be a non-negative integer.",
            });
            return;
        }
        if (updates.slug !== undefined &&
            await Industry_1.default.exists({
                slug: updates.slug,
                _id: { $ne: id },
            })) {
            res.status(409).json({
                success: false,
                message: "An industry with this slug already exists.",
            });
            return;
        }
        const industry = await Industry_1.default.findByIdAndUpdate(id, { $set: updates }, {
            new: true,
            runValidators: true,
        });
        if (!industry) {
            res.status(404).json({
                success: false,
                message: "Industry not found.",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Industry updated successfully.",
            data: industry,
        });
    }
    catch (error) {
        console.error("Update industry error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update industry.",
        });
    }
};
exports.updateIndustry = updateIndustry;
// DELETE INDUSTRY
const deleteIndustry = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.isValidObjectId(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid industry ID.",
            });
            return;
        }
        const industry = await Industry_1.default.findByIdAndDelete(id);
        if (!industry) {
            res.status(404).json({
                success: false,
                message: "Industry not found.",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Industry deleted successfully.",
            data: {
                id: industry._id,
                slug: industry.slug,
            },
        });
    }
    catch (error) {
        console.error("Delete industry error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete industry.",
        });
    }
};
exports.deleteIndustry = deleteIndustry;
