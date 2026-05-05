import Product from "./product.model.js";

// ➕ Add Product
export const addProduct = async (req, res) => {
  try {
    const { name, price, quantity, category, benefits, healthGoal } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Edge Case: Validate input
    if (price < 0 || quantity < 0) {
      return res.status(400).json({ message: "Price and quantity cannot be negative" });
    }

    if (!category) {
      return res.status(400).json({ message: "Please select a category" });
    }

    const productData = {
      name,
      price,
      quantity,
      category,
      benefits: benefits || "",
      healthGoal: healthGoal || "Immunity Boost",
      providerId: req.vendor.id,
      status: "approved",
      images: imageUrl ? [imageUrl] : []
    };

    const product = await Product.create(productData);

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Error in addProduct:", error);
    res.status(500).json({ 
      message: "Server error during product creation",
      error: error.message 
    });
  }
};

// 📥 Get Vendor Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      providerId: req.vendor.id,
    }).populate("category", "name");

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ❌ Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🔐 Check ownership
    if (product.providerId.toString() !== req.vendor.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};