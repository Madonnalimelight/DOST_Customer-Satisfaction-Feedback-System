import React, { useState } from "react";
import axios from "axios";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import LibraryUserForm from './LibraryUserForm';


const EmojiRating = ({ name, value, onChange, isSelected }) => {
  const getEmoji = (rating) => {
    switch (rating) {
      case "1":
        return "😄"; // Very Satisfied
      case "2":
        return "🙂"; // Satisfied
      case "3":
        return "😐"; // Neutral
      case "4":
        return "🙁"; // Dissatisfied
      case "5":
        return "😞"; // Very Dissatisfied
      default:
        return "😐";
    }
  };

  const getLabel = (rating) => {
    switch (rating) {
      case "1":
        return "Very Satisfied";
      case "2":
        return "Satisfied";
      case "3":
        return "Neutral";
      case "4":
        return "Dissatisfied";
      case "5":
        return "Very Dissatisfied";
      default:
        return "";
    }
  };

  return (
    <label className="cursor-pointer relative group">
      <input
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        className="sr-only"
      />
      <div className={`
        flex flex-col items-center p-4 rounded-lg transition-all duration-300
        ${isSelected ? 'bg-blue-50 scale-110' : 'hover:bg-gray-50'}
        transform hover:scale-105 hover:-translate-y-1
      `}>
        <div className={`
          text-4xl mb-2 transition-transform duration-500
          animate-bounce-slow transform-gpu
          ${isSelected ? 'scale-125' : ''}
          hover:scale-110
        `}>
          {getEmoji(value)}
        </div>
        <span className="text-sm text-gray-600 text-center">
          {getLabel(value)}
        </span>
      </div>
    </label>
  );
};

const CustomerEvaluationForm = () => {
  const [formData, setFormData] = useState({
    speedAndTimeliness: "",
    qualityOfService: "",
    relevanceOfService: "",
    staffCompetence: "",
    staffAttitude: "",
    overallPerception: "",
    likelihoodScore: "",
    helpUsImprove: "",
  });

  const [isLibraryUser, setIsLibraryUser] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Log the data being sent
      console.log('Submitting data:', formData);
      
      const response = await axios.post('http://localhost:3000/api/customerevaluation', formData);
      console.log('Response:', response.data);
      
      // Reset form or show success message
      setFormData({
        speedAndTimeliness: "",
        qualityOfService: "",
        relevanceOfService: "",
        staffCompetence: "",
        staffAttitude: "",
        overallPerception: "",
        likelihoodScore: "",
        helpUsImprove: "",
      });
      
      setSuccess('Evaluation submitted successfully!');
      
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
      setError('Error submitting evaluation. Please try again.');
    }
  };

  const handleLibraryUserChange = (value) => {
    setIsLibraryUser(value);
  };

  const evaluationFields = [
    { name: "speedAndTimeliness", label: "Speed and Timeliness" },
    { name: "qualityOfService", label: "Quality of Service" },
    { name: "relevanceOfService", label: "Relevance of Service" },
    { name: "staffCompetence", label: "Staff Competence" },
    { name: "staffAttitude", label: "Staff Attitude" },
    { name: "overallPerception", label: "Overall Perception" },
  ];

  const RecommendationQuestion = () => {
    const handleRatingChange = (value) => {
      // Update the parent form's likelihoodScore
      setFormData(prev => ({
        ...prev,
        likelihoodScore: value.toString()
      }));
    };

    return (
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-700">How likely is it that you would recommend/endorse DOST's services to others?</h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <span className="text-sm text-gray-600">Not at all likely</span>
          <div className="flex flex-wrap gap-2 justify-center">
            {[...Array(11).keys()].map((value) => (
              <label
                key={value}
                className={`
                  cursor-pointer px-3 py-2 rounded-lg border
                  ${formData.likelihoodScore === value.toString()
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white border-gray-300 hover:bg-gray-50'}
                `}
              >
                <input
                  type="radio"
                  name="likelihoodScore"
                  value={value}
                  checked={formData.likelihoodScore === value.toString()}
                  onChange={(e) => handleRatingChange(e.target.value)}
                  className="sr-only"
                />
                {value}
              </label>
            ))}
          </div>
          <span className="text-sm text-gray-600">Extremely likely</span>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl mt-16">
      <form onSubmit={handleSubmit} className="p-6 border border-gray-300 rounded-lg shadow-md bg-white">
        <h2 className="text-2xl font-bold mb-6">Customer Evaluation Form</h2>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg flex items-start">
            <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5" />
            <p>{success}</p>
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-2">Are you a library user?</label>
          <div className="flex items-center">
            <label className="mr-4">
              <input
                type="radio"
                name="libraryUser"
                value="yes"
                onChange={() => handleLibraryUserChange(true)}
                className="mr-1"
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="libraryUser"
                value="no"
                onChange={() => handleLibraryUserChange(false)}
                className="mr-1"
              />
              No
            </label>
          </div>
        </div>

        {isLibraryUser === true && <LibraryUserForm />}

        <div className="space-y-8">
          {evaluationFields.map((field) => (
            <div key={field.name} className="space-y-4">
              <label className="text-lg font-medium text-gray-700 block">
                {field.label}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {["1", "2", "3", "4", "5"].map((rating) => (
                  <EmojiRating
                    key={rating}
                    name={field.name}
                    value={rating}
                    onChange={handleChange}
                    isSelected={formData[field.name] === rating}
                  />
                ))}
              </div>
            </div>
          ))}

          <div className="bg-gray-50 p-6 rounded-lg">
            <RecommendationQuestion />
          </div>

          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <label className="block">
              <span className="text-lg font-medium text-gray-700">Help Us Improve</span>
              <textarea
                name="helpUsImprove"
                value={formData.helpUsImprove}
                onChange={handleChange}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none min-h-[100px]"
                placeholder="Your feedback is valuable to us..."
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200"
          >
            Submit Evaluation
          </button>
        </div>
      </form>

      {isLibraryUser === false && (
        <div className="mt-6">
          <h3 className="text-lg font-bold">Summary of Your Answers:</h3>
          <p>Speed and Timeliness: {formData.speedAndTimeliness}</p>
          <p>Quality of Service: {formData.qualityOfService}</p>
          <p>Relevance of Service: {formData.relevanceOfService}</p>
          <p>Staff Competence: {formData.staffCompetence}</p>
          <p>Staff Attitude: {formData.staffAttitude}</p>
          <p>Overall Perception: {formData.overallPerception}</p>
          <p>Likelihood to Recommend: {formData.likelihoodScore}</p>
          <p>Help Us Improve: {formData.helpUsImprove}</p>
        </div>
      )}
    </div>
  );
};

export default CustomerEvaluationForm;