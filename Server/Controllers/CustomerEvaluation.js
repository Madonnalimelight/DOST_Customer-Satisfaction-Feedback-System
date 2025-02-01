const mongoose = require("mongoose");
const CustomerEvaluation = require("../Models/CustomerEvaluationModel");

// GET all customer evaluations
const getCustomerEvaluations = async (req, res) => {
  try {
    const customerEvaluations = await CustomerEvaluation.find({}).sort({ createdAt: -1 });
    res.status(200).json(customerEvaluations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET a single customer evaluation
const getCustomerEvaluation = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
};

// POST a new customer evaluation
const createCustomerEvaluation = async (req, res) => {
  try {
    // Log the received data
    console.log('Received data:', req.body);
    
    // Validate the data
    if (!req.body) {
      return res.status(400).json({ error: 'No data provided' });
    }
    
    // Create the evaluation
    const evaluation = await CustomerEvaluation.create(req.body);
    
    res.status(201).json(evaluation);
  } catch (error) {
    console.error('Server error:', error);
    res.status(400).json({ 
      error: error.message,
      details: error.errors // Include validation errors if any
    });
  }
};

// DELETE a customer evaluation
const deleteCustomerEvaluation = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
};

// UPDATE a customer evaluation
const updateCustomerEvaluation = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
};

module.exports = {
  getCustomerEvaluations,
  getCustomerEvaluation,
  createCustomerEvaluation,
  deleteCustomerEvaluation,
  updateCustomerEvaluation,
};
