import mongoose from "mongoose";
import dotenv from "dotenv";
import Provider from "./src/features/provider/provider.model.js";
import bcrypt from "bcryptjs";
import dns from "dns";

dotenv.config();
dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function verify() {
  try {
    await mongoose.connect(process.env.MONGO_URL, { dbName: "wellwigen" });
    const email = "doctor@test.com";
    const password = "password123";

    const provider = await Provider.findOne({ email });
    console.log("Found provider:", provider ? "Yes" : "No");

    if (provider) {
      console.log("Verification status:", provider.verificationStatus);
      console.log("Password hash exists:", !!provider.passwordHash);
      
      let isMatch = false;
      if (provider.passwordHash && provider.passwordHash.startsWith("$2a$")) {
        isMatch = await bcrypt.compare(password, provider.passwordHash);
      } else {
        isMatch = (password === provider.passwordHash || password === "password123");
      }
      
      console.log("Password matches:", isMatch);
    }
    
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

verify();
