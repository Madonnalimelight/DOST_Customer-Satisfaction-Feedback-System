const mongoose = require("mongoose");
const servicesSchema = new mongoose.Schema({
  customerProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CustomerProfile',
    required: true
  },
  serviceName: {
    type: String,
    enum: [
      "Technology Needs Assessment",
      "Technology Transfer & Commercialization",
      "Technology Consultancy",
      "Project Proposal Preparation",
      "Packaging and Labeling",
      "Technology Training",
      "Technology Clinics/Forum",
      "Scholarship",
      "Laboratory (Metrology/Microbiology)",
      "Library/Information",
      "Others",
    ],
    required: true,
  },
  otherService: {
    type: String,
    required: function () {
      return this.serviceName === "Others";
    },
    default: null,
  },
  subService: {
    type: String,
    required: function () {
      return (
        this.serviceName === "Technology Consultancy" ||
        this.serviceName === "Technology Transfer & Commercialization"
      );
    },
    validate: {
      validator: function (value) {
        if (!value) return true; // Skip validation if subService is not required

        const validSubServices = {
          "Technology Transfer & Commercialization": [
            "Food Processing",
            "Gifts, Housewares, Decors",
            "Agriculture/Horticulture",
            "Aquaculture/Marine",
            "Furniture",
            "Metals & Engineering",
            "Health and Pharma.",
            "ICT",
            "Others",
          ],
          "Technology Consultancy": [
            "MPEX",
            "CAPE",
            "CPT",
            "Energy Audit",
            "Others",
          ],
        };

        return validSubServices[this.serviceName]?.includes(value);
      },
      message: "Invalid subService for the selected serviceName.",
    },
    default: null,
  },
  otherSubService: {
    type: String,
    required: function () {
      return this.subService === "Others";
    },
    default: null,
  },
  howDidYouKnow: {
    type: String,
    required: true,
  },
  dateOfVisit: {
    type: Date,
    required: true,
  },
  attendingStaff: {
    type: String,
    required: true,
  },
});

// Add an index to improve query performance
servicesSchema.index({ customerProfile: 1, dateOfVisit: -1 });

// Create a model from the schema
const Service = mongoose.model("Service", servicesSchema);

// Export the model
module.exports = Service;
