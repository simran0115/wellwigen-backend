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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  subcategory: String,
  benefits: {
    type: String,
    default: ""
  },
  healthGoal: {
    type: String,
    enum: ["Weight Loss", "Muscle Gain", "Immunity Boost", "Heart Health", "Brain Health", "Digestion", "Diabetes Control"],
    default: "Immunity Boost"
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