
import { Router } from "express";
import {
  getProducts,
  getFeaturedProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

const router = Router();

// Specific routes must come before /:id.
router.get("/featured", getFeaturedProducts);
router.get("/slug/:slug", getProductBySlug);

router.get("/", getProducts);
router.post("/", createProduct);

router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
