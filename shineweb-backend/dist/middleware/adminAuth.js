"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = requireAdmin;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function requireAdmin(req, res, next) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return res.status(500).json({
            success: false,
            message: "Authentication is not configured.",
        });
    }
    const authorization = req.headers.authorization;
    const token = authorization?.startsWith("Bearer ")
        ? authorization.slice(7)
        : "";
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authentication required.",
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (typeof decoded !== "object" ||
            decoded === null ||
            !["admin", "administrator"].includes(String(decoded.role ?? "").toLowerCase())) {
            return res.status(403).json({
                success: false,
                message: "Administrator access required.",
            });
        }
        req.admin = {
            id: String(decoded.sub ?? decoded.id ?? ""),
            role: String(decoded.role),
        };
        next();
    }
    catch {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
}
