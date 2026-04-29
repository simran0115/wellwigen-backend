import Provider from "./provider.model.js";

// Step 1: Initialize/Update Provider Progress
export const saveProgress = async (req, res, next) => {
  try {
    const { phone, providerId, ...progressData } = req.body;

    let provider = null;

    // 1. Try finding by ID
    if (providerId) {
      provider = await Provider.findById(providerId);
    }
    if (!provider && phone && phone.trim() !== "") {
      provider = await Provider.findOne({ phone });
    }

    if (provider) {
      // Update existing
      Object.assign(provider, progressData);
      if (phone) provider.phone = phone;
      await provider.save();
    } else {
      // Create new draft
      const newProviderData = {
        ...progressData,
        verificationStatus: "pending",
        isVerified: false,
      };
      if (phone && phone.trim() !== "") newProviderData.phone = phone;

      provider = new Provider(newProviderData);
      await provider.save();
    }

    res.status(200).json({
      success: true,
      message: "Progress saved",
      data: provider,
    });
  } catch (err) {
    console.error("Save Progress Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Original registration (can be used for final submission)
export const registerProvider = async (req, res, next) => {
  try {
    const { phone, ...finalData } = req.body;

    let provider = await Provider.findOne({ phone });

    if (!provider) {
      provider = new Provider({ phone, ...finalData });
    } else {
      Object.assign(provider, finalData);
    }

    provider.verificationStatus = "under_review";
    await provider.save();

    res.status(201).json({
      success: true,
      message: "Application submitted for review",
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

export const getMyProfile = async (req, res, next) => {
  try {
    const { providerId } = req.params;
    const provider = await Provider.findById(providerId);
    if (!provider) return res.status(404).json({ success: false, message: "Provider not found" });

    res.status(200).json({ success: true, data: provider });
  } catch (err) {
    next(err);
  }
};

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

// ================= ADMIN ACTIONS =================

// Get all pending provider applications
export const getPendingProviders = async (req, res, next) => {
  try {
    const providers = await Provider.find({ verificationStatus: "pending" }).sort("-createdAt");
    res.status(200).json({ success: true, data: providers });
  } catch (err) {
    next(err);
  }
};

// Verify/Approve a provider
export const verifyProvider = async (req, res, next) => {
  try {
    const { providerId } = req.params;
    const { status } = req.body; // 'approved' or 'rejected'

    const provider = await Provider.findById(providerId);
    if (!provider) return res.status(404).json({ success: false, message: "Provider not found" });

    provider.verificationStatus = status;
    provider.isVerified = status === 'approved';
    provider.isActive = status === 'approved';

    await provider.save();

    res.status(200).json({
      success: true,
      message: `Provider ${status} successfully`,
      data: provider
    });
  } catch (err) {
    next(err);
  }
};
