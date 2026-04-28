import Provider from "./provider.model.js";

// Step 1 of Onboarding: Register Business Details
export const registerProvider = async (req, res, next) => {
  try {
    const { type, businessName, ownerName, phone, address, bankDetails, licenseNumber } = req.body;

    const existingProvider = await Provider.findOne({ phone });
    if (existingProvider) {
      return res.status(400).json({ success: false, message: "Phone number already registered" });
    }

    const provider = new Provider({
      type,
      businessName,
      ownerName,
      phone,
      address,
      bankDetails,
      licenseNumber,
      verificationStatus: "pending",
      isVerified: false,
      isActive: false,
    });

    await provider.save();

    res.status(201).json({
      success: true,
      message: "Provider registered successfully",
      data: provider,
    });
  } catch (err) {
    next(err);
  }
};

// Upload documents (Mocked S3 upload logic)
export const uploadDocuments = async (req, res, next) => {
  try {
    const { providerId, documents } = req.body; // In real app, use req.files + S3
    
    const provider = await Provider.findById(providerId);
    if (!provider) return res.status(404).json({ success: false, message: "Provider not found" });

    provider.documents = [...provider.documents, ...documents];
    provider.verificationStatus = "under_review";
    
    await provider.save();

    res.status(200).json({
      success: true,
      message: "Documents uploaded, application is under review",
      data: provider,
    });
  } catch (err) {
    next(err);
  }
};

// Get Provider Profile (for Dashboard)
export const getMyProfile = async (req, res, next) => {
  try {
    const { providerId } = req.params; // In production, get from JWT (req.user)
    
    const provider = await Provider.findById(providerId);
    if (!provider) return res.status(404).json({ success: false, message: "Provider not found" });

    res.status(200).json({ success: true, data: provider });
  } catch (err) {
    next(err);
  }
};

// Update Operating Hours or Availability
export const updateAvailability = async (req, res, next) => {
  try {
    const { providerId } = req.params;
    const { isActive, operatingHours, capacityLimit } = req.body;

    const provider = await Provider.findByIdAndUpdate(
      providerId,
      { $set: { isActive, operatingHours, capacityLimit } },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Availability updated", data: provider });
  } catch (err) {
    next(err);
  }
};
