import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const fixIndex = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { dbName: "wellwigen" });
    console.log("Connected to MongoDB");
    
    const db = mongoose.connection.db;
    const collection = db.collection('providers');
    
    console.log("Dropping phone_1 index...");
    try {
      await collection.dropIndex('phone_1');
      console.log("Index dropped");
    } catch (e) {
      console.log("Index not found or already dropped");
    }
    
    console.log("Creating sparse unique index on phone...");
    await collection.createIndex({ phone: 1 }, { unique: true, sparse: true });
    console.log("Sparse index created successfully");
    
    process.exit(0);
  } catch (err) {
    console.error("Error fixing index:", err);
    process.exit(1);
  }
};

fixIndex();
