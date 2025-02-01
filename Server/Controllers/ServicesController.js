const mongoose = require("mongoose");
const Service = require("../Models/service.js");

// GET all services
const getServices = async (req, res) => {
  try {
    const services = await Service.find({}).sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET a single service
const getService = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  try {
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST a new service
const createService = async (req, res) => {
  try {
    console.log('Received service data:', req.body);
    
    // Check for required fields
    if (!req.body.serviceName || !req.body.howDidYouKnow || !req.body.dateOfVisit || !req.body.attendingStaff) {
      return res.status(400).json({ 
        error: 'Missing required fields' 
      });
    }

    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(400).json({ 
      error: error.message,
      details: error.errors 
    });
  }
};

// DELETE a service
const deleteService = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  try {
    const service = await Service.findOneAndDelete({ _id: id });
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE a service
const updateService = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  try {
    const service = await Service.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getServices,
  getService,
  createService,
  deleteService,
  updateService,
};
