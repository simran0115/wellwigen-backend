import express from "express";
import {
  createSubscription,
  verifyPayment,
  getMySubscription,
  cancelSubscription,
  pauseSubscription
} from "./subscription.controller.js";

const router = express.Router();

// Define routes
router.post("/create", createSubscription);
router.post("/verify", verifyPayment);
router.get("/me/:userId", getMySubscription);
router.post("/cancel/:subscriptionId", cancelSubscription);
router.post("/pause/:subscriptionId", pauseSubscription);

export default router;
