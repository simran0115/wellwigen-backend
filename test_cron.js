import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";
import { 
  runDailyOrderCreation, 
  runAutoUpdateOrderStatus, 
  runSubscriptionExpiryCheck 
} from "./cron/subscriptionCron.js";

dotenv.config();

// Ensure DNS works for MongoDB SRV records (matching server.js)
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const testCrons = async () => {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URL, { dbName: "wellwigen" });
    console.log("✅ MongoDB Connected.\n");

    console.log("=========================================");
    console.log("▶️ 1. Testing Daily Order Creation");
    console.log("=========================================");
    await runDailyOrderCreation();

    console.log("\n=========================================");
    console.log("▶️ 2. Testing Order Auto Update (Pending -> Delivered)");
    console.log("=========================================");
    await runAutoUpdateOrderStatus();

    console.log("\n=========================================");
    console.log("▶️ 3. Testing Subscription Expiry Check");
    console.log("=========================================");
    await runSubscriptionExpiryCheck();

  } catch (error) {
    console.error("❌ Test failed:", error);
  } finally {
    console.log("\n🛑 Disconnecting from DB...");
    await mongoose.disconnect();
    console.log("✅ Test Complete. Exiting.");
    process.exit(0);
  }
};

testCrons();
