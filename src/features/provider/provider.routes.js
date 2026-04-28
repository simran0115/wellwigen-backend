import express from "express";
import {
  registerProvider,
  uploadDocuments,
  getMyProfile,
  updateAvailability
} from "./provider.controller.js";

const router = express.Router();

router.post("/register", registerProvider);
router.post("/upload-documents", uploadDocuments);
router.get("/me/:providerId", getMyProfile);
router.put("/availability/:providerId", updateAvailability);

export default router;
