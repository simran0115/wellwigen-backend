import express from "express";
import Delivery from "./delivery.model.js";

const router = express.Router();

// ✅ TEST ROUTE
router.get("/test", (req, res) => {
  res.send("Delivery route working ✅");
});

// ✅ ADD DELIVERY (Admin assigns to vendor)
router.post("/add", async (req, res) => {
  try {
    const { vendorId, customerName, product, deliveryDate } = req.body;

    const delivery = await Delivery.create({
      vendor: vendorId,
      customerName,
      product,
      deliveryDate,
    });

    res.json(delivery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET ALL DELIVERIES (for testing)
router.get("/all", async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET DELIVERIES BY VENDOR
router.get("/vendor/:vendorId", async (req, res) => {
  try {
    const deliveries = await Delivery.find({
      vendor: req.params.vendorId,
    });

    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;