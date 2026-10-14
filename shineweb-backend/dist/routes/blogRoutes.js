"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogController_1 = require("../controllers/blogController");
const router = (0, express_1.Router)();
// Public endpoints
router.get("/", blogController_1.getPublishedBlogs);
router.get("/:slug", blogController_1.getPublishedBlogBySlug);
// Admin endpoints — authenticate and authorize first
router.get("/admin/all", blogController_1.getAllBlogs);
router.post("/", blogController_1.createBlog);
router.patch("/:id", blogController_1.updateBlog);
router.delete("/:id", blogController_1.deleteBlog);
exports.default = router;
