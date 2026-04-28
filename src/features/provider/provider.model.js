import mongoose from "mongoose";

const providerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // If linked to a main User account
    type: {
      type: String,
      enum: ["FRUIT_VEG_SHOP", "DOCTOR", "LAB", "TRAINER", "PHARMACY"],
      required: true,
    },
    businessName: { type: String, required: true },
    ownerName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String },
    passwordHash: { type: String },

    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], index: "2dsphere" }, // [longitude, latitude]
    },
    serviceRadiusKm: { type: Number, default: 10 },

    // Licenses based on provider type
    licenseNumber: String,
    fssaiNo: String,
    nmcNo: String,
    nablNo: String,
    drugLicenseNo: String,

    documents: [
      {
        docType: String,
        fileUrl: String,
        verified: { type: Boolean, default: false },
      },
    ],

    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    verificationStatus: {
      type: String,
      enum: ["pending", "under_review", "approved", "rejected"],
      default: "pending",
    },
    rejectionReason: String,

    // Metrics
    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    acceptanceRate: { type: Number, default: 100 },
    totalOrders: { type: Number, default: 0 },
    capacityLimit: { type: Number, default: 50 },
    currentLoad: { type: Number, default: 0 },

    // Bank Details (Encrypted in a real app)
    bankDetails: {
      accountNo: String,
      ifsc: String,
      accountName: String,
    },

    operatingHours: {
      open: String, // e.g., "09:00"
      close: String, // e.g., "18:00"
      days: [String], // ["Monday", "Tuesday"]
    },
  },
  { timestamps: true }
);

export default mongoose.model("Provider", providerSchema);
