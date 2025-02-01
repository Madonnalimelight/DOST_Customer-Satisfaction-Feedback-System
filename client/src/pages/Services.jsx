import React, { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';

const ServiceForm = () => {
  const [formData, setFormData] = useState({
    serviceName: "",
    subService: "",
    otherSubService: "",
    howDidYouKnow: "",
    dateOfVisit: "",
    attendingStaff: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const serviceGroups = {
    'Technology Needs Assessment (TNA)': [],
    'Technology Transfer & Commercialization': [
      'Food Processing',
      'Gifts, Housewares, Decors',
      'Agriculture/Horticulture',
      'Aquaculture/Marine',
      'Furniture',
      'Metals & Engineering',
      'Health and Pharma.',
      'ICT',
      'Others'
    ],
    'Technology Consultancy': [
      'MPEX',
      'CAPE',
      'CPT',
      'Energy Audit',
      'Others'
    ],
    'Additional Services': [
      'Project Proposal Preparation',
      'Packaging and Labeling',
      'Technology Training',
      'Technology Clinics/Forum',
      'Scholarship',
      'Laboratory (Metrology/Microbiology)',
      'Library/Information',
      'Others'
    ]
  };

  const handleServiceChange = (service, subService = null) => {
    setFormData(prev => {
      const newService = subService ? `${service}-${subService}` : service;

      // Check if the selected service has valid subServices
      const validSubServices = serviceGroups[service] || [];
      const isValidSubService = subService ? validSubServices.includes(subService) : true;

      return {
        ...prev,
        serviceName: service,
        subService: isValidSubService ? newService : "", // Only set if valid
      };
    });
  };

  const handleOtherServiceChange = (value) => {
    setFormData(prev => ({
      ...prev,
      otherSubService: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    console.log("Service Name:", formData.serviceName);
    console.log("Sub Service:", formData.subService);

    console.log("Submitting form data:", formData);

    try {
      const response = await fetch("http://localhost:3000/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess("Service request submitted successfully!");
        setFormData({
          serviceName: "",
          subService: "",
          otherSubService: "",
          howDidYouKnow: "",
          dateOfVisit: "",
          attendingStaff: "",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit service request");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-blue-50 border-b border-blue-100 p-6">
            <div className="flex items-center space-x-4">
              <img src="/dost-logo.png" alt="DOST Logo" className="h-12 w-12" />
              <div>
                <h1 className="text-2xl font-bold text-blue-900">
                  Department of Science and Technology
                </h1>
                <p className="text-blue-700 mt-1">Service Request Form</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {Object.entries(serviceGroups).map(([group, subServices]) => (
                  <div key={group} className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-200 transition-colors">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id={group}
                        checked={formData.serviceName === group}
                        onChange={() => handleServiceChange(group)}
                        className="mt-1.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <label htmlFor={group} className="block font-semibold text-lg text-blue-900">
                          {group}
                        </label>
                        
                        {subServices.length > 0 && (
                          <div className="mt-3 ml-6 space-y-3">
                            {subServices.map(subService => (
                              <div key={`${group}-${subService}`} className="flex items-center space-x-3">
                                <input
                                  type="checkbox"
                                  id={`${group}-${subService}`}
                                  checked={formData.subService === `${group}-${subService}`}
                                  onChange={() => handleServiceChange(group, subService)}
                                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor={`${group}-${subService}`} className="text-sm text-gray-700">
                                  {subService}
                                </label>
                                {subService === 'Others' && 
                                 formData.subService.includes(`${group}-Others`) && (
                                  <input
                                    type="text"
                                    className="max-w-[200px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Please specify"
                                    value={formData.otherSubService}
                                    onChange={(e) => handleOtherServiceChange(e.target.value)}
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label htmlFor="howDidYouKnow" className="block font-medium text-gray-700">
                    How did you know of our services?
                  </label>
                  <input
                    type="text"
                    id="howDidYouKnow"
                    value={formData.howDidYouKnow}
                    onChange={(e) => setFormData(prev => ({ ...prev, howDidYouKnow: e.target.value }))}
                    placeholder="e.g. friend referral, TV, newspaper, internet"
                    required
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="dateOfVisit" className="block font-medium text-gray-700">
                    Date of Visit
                  </label>
                  <input
                    type="date"
                    id="dateOfVisit"
                    value={formData.dateOfVisit}
                    onChange={(e) => setFormData(prev => ({ ...prev, dateOfVisit: e.target.value }))}
                    required
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-3 md:col-span-2">
                  <label htmlFor="attendingStaff" className="block font-medium text-gray-700">
                    Attending Staff
                  </label>
                  <input
                    type="text"
                    id="attendingStaff"
                    value={formData.attendingStaff}
                    onChange={(e) => setFormData(prev => ({ ...prev, attendingStaff: e.target.value }))}
                    placeholder="Enter name of attending staff"
                    required
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-md bg-red-50 p-4 border border-red-200">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              )}

              {success && (
                <div className="rounded-md bg-green-50 p-4 border border-green-200">
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <p className="text-sm text-green-800">{success}</p>
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Submit Service Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceForm;