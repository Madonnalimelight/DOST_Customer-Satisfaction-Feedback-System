const express = require("express");
const router = express.Router();
const {
  getCustomerEvaluations,
  getCustomerEvaluation,
  createCustomerEvaluation,
  deleteCustomerEvaluation,
  updateCustomerEvaluation,
} = require("../Controllers/CustomerEvaluation");

// GET all customer evaluations
router.get("/", getCustomerEvaluations);
// GET a single customer evaluation
router.get("/:id", getCustomerEvaluation);
// POST a new customer evaluation
router.post("/", createCustomerEvaluation);
// DELETE a customer evaluation
router.delete("/:id", deleteCustomerEvaluation);
// UPDATE a customer evaluation
router.patch("/:id", updateCustomerEvaluation);


module.exports = router;

