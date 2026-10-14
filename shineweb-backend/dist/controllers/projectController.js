"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjects = getProjects;
exports.getProjectBySlug = getProjectBySlug;
const Project_1 = __importDefault(require("../models/Project"));
async function getProjects(req, res, next) {
    try {
        const category = typeof req.query.category === "string"
            ? req.query.category
            : undefined;
        const featured = req.query.featured;
        const search = typeof req.query.search === "string"
            ? req.query.search.trim()
            : "";
        const filter = {
            status: "published",
        };
        if (category &&
            category !== "All Projects") {
            filter.category = category;
        }
        if (featured === "true") {
            filter.featured = true;
        }
        if (search) {
            const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            filter.$or = [
                { title: { $regex: escaped, $options: "i" } },
                { description: { $regex: escaped, $options: "i" } },
                { tags: { $regex: escaped, $options: "i" } },
            ];
        }
        const projects = await Project_1.default.find(filter)
            .select("title slug category categoryLabel description image tags visual number href liveUrl featured sortOrder")
            .sort({ sortOrder: 1, createdAt: -1 })
            .lean();
        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects,
        });
    }
    catch (error) {
        next(error);
    }
}
async function getProjectBySlug(req, res, next) {
    try {
        const project = await Project_1.default.findOne({
            slug: req.params.slug,
            status: "published",
        })
            .select("-__v")
            .lean();
        if (!project) {
            res.status(404).json({
                success: false,
                message: "Project not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: project,
        });
    }
    catch (error) {
        next(error);
    }
}
