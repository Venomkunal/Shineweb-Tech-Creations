
import { Router } from "express";
import {
  getPublishedBlogs,
  getPublishedBlogBySlug,
  getFeaturedBlog,
  getBlogCategories,
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController";

// import { authenticate } from "../middleware/authenticate";
// import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

// Public routes — keep specific paths before /:slug.
router.get("/featured", getFeaturedBlog);
router.get("/categories", getBlogCategories);
router.get("/", getPublishedBlogs);
router.get("/:slug", getPublishedBlogBySlug);

// Admin routes.
router.get(
  "/admin/all",
  // authenticate,
  // requireAdmin,
  getAllBlogs
);

router.post(
  "/",
  // authenticate,
  // requireAdmin,
  createBlog
);

router.patch(
  "/:id",
  // authenticate,
  // requireAdmin,
  updateBlog
);

router.delete(
  "/:id",
  // authenticate,
  // requireAdmin,
  deleteBlog
);

export default router;
