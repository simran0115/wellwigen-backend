import Product from "./product.model.js";

// ➕ Add Product
export const addProduct = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;

    const product = await Product.create({
      name,
      price,
      quantity,
      vendorId: req.vendor.id, // 🔐 from JWT
    });

    res.status(201).json({
      message: "Product added",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 📥 Get Vendor Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      vendorId: req.vendor.id,
    });

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
    if (product.vendorId.toString() !== req.vendor.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};