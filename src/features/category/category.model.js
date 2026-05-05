import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  icon: {
    type: String, // Icon name or URL
    default: "Apple"
  },
  description: String
}, { timestamps: true });

export default mongoose.model("Category", categorySchema);
