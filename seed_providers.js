import mongoose from "mongoose";
import dotenv from "dotenv";
import Provider from "./src/features/provider/provider.model.js";
import bcrypt from "bcryptjs";
import dns from "dns";

dotenv.config();
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const providersToSeed = [
  { type: "DOCTOR", email: "doctor@test.com", passwordHash: "password123", businessName: "Test Clinic", ownerName: "Dr. Smith", phone: "1111111111", verificationStatus: "approved" },
  { type: "VENDOR", email: "vendor@test.com", passwordHash: "password123", businessName: "Test Retail", ownerName: "Vendor Bob", phone: "2222222222", verificationStatus: "approved" },
  { type: "LAB", email: "lab@test.com", passwordHash: "password123", businessName: "Test Lab", ownerName: "Lab Tech", phone: "3333333333", verificationStatus: "approved" },
  { type: "PHARMACY", email: "pharmacy@test.com", passwordHash: "password123", businessName: "Test Pharmacy", ownerName: "Pharm Joe", phone: "4444444444", verificationStatus: "approved" },
  { type: "NUTRITION", email: "nutrition@test.com", passwordHash: "password123", businessName: "Test Nutrition", ownerName: "Nutri Jane", phone: "5555555555", verificationStatus: "approved" }
];

async function seedProviders() {
  try {
    await mongoose.connect(process.env.MONGO_URL, { dbName: "wellwigen" });
    console.log("✅ MongoDB Connected");

    for (let p of providersToSeed) {
      const existing = await Provider.findOne({ email: p.email });
      if (!existing) {
        // We will store plain text 'password123' since our login logic handles it as a fallback
        // Or hash it properly, but fallback is already tested. Let's hash it properly.
        const hash = await bcrypt.hash(p.passwordHash, 10);
        await Provider.create({ ...p, passwordHash: hash });
        console.log(`✅ Created ${p.type} (${p.email})`);
      } else {
        console.log(`⚠️ ${p.type} (${p.email}) already exists.`);
      }
    }

    console.log("🎉 Seeding complete.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding:", err);
    process.exit(1);
  }
}

seedProviders();
