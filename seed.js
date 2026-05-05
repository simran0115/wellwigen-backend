import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./src/features/category/category.model.js";
import Product from "./src/features/product/product.model.js";

dotenv.config();

const categoriesData = [
  { name: "🍎 Fresh Healthy Fruits", icon: "Apple", description: "Natural fruits for daily nutrition" },
  { name: "🥜 Dry Fruits (Nuts & Dried Fruits)", icon: "Nut", description: "Powerhouse of energy and brain health" },
  { name: "🍓 Berry Fruits", icon: "Strawberry", description: "Antioxidant-rich berries" },
  { name: "🍇 Other Nutritious Fruits", icon: "Grape", description: "Specialized healthy fruits" }
];

const productsData = [
  // Fruits
  { name: "Apple", categoryName: "🍎 Fresh Healthy Fruits", benefits: "Good for digestion and heart health", healthGoal: "Heart Health", price: 120, quantity: 50 },
  { name: "Banana", categoryName: "🍎 Fresh Healthy Fruits", benefits: "Gives energy and supports muscles", healthGoal: "Muscle Gain", price: 60, quantity: 100 },
  { name: "Orange", categoryName: "🍎 Fresh Healthy Fruits", benefits: "Boosts immunity (vitamin C)", healthGoal: "Immunity Boost", price: 80, quantity: 70 },
  { name: "Papaya", categoryName: "🍎 Fresh Healthy Fruits", benefits: "Helps digestion", healthGoal: "Digestion", price: 50, quantity: 40 },
  // Dry Fruits
  { name: "Almonds (Badam)", categoryName: "🥜 Dry Fruits (Nuts & Dried Fruits)", benefits: "Improve brain function and heart health", healthGoal: "Brain Health", price: 800, quantity: 20 },
  { name: "Walnuts (Akhrot)", categoryName: "🥜 Dry Fruits (Nuts & Dried Fruits)", benefits: "Rich in omega-3; good for brain", healthGoal: "Brain Health", price: 1200, quantity: 15 },
  { name: "Dates (Khajoor)", categoryName: "🥜 Dry Fruits (Nuts & Dried Fruits)", benefits: "Natural sugar; instant energy", healthGoal: "Muscle Gain", price: 450, quantity: 30 },
  // Berries
  { name: "Strawberry", categoryName: "🍓 Berry Fruits", benefits: "High in antioxidants; good for skin and heart", healthGoal: "Heart Health", price: 250, quantity: 25 },
  { name: "Blueberry", categoryName: "🍓 Berry Fruits", benefits: "Excellent for brain health; very high in antioxidants", healthGoal: "Brain Health", price: 600, quantity: 10 }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { dbName: "wellwigen" });
    console.log("Connected to DB...");

    // Clear existing
    await Category.deleteMany({});
    await Product.deleteMany({ providerId: { $exists: false } }); // Only delete seeded ones or keep simple

    const createdCategories = await Category.insertMany(categoriesData);
    console.log("Categories seeded!");

    // Map products to category IDs
    const finalProducts = productsData.map(p => {
      const cat = createdCategories.find(c => c.name === p.categoryName);
      return {
        ...p,
        category: cat._id,
        // We need a dummy providerId for now or allow null in model
        providerId: "661234567890abcdef123456" // Dummy ID
      };
    });

    await Product.insertMany(finalProducts);
    console.log("Products seeded!");

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
};

seedDB();
