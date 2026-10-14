"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const Enquiry_1 = __importDefault(require("../models/Enquiry"));
const auth_1 = require("../middleware/auth");
const asyncHandler_1 = require("../utils/asyncHandler");
const router = (0, express_1.Router)();
const enquirySchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(2).max(100),
    email: zod_1.z.string().trim().email().max(254),
    phone: zod_1.z.string().trim().max(30).optional(),
    company: zod_1.z.string().trim().max(150).optional(),
    service: zod_1.z.string().trim().max(120).optional(),
    subject: zod_1.z.string().trim().max(200).optional(),
    message: zod_1.z.string().trim().min(10).max(5000),
    budget: zod_1.z.string().trim().max(80).optional(),
    timeline: zod_1.z.string().trim().max(80).optional(),
    source: zod_1.z.enum(['contact', 'quotation']).optional()
});
// Public website form: create an enquiry.
router.post('/', (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const parsed = enquirySchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ success: false, message: 'Please check the form fields', errors: parsed.error.flatten().fieldErrors });
        return;
    }
    const enquiry = await Enquiry_1.default.create(parsed.data);
    res.status(201).json({ success: true, message: 'Thank you. Your enquiry has been received.', data: { id: enquiry.id } });
}));
// Admin-only lead management.
router.get('/', auth_1.requireAuth, auth_1.requireAdmin, (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
    const status = typeof req.query.status === 'string' ? req.query.status : undefined;
    const filter = status && ['new', 'contacted', 'qualified', 'won', 'lost'].includes(status) ? { status } : {};
    const [items, total] = await Promise.all([
        Enquiry_1.default.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
        Enquiry_1.default.countDocuments(filter)
    ]);
    res.json({ success: true, data: items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
}));
router.patch('/:id', auth_1.requireAuth, auth_1.requireAdmin, (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const schema = zod_1.z.object({ status: zod_1.z.enum(['new', 'contacted', 'qualified', 'won', 'lost']).optional(), adminNotes: zod_1.z.string().max(5000).optional() }).refine(v => Object.keys(v).length > 0);
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ success: false, message: 'Provide a valid status or adminNotes value' });
        return;
    }
    const enquiry = await Enquiry_1.default.findByIdAndUpdate(req.params.id, parsed.data, { new: true, runValidators: true });
    if (!enquiry) {
        res.status(404).json({ success: false, message: 'Enquiry not found' });
        return;
    }
    res.json({ success: true, data: enquiry });
}));
exports.default = router;
