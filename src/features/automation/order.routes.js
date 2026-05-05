import express from "express";
import { getUserOrders, getVendorOrders } from "./order.controller.js";

const router = express.Router();

// Fetch orders for a specific user
router.get("/user/:userId", getUserOrders);

// Fetch orders for a specific vendor
router.get("/vendor/:vendorId", getVendorOrders);

export default router;
