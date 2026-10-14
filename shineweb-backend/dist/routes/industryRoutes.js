"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const industryController_1 = require("../controllers/industryController");
// Import your existing admin authentication middleware.
// Example: import { protect, adminOnly } from "../middleware/authMiddleware";
const router = (0, express_1.Router)();
// Public read endpoint
router.get("/", industryController_1.getIndustries);
// Protect all write operations with your actual admin middleware.
router.post("/", /* protect, adminOnly, */ industryController_1.createIndustry);
router.get("/:id", industryController_1.getIndustryById);
router.put("/:id", /* protect, adminOnly, */ industryController_1.updateIndustry);
router.delete("/:id", /* protect, adminOnly, */ industryController_1.deleteIndustry);
exports.default = router;
