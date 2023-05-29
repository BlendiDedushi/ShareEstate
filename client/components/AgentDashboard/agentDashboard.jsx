import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./agentDashboard.module.css";

const AgentDashboard = () => {
  const [estates, setEstates] = useState([]);
  const [agentPosts, setAgentPosts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    city: "",
    address: "",
    distance: "",
    photos: [],
    title: "",
    desc: "",
    rating: 0,
    rooms: [],
    cheapestPrice: 0,
    featured: false,
  });

  useEffect(() => {
    // Fetch all estates
    fetchEstates();

    // Fetch agent's posts
    fetchAgentPosts();
  }, []);

  const fetchEstates = async () => {
    try {
      const response = await axios.get("http://localhost:8900/api/estates");
      setEstates(response.data);
    } catch (error) {
      console.error("Error fetching estates:", error);
    }
  };

  const fetchAgentPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8900/api/estates", {
        params: { createdBy: "agent" },
      });
      setAgentPosts(response.data);
    } catch (error) {
      console.error("Error fetching agent posts:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8900/api/estates", formData);
      setFormData({
        name: "",
        type: "",
        city: "",
        address: "",
        distance: "",
        photos: [],
        title: "",
        desc: "",
        rating: 0,
        rooms: [],
        cheapestPrice: 0,
        featured: false,
      });
      // Update agent's posts after successful creation
      fetchAgentPosts();
    } catch (error) {
      console.error("Error creating estate:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Agent Dashboard</h1>

      <h2 className={styles.subHeading}>Create New Estate</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Type:
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Distance:
          <input
            type="text"
            name="distance"
            value={formData.distance}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Photos:
          <input
            type="text"
            name="photos"
            value={formData.photos}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Rating:
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Rooms:
          <input
            type="text"
            name="rooms"
            value={formData.rooms}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Cheapest Price:
          <input
            type="number"
            name="cheapestPrice"
            value={formData.cheapestPrice}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Featured:
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                featured: e.target.checked,
              }))
            }
          />
        </label>

        <button type="submit" className={styles.button}>
          Create
        </button>
      </form>

      <h2 className={styles.subHeading}>Agent's Posts</h2>
      {agentPosts.length > 0 ? (
        <ul className={styles.list}>
          {agentPosts.map((post) => (
            <li key={post._id}>{post.title}</li>
          ))}
        </ul>
      ) : (
        <p>No posts available</p>
      )}

      <h2 className={styles.subHeading}>All Estates</h2>
      {estates.length > 0 ? (
        <ul className={styles.list}>
          {estates.map((estate) => (
            <li key={estate._id}>{estate.title}</li>
          ))}
        </ul>
      ) : (
        <p>No estates available</p>
      )}
    </div>
  );
};

export default AgentDashboard;