"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const offerController_1 = require("../controllers/offerController");
const adminAuth_1 = require("../middleware/adminAuth");
const router = (0, express_1.Router)();
// Public homepage API.
router.get("/", offerController_1.getActiveOffers);
// Administrator CRUD API.
router.get("/admin", adminAuth_1.requireAdmin, offerController_1.getAllOffers);
router.post("/", offerController_1.createOffer);
router.put("/:id", adminAuth_1.requireAdmin, offerController_1.updateOffer);
router.delete("/:id", adminAuth_1.requireAdmin, offerController_1.deleteOffer);
exports.default = router;
