const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  userId: String,
  planType: String, // twice-weekly
  deliveryDays: [String], // ["Monday", "Saturday"]
  startDate: Date,
  status: { type: String, default: "active" }
});

module.exports = mongoose.model("Subscription", subscriptionSchema);