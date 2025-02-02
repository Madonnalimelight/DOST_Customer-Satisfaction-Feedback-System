import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const ServiceForm = () => {
  const location = useLocation();
  const customerProfileId = location.state?.customerProfileId; // Ensure this is correctly set

  const [formData, setFormData] = useState({
    serviceName: "",
    otherService: "",
    subService: "",
    otherSubService: "",
    howDidYouKnow: "",
    dateOfVisit: "",
    attendingStaff: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const serviceNames = [
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
  ];

  const subServices = {
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
    "Technology Consultancy": ["MPEX", "CAPE", "CPT", "Energy Audit", "Others"],
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/services");
        if (Array.isArray(response.data)) {
          // Handle the fetched services if needed
        } else {
          setError("Unexpected response format");
        }
      } catch (err) {
        setError("Failed to fetch services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleChange = (field, value) => {
    setError(null);
    setSuccessMessage("");
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };

      if (field === "serviceName") {
        newData.subService = "";
        newData.otherSubService = "";
        newData.otherService = "";
      }

      if (field === "subService") {
        newData.otherSubService = "";
      }

      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const submitData = {
        customerProfile: customerProfileId, // Ensure this is included
        serviceName: formData.serviceName,
        howDidYouKnow: formData.howDidYouKnow,
        dateOfVisit: formData.dateOfVisit,
        attendingStaff: formData.attendingStaff,
      };

      if (formData.serviceName === "Others") {
        submitData.otherService = formData.otherService;
      }

      if (
        formData.serviceName === "Technology Consultancy" ||
        formData.serviceName === "Technology Transfer & Commercialization"
      ) {
        submitData.subService = formData.subService;

        if (formData.subService === "Others") {
          submitData.otherSubService = formData.otherSubService;
        }
      }

      // Make API call
      const response = await axios.post(
        "http://localhost:3000/api/services",
        submitData
      );

      // Check if the response is successful
      if (response.status === 201) {
        setSuccessMessage("Service request submitted successfully!");

        // Reset form after successful submission
        setFormData({
          serviceName: "",
          otherService: "",
          subService: "",
          otherSubService: "",
          howDidYouKnow: "",
          dateOfVisit: "",
          attendingStaff: "",
        });

        // Navigate to the CustomerProfile after successful submission
        navigate("/Feedback");
      } else {
        setError("Failed to submit the service request.");
      }

    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while submitting the form."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Service Request Form
        </h2>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-600">{successMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Attending Staff */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Attending Staff *
          </label>
          <input
            type="text"
            value={formData.attendingStaff}
            onChange={(e) => handleChange("attendingStaff", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
            required
          />
        </div>

        {/* Date of Visit */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Date of Visit *
          </label>
          <input
            type="date"
            value={formData.dateOfVisit}
            onChange={(e) => handleChange("dateOfVisit", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
            required
          />
        </div>

        {/* Service Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Service Name *
          </label>
          <select
            value={formData.serviceName}
            onChange={(e) => handleChange("serviceName", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white px-3 py-2 border"
            required
          >
            <option value="">Select a service</option>
            {serviceNames.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        {/* Other Service */}
        {formData.serviceName === "Others" && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Please specify other service *
            </label>
            <input
              type="text"
              value={formData.otherService}
              onChange={(e) => handleChange("otherService", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              required
            />
          </div>
        )}

        {/* Sub Service */}
        {(formData.serviceName === "Technology Consultancy" ||
          formData.serviceName ===
            "Technology Transfer & Commercialization") && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Sub Service *
            </label>
            <select
              value={formData.subService}
              onChange={(e) => handleChange("subService", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white px-3 py-2 border"
              required
            >
              <option value="">Select a sub-service</option>
              {subServices[formData.serviceName].map((subService) => (
                <option key={subService} value={subService}>
                  {subService}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Other Sub Service */}
        {formData.subService === "Others" && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Please specify other sub-service *
            </label>
            <input
              type="text"
              value={formData.otherSubService}
              onChange={(e) => handleChange("otherSubService", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              required
            />
          </div>
        )}

        {/* How Did You Know */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            How did you know about our services? *
          </label>
          <input
            type="text"
            value={formData.howDidYouKnow}
            onChange={(e) => handleChange("howDidYouKnow", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md transition-colors ${
            isSubmitting
              ? "bg-black text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ServiceForm;
