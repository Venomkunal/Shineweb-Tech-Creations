"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const partnerController_1 = require("../controllers/partnerController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Public read
router.get("/", partnerController_1.getPublicPartners);
// All management endpoints require server-side admin authorization.
router.get("/admin", auth_1.requireAuth, auth_1.requireAdmin, partnerController_1.getAdminPartners);
router.post("/", auth_1.requireAuth, auth_1.requireAdmin, partnerController_1.createPartner);
router.patch("/:id", auth_1.requireAuth, auth_1.requireAdmin, partnerController_1.updatePartner);
router.delete("/:id", auth_1.requireAuth, auth_1.requireAdmin, partnerController_1.deletePartner);
exports.default = router;
