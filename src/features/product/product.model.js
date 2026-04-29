import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Provider",
    required: true
  },
  category: {
    type: String,
    enum: ["Medicine", "Checkup", "Equipment", "Produce", "Supplement"],
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "discontinued"],
    default: "pending"
  },
  rejectionReason: String,
  images: [String]
}, { timestamps: true });

export default mongoose.model("Product", productSchema);