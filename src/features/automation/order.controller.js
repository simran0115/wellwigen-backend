import Order from "./order.model.js";

// Fetch all orders for a specific user
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ scheduledFor: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching user orders", error: error.message });
  }
};

// Fetch all orders for a specific vendor
export const getVendorOrders = async (req, res) => {
  try {
    const { vendorId } = req.params;
    // Note: Assuming the vendor is linked via productId or a direct vendorId on the order. 
    // In our order model, we have providerId. We will use providerId as vendorId.
    const orders = await Order.find({ providerId: vendorId }).sort({ scheduledFor: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching vendor orders", error: error.message });
  }
};
