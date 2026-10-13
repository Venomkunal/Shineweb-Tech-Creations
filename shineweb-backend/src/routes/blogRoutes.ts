
import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getPublishedBlogBySlug,
  getPublishedBlogs,
  updateBlog,
} from "../controllers/blogController";
import { requireAdmin } from "../middleware/adminAuth";

const router = Router();

// Public endpoints
router.get("/", getPublishedBlogs);
router.get("/:slug", getPublishedBlogBySlug);

// Admin endpoints — authenticate and authorize first
router.get("/admin/all",  getAllBlogs);
router.post("/", createBlog);
router.patch("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
