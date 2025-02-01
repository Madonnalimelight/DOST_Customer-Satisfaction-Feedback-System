const mongoose = require("mongoose");
const CustomerProfile = require("../Models/CustomerProfileModel");

// GET all customer profiles
const getCustomerProfiles = async (req, res) => {
  try {
    const customerProfiles = await CustomerProfile.find({}).sort({
      createdAt: -1,
    });
    res.status(200).json(customerProfiles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET a single customer profile
const getCustomerProfile = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  try {
    const customerProfile = await CustomerProfile.findById(id);
    if (!customerProfile) {
      return res.status(404).json({ error: "No such customer profile" });
    }
    res.status(200).json(customerProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST a new customer profile
const createCustomerProfile = async (req, res) => {
  const {
    name,
    institution,
    address,
    contact,
    classification,
    specificProfessional,
    otherClassification,
    firstVisit,
    gender,
    age,
    withDisability,
    educationLevel,
    otherEducation,
  } = req.body;

  // Add doc to db
  try {
    const customerProfile = await CustomerProfile.create({
      name,
      institution,
      address,
      contact,
      classification,
      specificProfessional,
      otherClassification,
      firstVisit,
      gender,
      age,
      withDisability,
      educationLevel,
      otherEducation,
    });
    
    res.status(201).json(customerProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a customer profile
const deleteCustomerProfile = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const customerProfile = await CustomerProfile.findOneAndDelete({ _id: id });
    if (!customerProfile) {
      return res.status(404).json({ error: "No such customer profile" });
    }
    res.status(200).json(customerProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE a customer profile
const updateCustomerProfile = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const customerProfile = await CustomerProfile.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!customerProfile) {
      return res.status(404).json({ error: "No such customer profile" });
    }

    res.status(200).json(customerProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCustomerProfiles,
  getCustomerProfile,
  createCustomerProfile,
  deleteCustomerProfile,
  updateCustomerProfile,
};
