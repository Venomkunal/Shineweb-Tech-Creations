"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicTestimonials = getPublicTestimonials;
exports.getAllTestimonials = getAllTestimonials;
exports.createTestimonial = createTestimonial;
exports.updateTestimonial = updateTestimonial;
exports.deleteTestimonial = deleteTestimonial;
const mongoose_1 = __importDefault(require("mongoose"));
const Testimonial_1 = __importDefault(require("../models/Testimonial"));
const allowedFields = [
    "name",
    "role",
    "company",
    "category",
    "text",
    "rating",
    "avatarUrl",
    "isPublished",
    "sortOrder",
];
function isValidObjectId(id) {
    return mongoose_1.default.isValidObjectId(id);
}
async function getPublicTestimonials(_req, res) {
    try {
        const data = await Testimonial_1.default.find({ isPublished: true })
            .select("-__v")
            .sort({ sortOrder: 1, createdAt: -1 })
            .lean();
        res.status(200).json({
            success: true,
            count: data.length,
            data,
        });
    }
    catch {
        res.status(500).json({
            success: false,
            message: "Failed to fetch testimonials.",
        });
    }
}
async function getAllTestimonials(_req, res) {
    try {
        const data = await Testimonial_1.default.find()
            .sort({ sortOrder: 1, createdAt: -1 })
            .lean();
        res.status(200).json({
            success: true,
            count: data.length,
            data,
        });
    }
    catch {
        res.status(500).json({
            success: false,
            message: "Failed to fetch testimonials.",
        });
    }
}
async function createTestimonial(req, res) {
    try {
        const { name, role, company, category, text, rating, avatarUrl, isPublished, sortOrder, } = req.body;
        if (typeof name !== "string" ||
            !name.trim() ||
            typeof category !== "string" ||
            !category.trim() ||
            typeof text !== "string" ||
            !text.trim()) {
            res.status(400).json({
                success: false,
                message: "Name, category, and review text are required.",
            });
            return;
        }
        const data = await Testimonial_1.default.create({
            name,
            role,
            company,
            category,
            text,
            ...(rating !== undefined && { rating }),
            ...(avatarUrl !== undefined && { avatarUrl }),
            ...(isPublished !== undefined && { isPublished }),
            ...(sortOrder !== undefined && { sortOrder }),
        });
        res.status(201).json({
            success: true,
            message: "Testimonial created successfully.",
            data,
        });
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError ||
            error instanceof mongoose_1.default.Error.CastError) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Failed to create testimonial.",
        });
    }
}
async function updateTestimonial(req, res) {
    try {
        if (!isValidObjectId(req.params.id)) {
            res.status(400).json({
                success: false,
                message: "Invalid testimonial ID.",
            });
            return;
        }
        const updates = {};
        for (const field of allowedFields) {
            if (Object.hasOwn(req.body, field)) {
                updates[field] = req.body[field];
            }
        }
        if (Object.keys(updates).length === 0) {
            res.status(400).json({
                success: false,
                message: "No valid fields supplied.",
            });
            return;
        }
        const data = await Testimonial_1.default.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true, runValidators: true });
        if (!data) {
            res.status(404).json({
                success: false,
                message: "Testimonial not found.",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Testimonial updated successfully.",
            data,
        });
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError ||
            error instanceof mongoose_1.default.Error.CastError) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Failed to update testimonial.",
        });
    }
}
async function deleteTestimonial(req, res) {
    try {
        if (!isValidObjectId(req.params.id)) {
            res.status(400).json({
                success: false,
                message: "Invalid testimonial ID.",
            });
            return;
        }
        const data = await Testimonial_1.default.findByIdAndDelete(req.params.id);
        if (!data) {
            res.status(404).json({
                success: false,
                message: "Testimonial not found.",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Testimonial deleted successfully.",
        });
    }
    catch {
        res.status(500).json({
            success: false,
            message: "Failed to delete testimonial.",
        });
    }
}
