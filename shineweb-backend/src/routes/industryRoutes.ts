
import { Router } from "express";
import {
  createIndustry,
  getIndustries,
  getIndustryById,
  updateIndustry,
  deleteIndustry,
} from "../controllers/industryController";

// Import your existing admin authentication middleware.
// Example: import { protect, adminOnly } from "../middleware/authMiddleware";

const router = Router();

// Public read endpoint
router.get("/", getIndustries);

// Protect all write operations with your actual admin middleware.
router.post("/", /* protect, adminOnly, */ createIndustry);
router.get("/:id", getIndustryById);
router.put("/:id", /* protect, adminOnly, */ updateIndustry);
router.delete("/:id", /* protect, adminOnly, */ deleteIndustry);

export default router;
