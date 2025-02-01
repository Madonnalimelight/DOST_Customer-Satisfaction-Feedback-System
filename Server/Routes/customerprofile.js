const express = require("express");
const router = express.Router();
const {
  getCustomerProfiles,
  getCustomerProfile,
  createCustomerProfile,
  deleteCustomerProfile,
  updateCustomerProfile,
} = require("../Controllers/CustomerProfileController");

// POST a new customer profile
router.post("/", createCustomerProfile);
// Other routes...
router.get("/", getCustomerProfiles);
router.get("/:id", getCustomerProfile);
router.delete("/:id", deleteCustomerProfile);
router.patch("/:id", updateCustomerProfile);

module.exports = router;
