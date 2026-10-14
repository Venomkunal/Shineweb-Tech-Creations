"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const User_1 = __importDefault(require("../models/User"));
const asyncHandler_1 = require("../utils/asyncHandler");
const router = (0, express_1.Router)();
const loginSchema = zod_1.z.object({ email: zod_1.z.string().email().max(254), password: zod_1.z.string().min(1).max(200) });
router.post('/login', (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ success: false, message: 'Enter a valid email and password' });
        return;
    }
    const email = parsed.data.email.toLowerCase();
    const user = await User_1.default.findOne({ email, active: true }).select('+passwordHash');
    if (!user || !(await bcryptjs_1.default.compare(parsed.data.password, user.passwordHash))) {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
        return;
    }
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new Error('JWT_SECRET missing');
    const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, secret, { expiresIn: (process.env.JWT_EXPIRES_IN || '1d') });
    res.json({ success: true, data: { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } } });
}));
exports.default = router;
