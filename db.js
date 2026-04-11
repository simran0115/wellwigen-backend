const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
// sdfds/
module.exports = connectDB;