console.log("🔥 THIS IS MY SERVER FILE RUNNING");

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dns from "dns";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { startAutomationEngine } from "./src/core/jobs/orderEngine.js";

// New Feature Routes
import subscriptionRoutes from "./src/features/subscription/subscription.routes.js";
import providerRoutes from "./src/features/provider/provider.routes.js";
import vendorRoutes from "./src/features/vendor/vendor.routes.js";
import productRoutes from "./src/features/product/product.routes.js";
import deliveryRoutes from "./src/features/delivery/delivery.routes.js";

dotenv.config();

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

const allowedOrigins = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(',') 
  : ["http://localhost:5173", "https://wellwigenportfolio-3e9d.vercel.app"];

app.use(cors({
  origin: "https://wellwigenportfolio-3e9d.vercel.app",
  credentials: true
}));

app.use(express.json());

// ================= SOCKET SETUP =================
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true
  },
});

let users = {};

app.set("io", io);
app.set("users", users);

io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  socket.on("registerUser", (userId) => {
    users[userId] = socket.id;
    console.log("✅ User mapped:", userId, socket.id);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    for (let id in users) {
      if (users[id] === socket.id) {
        delete users[id];
        break;
      }
    }
  });
});
// =================================================

// Legacy routes mapped (Requires .js extensions if they are CommonJS converted to ESM, but we'll assume they will be updated by the user if needed)
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/vendor", vendorRoutes);

// New Feature Routes
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/provider", providerRoutes);

app.post("/test", (req, res) => {
  console.log("✅ TEST ROUTE HIT");
  res.send("Test OK");
});

app.get("/", (req, res) => {
  res.send("WellWigen Backend Running 🚀");
});

mongoose
  .connect(process.env.MONGO_URL, { dbName: "wellwigen" })
  .then(() => {
    console.log("✅ MongoDB Connected");
    // Start Cron Jobs & BullMQ
    startAutomationEngine();
  })
  .catch((err) => console.log("❌ MongoDB Error:", err));

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});