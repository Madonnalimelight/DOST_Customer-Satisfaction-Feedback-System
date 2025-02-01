import React, { useState } from 'react';
import axios from 'axios';

const LibraryUserForm = () => {
  const [formData, setFormData] = useState({
    wereQueriesAnswered: false,
    subjectInterest: '',
    othersubjectInterest: '',
    mainReasonforUsing: '',
    otherReasonforUsing: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/libraryuser', formData);
      console.log('Response:', response.data);
      // Reset form or show success message
      setFormData({
        wereQueriesAnswered: false,
        subjectInterest: '',
        othersubjectInterest: '',
        mainReasonforUsing: '',
        otherReasonforUsing: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Library User Form</h2>
      <h3 className="text-lg font-semibold mb-4">FOR LIBRARY USERS ONLY</h3>

      <div className="mb-4">
        <label className="block mb-2">Were your queries answered?</label>
        <div className="flex items-center">
          <label className="mr-4">
            <input
              type="checkbox"
              name="wereQueriesAnswered"
              checked={formData.wereQueriesAnswered}
              onChange={handleChange}
              className="mr-1"
            />
            Yes
          </label>
          <label>
            <input
              type="checkbox"
              name="wereQueriesAnswered"
              checked={!formData.wereQueriesAnswered}
              onChange={handleChange}
              className="mr-1"
            />
            No
          </label>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Please specify subject of interest:</h4>
        {['Food Processing', 'Gifts, Housewares, Decors', 'Agriculture/ Horticulture', 'Aquaculture/Marine', 'Furniture', 'Metals & Engineering', 'Health and Pharma.', 'ICT', 'Others'].map((subject) => (
          <label key={subject} className="block mb-1">
            <input
              type="radio"
              name="subjectInterest"
              value={subject}
              checked={formData.subjectInterest === subject}
              onChange={handleChange}
              className="mr-2"
            />
            {subject}
          </label>
        ))}
        {formData.subjectInterest === 'Others' && (
          <input
            type="text"
            name="othersubjectInterest"
            placeholder="Please specify"
            value={formData.othersubjectInterest}
            onChange={handleChange}
            className="mt-2 p-2 border border-gray-300 rounded w-full"
          />
        )}
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">What is your main reason for using the library?</h4>
        {['To support course of study/school requirement', 'Leisure/general enjoyment', 'Independent learning/research', 'Others'].map((reason) => (
          <label key={reason} className="block mb-1">
            <input
              type="radio"
              name="mainReasonforUsing"
              value={reason}
              checked={formData.mainReasonforUsing === reason}
              onChange={handleChange}
              className="mr-2"
            />
            {reason}
          </label>
        ))}
        {formData.mainReasonforUsing === 'Others' && (
          <input
            type="text"
            name="otherReasonforUsing"
            placeholder="Please specify"
            value={formData.otherReasonforUsing}
            onChange={handleChange}
            className="mt-2 p-2 border border-gray-300 rounded w-full"
          />
        )}
      </div>

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Submit
      </button>
    </form>
  );
};

export default LibraryUserForm;
