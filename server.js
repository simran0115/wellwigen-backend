console.log("🔥 THIS IS MY SERVER FILE RUNNING");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();
const cors = require("cors");

app.use(cors({
  origin: "https://wellwigenportfolio-3e9d.vercel.app/",
  credentials: true
}));

app.use(cors());
app.use(express.json());

// ================= SOCKET SETUP =================
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// ✅ store users (userId -> socketId)
let users = {};

// ✅ make accessible in controllers
app.set("io", io);
app.set("users", users);

io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  // ✅ FIXED: correct event name
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

// routes
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const productRoutes = require("./routes/productRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");

app.use("/api/deliveries", deliveryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/vendor", vendorRoutes);

// test routes
app.post("/test", (req, res) => {
  console.log("✅ TEST ROUTE HIT");
  res.send("Test OK");
});

app.get("/", (req, res) => {
  res.send("WellWigen Backend Running 🚀");
});

// MongoDB
mongoose
  .connect(process.env.MONGO_URL, { dbName: "wellwigen" })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});