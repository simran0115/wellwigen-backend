import express from "express";
import authMiddleware from "../../core/middleware/authMiddleware.js";
import {
  addProduct,
  getProducts,
  deleteProduct,
} from "./product.controller.js";

import upload from "../../core/middleware/uploadMiddleware.js";

const router = express.Router();

// 🔐 All routes protected
router.post("/add", authMiddleware, upload.single("image"), addProduct);
router.get("/", authMiddleware, getProducts);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;