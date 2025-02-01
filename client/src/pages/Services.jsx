import React, { useEffect, useState } from "react";
import axios from "axios";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    serviceName: "",
    otherService: "",
    subService: "",
    howDidYouKnow: "",
    dateOfVisit: "",
    attendingStaff: "",
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("/api/services");
        console.log("Response data:", response.data); // Log the response data
        if (Array.isArray(response.data)) {
          setServices(response.data);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/services",
        formData
      );
      setServices([...services, response.data]);
      setFormData({
        serviceName: "",
        otherService: "",
        subService: "",
        howDidYouKnow: "",
        dateOfVisit: "",
        attendingStaff: "",
      });
    } catch (err) {
      setError("Failed to add service");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Services List</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Service Name:</label>
          <input
            type="text"
            name="serviceName"
            value={formData.serviceName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Other Service:</label>
          <input
            type="text"
            name="otherService"
            value={formData.otherService}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Sub Service:</label>
          <input
            type="text"
            name="subService"
            value={formData.subService}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>How Did You Know:</label>
          <input
            type="text"
            name="howDidYouKnow"
            value={formData.howDidYouKnow}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date of Visit:</label>
          <input
            type="date"
            name="dateOfVisit"
            value={formData.dateOfVisit}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Attending Staff:</label>
          <input
            type="text"
            name="attendingStaff"
            value={formData.attendingStaff}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Service</button>
      </form>
      {Array.isArray(services) && services.length > 0 ? (
        services.map((service) => (
          <div
            key={service._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px",
            }}
          >
            <h4>{service.serviceName}</h4>
            {service.otherService && (
              <p>
                <strong>Other Service:</strong> {service.otherService}
              </p>
            )}
            {service.subService && (
              <p>
                <strong>Sub Service:</strong> {service.subService}
              </p>
            )}
            <p>
              <strong>How Did You Know:</strong> {service.howDidYouKnow}
            </p>
            <p>
              <strong>Date of Visit:</strong>{" "}
              {new Date(service.dateOfVisit).toLocaleDateString()}
            </p>
            <p>
              <strong>Attending Staff:</strong> {service.attendingStaff}
            </p>
          </div>
        ))
      ) : (
        <p>No services found.</p>
      )}
    </div>
  );
};

export default Services;
