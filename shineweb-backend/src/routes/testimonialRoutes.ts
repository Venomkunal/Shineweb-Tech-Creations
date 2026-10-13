
import { Router } from "express";
import {
  getPublicTestimonials,
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialController";
import { requireAuth, requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", getPublicTestimonials);

router.get(
  "/admin",
  requireAuth,
  requireAdmin,
  getAllTestimonials
);

router.post(
  "/",
  requireAuth,
  requireAdmin,
  createTestimonial
);

router.put(
  "/:id",
  requireAuth,
  requireAdmin,
  updateTestimonial
);

router.delete(
  "/:id",
  requireAuth,
  requireAdmin,
  deleteTestimonial
);

export default router;
