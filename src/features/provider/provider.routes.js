import express from "express";
import {
  registerProvider,
  saveProgress,
  uploadDocuments,
  getMyProfile,
  updateAvailability,
  loginProvider
} from "./provider.controller.js";
import { getPendingProviders, verifyProvider } from "./provider.controller.js";

const router = express.Router();

router.post("/login", loginProvider);
router.post("/register", registerProvider);
router.post("/save-progress", saveProgress);
router.post("/upload-documents", uploadDocuments);
router.get("/me/:providerId", getMyProfile);
router.put("/availability/:providerId", updateAvailability);

// Admin Routes
router.get("/admin/pending", getPendingProviders);
router.put("/admin/verify/:providerId", verifyProvider);

export default router;
