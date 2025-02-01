import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const AdminDashboard = () => {
  const [feedback, setFeedback] = useState([]);
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  const [filter, setFilter] = useState({ date: "", service: "", rating: "" });

  useEffect(() => {
    axios.get("/api/feedback").then((response) => {
      setFeedback(response.data);
      setFilteredFeedback(response.data);
    });
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const applyFilter = () => {
    let filtered = feedback;
    if (filter.date) {
      filtered = filtered.filter((fb) => fb.date.includes(filter.date));
    }
    if (filter.service) {
      filtered = filtered.filter((fb) => fb.service.includes(filter.service));
    }
    if (filter.rating) {
      filtered = filtered.filter((fb) => fb.rating === filter.rating);
    }
    setFilteredFeedback(filtered);
  };

  const data = {
    labels: ["Positive", "Negative"],
    datasets: [
      {
        label: "Feedback",
        data: [
          filteredFeedback.filter((fb) => fb.rating === "positive").length,
          filteredFeedback.filter((fb) => fb.rating === "negative").length,
        ],
        backgroundColor: ["#36a2eb", "#ff6384"],
      },
    ],
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the DOST Customer Satisfaction Feedback System</p>
      <div>
        <h2>Feedback Summary</h2>
        <Bar data={data} />
      </div>
      <div>
        <h2>Filter Feedback</h2>
        <input
          type="date"
          name="date"
          value={filter.date}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="service"
          placeholder="Service"
          value={filter.service}
          onChange={handleFilterChange}
        />
        <select
          name="rating"
          value={filter.rating}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="positive">Positive</option>
          <option value="negative">Negative</option>
        </select>
        <button onClick={applyFilter}>Apply Filter</button>
      </div>
      <div>
        <h2>Recent Feedback</h2>
        <ul>
          {filteredFeedback.map((fb) => (
            <li key={fb._id}>
              {fb.date}: {fb.comment} ({fb.rating})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
