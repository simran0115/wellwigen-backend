import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  fruitName: String,
  quantity: Number
});

export default mongoose.model("Stock", stockSchema);