import { Router } from "express";
import {
  getActiveOffers,
  getAllOffers,
  createOffer,
  updateOffer,
  deleteOffer,
} from "../controllers/offerController";
import { requireAdmin } from "../middleware/adminAuth";

const router = Router();

// Public homepage API.
router.get("/", getActiveOffers);

// Administrator CRUD API.
router.get("/admin", requireAdmin, getAllOffers);
router.post("/", createOffer);
router.put("/:id", requireAdmin, updateOffer);
router.delete("/:id", requireAdmin, deleteOffer);

export default router;