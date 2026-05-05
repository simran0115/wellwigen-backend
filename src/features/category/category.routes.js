import express from "express";
import { getCategories, createCategory, updateCategory, deleteCategory } from "./category.controller.js";
import authMiddleware from "../../core/middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", authMiddleware, createCategory); // Add Admin check in production
router.put("/:id", authMiddleware, updateCategory);
router.delete("/:id", authMiddleware, deleteCategory);

export default router;
