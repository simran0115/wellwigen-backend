import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    // ✅ Store Details
    storeName: { type: String, required: true },
    storeAddress: { type: String, required: true },
    phone: { type: String, required: true },

    // ✅ Approval System (MOST IMPORTANT)
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    role: { type: String, default: "vendor" },
  },
  { timestamps: true }
);

export default mongoose.model("Vendor", vendorSchema);