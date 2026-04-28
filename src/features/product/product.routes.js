import express from "express";
import authMiddleware from "../../core/middleware/authMiddleware.js";
import {
  addProduct,
  getProducts,
  deleteProduct,
} from "./product.controller.js";

const router = express.Router();

// 🔐 All routes protected
router.post("/add", authMiddleware, addProduct);
router.get("/", authMiddleware, getProducts);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;