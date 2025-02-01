const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerProfileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    classification: {
      type: String,
      enum: [
        "Student",
        "Owner of a business",
        "Employee of a business",
        "Government employee",
        "Professional",
        "Overseas Filipino Worker",
        "Not employed (retiree/displaced)",
        "Others",
      ],
      required: true,
    },
    specificProfessional: {
      type: String,
      required: function () {
        return this.classification === "Professional";
      },
      default: null,
    },
    otherClassification: {
      type: String,
      required: function () {
        return this.classification === "Others";
      },
      default: null,
    },
    firstVisit: { type: Boolean, default: true },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    age: {
      type: String,
      enum: [
        "15 & below",
        "16-20",
        "21-30",
        "31-40",
        "41-50",
        "51-59",
        "60 & above",
      ],
      required: true,
    },
    withDisability: { type: Boolean, default: true },
    educationLevel: {
      type: String,
      enum: ["Elementary", "High School", "College", "Masters/PhD.", "Others"],
      required: true,
    },
    otherEducation: {
      type: String,
      required: function () {
        return this.educationLevel === "Others";
      },
      default: null,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
    customerEvaluation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerEvaluation",
    },
    libraryUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LibraryUser",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomerProfile", customerProfileSchema);
