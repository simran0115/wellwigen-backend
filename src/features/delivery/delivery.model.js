import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  subscriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription"
  },
  deliveryDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    default: "upcoming"
  }
}, { timestamps: true });

export default mongoose.model("Delivery", deliverySchema);