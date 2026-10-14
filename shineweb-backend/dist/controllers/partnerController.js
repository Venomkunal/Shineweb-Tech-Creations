"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicPartners = getPublicPartners;
exports.getAdminPartners = getAdminPartners;
exports.createPartner = createPartner;
exports.updatePartner = updatePartner;
exports.deletePartner = deletePartner;
const Partner_1 = __importDefault(require("../models/Partner"));
const slugify = (value) => value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const allowedFields = [
    "name",
    "slug",
    "category",
    "description",
    "logoUrl",
    "websiteUrl",
    "sortOrder",
    "status",
    "featured",
];
function getPayload(body) {
    const payload = {};
    for (const field of allowedFields) {
        if (body[field] !== undefined)
            payload[field] = body[field];
    }
    if (typeof payload.name === "string" && !payload.slug) {
        payload.slug = slugify(payload.name);
    }
    if (typeof payload.slug === "string") {
        payload.slug = slugify(payload.slug);
    }
    return payload;
}
// Public: active partners only
async function getPublicPartners(_req, res) {
    try {
        const partners = await Partner_1.default.find({ status: "active" })
            .sort({ sortOrder: 1, name: 1 })
            .select("name slug category description logoUrl websiteUrl sortOrder featured")
            .lean();
        res.json({ success: true, data: partners });
    }
    catch {
        res.status(500).json({
            success: false,
            message: "Unable to load partners.",
        });
    }
}
// Admin: all partners
async function getAdminPartners(_req, res) {
    try {
        const partners = await Partner_1.default.find()
            .sort({ sortOrder: 1, createdAt: -1 })
            .lean();
        res.json({ success: true, data: partners });
    }
    catch {
        res.status(500).json({
            success: false,
            message: "Unable to load partners.",
        });
    }
}
// Admin: create
async function createPartner(req, res) {
    try {
        const payload = getPayload(req.body);
        if (typeof payload.name !== "string" ||
            !payload.name.trim() ||
            typeof payload.category !== "string" ||
            !payload.category.trim()) {
            return res.status(400).json({
                success: false,
                message: "Name and category are required.",
            });
        }
        const partner = await Partner_1.default.create(payload);
        return res.status(201).json({
            success: true,
            data: partner,
            message: "Partner created.",
        });
    }
    catch (error) {
        const mongoError = error;
        if (mongoError.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "A partner with this slug already exists.",
            });
        }
        if (mongoError.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: "Partner data is invalid.",
            });
        }
        return res.status(500).json({
            success: false,
            message: "Unable to create partner.",
        });
    }
}
// Admin: update
async function updatePartner(req, res) {
    try {
        const payload = getPayload(req.body);
        if (payload.name !== undefined &&
            (typeof payload.name !== "string" || !payload.name.trim())) {
            return res.status(400).json({
                success: false,
                message: "Name cannot be empty.",
            });
        }
        if (payload.category !== undefined &&
            (typeof payload.category !== "string" ||
                !payload.category.trim())) {
            return res.status(400).json({
                success: false,
                message: "Category cannot be empty.",
            });
        }
        const partner = await Partner_1.default.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
        if (!partner) {
            return res.status(404).json({
                success: false,
                message: "Partner not found.",
            });
        }
        return res.json({
            success: true,
            data: partner,
            message: "Partner updated.",
        });
    }
    catch (error) {
        const mongoError = error;
        if (mongoError.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "A partner with this slug already exists.",
            });
        }
        if (mongoError.name === "ValidationError" ||
            mongoError.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid partner data or ID.",
            });
        }
        return res.status(500).json({
            success: false,
            message: "Unable to update partner.",
        });
    }
}
// Admin: delete
async function deletePartner(req, res) {
    try {
        const partner = await Partner_1.default.findByIdAndDelete(req.params.id);
        if (!partner) {
            return res.status(404).json({
                success: false,
                message: "Partner not found.",
            });
        }
        return res.json({
            success: true,
            message: "Partner deleted.",
        });
    }
    catch {
        return res.status(400).json({
            success: false,
            message: "Invalid partner ID.",
        });
    }
}
