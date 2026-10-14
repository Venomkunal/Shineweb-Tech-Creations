"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const router = (0, express_1.Router)();
// Specific routes must come before /:id.
router.get("/featured", productController_1.getFeaturedProducts);
router.get("/slug/:slug", productController_1.getProductBySlug);
router.get("/", productController_1.getProducts);
router.post("/", productController_1.createProduct);
router.get("/:id", productController_1.getProductById);
router.put("/:id", productController_1.updateProduct);
router.delete("/:id", productController_1.deleteProduct);
exports.default = router;
