
import { Router } from "express";
import {
  getPublicPartners,
  getAdminPartners,
  createPartner,
  updatePartner,
  deletePartner,
} from "../controllers/partnerController";
import { requireAuth, requireAdmin } from "../middleware/auth";

const router = Router();

// Public read
router.get("/", getPublicPartners);

// All management endpoints require server-side admin authorization.
router.get("/admin", requireAuth, requireAdmin, getAdminPartners);
router.post("/", requireAuth, requireAdmin, createPartner);
router.patch("/:id", requireAuth, requireAdmin, updatePartner);
router.delete("/:id", requireAuth, requireAdmin, deletePartner);

export default router;
