import Vendor from "./vendor.model.js";
import Delivery from "../delivery/delivery.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerVendor = async (req, res) => {
  try {
    let { name, email, password, storeName, storeAddress, phone } = req.body;

    if (!name || !email || !password || !storeName || !storeAddress || !phone) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    email = email.trim().toLowerCase();

    const existing = await Vendor.findOne({ email });
    if (existing) {
      return res.status(400).json({
        message: "Vendor already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const vendor = await Vendor.create({
      name,
      email,
      password: hashedPassword,
      storeName,
      storeAddress,
      phone,
      status: "pending",
    });

    res.status(201).json({
      message: "Application submitted. Wait for admin approval.",
      vendorId: vendor._id,
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const loginVendor = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    email = email.trim().toLowerCase();
    const vendor = await Vendor.findOne({ email });

    if (!vendor) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (vendor.status === "pending") {
      return res.status(403).json({ message: "Your store is pending admin approval." });
    }

    if (vendor.status === "rejected") {
      return res.status(403).json({ message: "Your vendor application was rejected." });
    }

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: vendor._id, role: vendor.role },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      vendor: {
        id: vendor._id,
        name: vendor.name,
        email: vendor.email,
        storeName: vendor.storeName,
        status: vendor.status,
        type: vendor.type,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const adminAddVendor = async (req, res) => {
  try {
    let { name, email, password, storeName, storeAddress, phone } = req.body;

    if (!name || !email || !password || !storeName || !storeAddress || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    email = email.trim().toLowerCase();

    const existing = await Vendor.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Vendor already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const vendor = await Vendor.create({
      name,
      email,
      password: hashedPassword,
      storeName,
      storeAddress,
      phone,
      status: "approved",
    });

    res.status(201).json({
      message: "Vendor created and approved successfully",
      vendor,
    });
  } catch (err) {
    console.error("Admin Add Vendor Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const approveVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;

    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    vendor.status = "approved";
    await vendor.save();

    const io = req.app.get("io");
    const users = req.app.get("users");

    const socketId = users[vendorId];

    if (socketId) {
      io.to(socketId).emit("vendorApproved", {
        message: "🎉 Your account has been approved!",
      });
    }

    res.json({ message: "Vendor approved successfully" });
  } catch (err) {
    console.error("Approve Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getVendorDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find().sort({ deliveryDate: 1 });
    res.json({
      message: "Deliveries fetched successfully",
      deliveries,
    });
  } catch (err) {
    console.error("Fetch deliveries error:", err);
    res.status(500).json({ message: "Server error" });
  }
};