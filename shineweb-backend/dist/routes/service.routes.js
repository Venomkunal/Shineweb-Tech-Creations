"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const Service_1 = __importDefault(require("../models/Service"));
const auth_1 = require("../middleware/auth");
const asyncHandler_1 = require("../utils/asyncHandler");
const router = (0, express_1.Router)();
const serviceSchema = zod_1.z.object({
    title: zod_1.z.string().trim().min(2).max(120),
    slug: zod_1.z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(140),
    summary: zod_1.z.string().trim().min(5).max(300),
    description: zod_1.z.string().max(10000).optional(),
    icon: zod_1.z.string().max(100).optional(),
    imageUrl: zod_1.z.string().max(1000).optional(),
    featured: zod_1.z.boolean().optional(),
    published: zod_1.z.boolean().optional(),
    sortOrder: zod_1.z.number().int().min(0).max(10000).optional()
});
router.get('/', (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const items = await Service_1.default.find({ published: true }).sort({ sortOrder: 1, createdAt: -1 });
    res.json({ success: true, data: items });
}));
router.get('/admin/all', auth_1.requireAuth, auth_1.requireAdmin, (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const items = await Service_1.default.find().sort({ sortOrder: 1, createdAt: -1 });
    res.json({ success: true, data: items });
}));
router.post('/', auth_1.requireAuth, auth_1.requireAdmin, (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const parsed = serviceSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ success: false, message: 'Invalid service fields', errors: parsed.error.flatten().fieldErrors });
        return;
    }
    const item = await Service_1.default.create(parsed.data);
    res.status(201).json({ success: true, data: item });
}));
router.patch('/:id', auth_1.requireAuth, auth_1.requireAdmin, (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const parsed = serviceSchema.partial().safeParse(req.body);
    if (!parsed.success || !Object.keys(parsed.data ?? {}).length) {
        res.status(400).json({ success: false, message: 'Provide valid service fields' });
        return;
    }
    const item = await Service_1.default.findByIdAndUpdate(req.params.id, parsed.data, { new: true, runValidators: true });
    if (!item) {
        res.status(404).json({ success: false, message: 'Service not found' });
        return;
    }
    res.json({ success: true, data: item });
}));
router.delete('/:id', auth_1.requireAuth, auth_1.requireAdmin, (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const item = await Service_1.default.findByIdAndDelete(req.params.id);
    if (!item) {
        res.status(404).json({ success: false, message: 'Service not found' });
        return;
    }
    res.json({ success: true, message: 'Service deleted' });
}));
exports.default = router;
