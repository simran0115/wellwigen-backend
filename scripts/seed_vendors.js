import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Vendor from '../src/features/vendor/vendor.model.js';

dotenv.config();

const MONGODB_URI = process.env.MONGO_URL || "mongodb://localhost:27017/wellwigen";

const seedVendors = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing test vendors
    await Vendor.deleteMany({ email: { $regex: /@test.com$/ } });
    console.log("Cleared existing test accounts.");

    const password = "password123";
    const hashedPassword = await bcrypt.hash(password, 10);

    const testVendors = [
      {
        name: "Dr. Smith",
        email: "doctor@test.com",
        password: hashedPassword,
        storeName: "Smith Clinic",
        storeAddress: "123 Medical Center",
        phone: "9876543210",
        status: "approved",
        type: "DOCTOR"
      },
      {
        name: "Wellness Shop",
        email: "vendor@test.com",
        password: hashedPassword,
        storeName: "Healthy Living Store",
        storeAddress: "456 Market St",
        phone: "9876543211",
        status: "approved",
        type: "VENDOR"
      },
      {
        name: "Metro Labs",
        email: "lab@test.com",
        password: hashedPassword,
        storeName: "Metro Diagnostics",
        storeAddress: "789 Science Hub",
        phone: "9876543212",
        status: "approved",
        type: "LAB"
      },
      {
        name: "Quick Pharmacy",
        email: "pharmacy@test.com",
        password: hashedPassword,
        storeName: "Quick Pharma",
        storeAddress: "321 Health Ave",
        phone: "9876543213",
        status: "approved",
        type: "PHARMACY"
      },
      {
        name: "Green Nutrition",
        email: "nutrition@test.com",
        password: hashedPassword,
        storeName: "Green Life Foods",
        storeAddress: "654 Nature Road",
        phone: "9876543214",
        status: "approved",
        type: "NUTRITION"
      }
    ];

    await Vendor.insertMany(testVendors);
    console.log("✅ Seeded 5 test providers successfully!");
    
    console.log("\n--- TEST ACCOUNTS ---");
    testVendors.forEach(v => {
      console.log(`Role: ${v.type} | Email: ${v.email} | Pass: ${password}`);
    });

    process.exit();
  } catch (err) {
    console.error("Seeding Error:", err);
    process.exit(1);
  }
};

seedVendors();
