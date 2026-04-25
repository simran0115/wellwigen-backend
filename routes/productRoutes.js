const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addProduct,
  getProducts,
  deleteProduct
} = require("../controllers/productController");

// 🔐 All routes protected
router.post("/add", authMiddleware, addProduct);
router.get("/", authMiddleware, getProducts);
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;