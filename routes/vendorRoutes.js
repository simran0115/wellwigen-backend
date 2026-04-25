const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const Vendor = require("../models/Vendor");

const {
  registerVendor,
  loginVendor,
  adminAddVendor,
  getVendorDeliveries
} = require("../controllers/vendorController");

// 🔹 Public Routes
router.post("/register", registerVendor);
router.post("/login", loginVendor);

// 🔐 Vendor Profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.vendor.id).select("-password");

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found"
      });
    }

    res.json({
      message: "Vendor profile fetched successfully",
      vendor
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
});

// 🚚 Vendor Deliveries
router.get("/deliveries", authMiddleware, getVendorDeliveries);


// ================= ADMIN ROUTES =================

// 🔹 Admin directly add approved vendor
router.post("/admin/add", adminAddVendor);

// 🔹 Get all vendors (for admin panel)
router.get("/all", async (req, res) => {
  try {
    const vendors = await Vendor.find().select("-password");

    res.json({
      vendors
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error"
    });
  }
});


// 🔹 Approve / Reject vendor
router.put("/approve/:id", async (req, res) => {
  try {
    const { status } = req.body; // approved / rejected

    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found"
      });
    }

    vendor.status = status;
    await vendor.save();

    res.json({
      message: `Vendor ${status} successfully`
    });

  } catch (err) {
    console.error("Approve error:", err);
    res.status(500).json({
      message: err.message || "Server error"
    });
  }
});

module.exports = router;