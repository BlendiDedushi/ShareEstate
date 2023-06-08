import styles from "./agentDashboard.module.css";
import DeleteConfirmationPopup from "@/components/DeleteConfirm/DeleteConfirmationPopup";
import ErrorPopup from "@/components/ErrorCreating/ErrorPopup";
import SuccessPopup from "@/components/Success/SuccessPopup";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const AgentDashboard = () => {
  const [selectedEstate, setSelectedEstate] = useState(null);
  const [selectedEstateField, setSelectedEstateField] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [estateToDelete, setEstateToDelete] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [estateData, setEstateData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    city: "",
    latitude: 0,
    longitude: 0,
    distance: "",
    photos: [],
    title: "",
    desc: "",
    rating: 0,
    rooms: [],
    cheapestPrice: 0,
    featured: false,
    createdBy: "",
  });
  const [activeTab, setActiveTab] = useState("MyProfile");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8900/api/estates");
      setEstateData(response.data);
    } catch (error) {
      // Handle error responses and display an error message
    }
  };

  const handleInputChangeee = (event, estateId, fieldName) => {
    const { value } = event.target;
    setEstateData((prevState) => {
      const updatedData = prevState.map((estate) => {
        if (estate._id === estateId) {
          return {
            ...estate,
            [fieldName]: value,
          };
        }
        return estate;
      });
      return updatedData;
    });
  };

  const handleUpdateSubmit = async (estateId) => {
    try {
      const updatedEstate = estateData.find((estate) => estate._id === estateId);
      await updateEstate(estateId, updatedEstate);
      // Reset the selectedEstate and selectedEstateField states
      setSelectedEstate(null);
      setSelectedEstateField(null);
    } catch (error) {
      // Handle error responses and display an error message
    }
  };

  const setEstateToUpdateField = (fieldName) => {
    setSelectedEstateField(fieldName);
  };

  const setEstateToUpdate = (estateId) => {
    setSelectedEstate(estateId);
  };



  const createEstate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8900/api/estates",
        formData
      );
      setEstateData([...estateData, response.data]);
      setShowSuccessPopup(true);
      setShowErrorPopup(false); // Hide error popup if shown previously
      clearForm();
    } catch (error) {
      console.error("Error creating estate:", error);
      setShowErrorPopup(true);
      setShowSuccessPopup(false); // Hide success popup if shown previously
    }
  };

  const handleSuccessPopupClose = () => {
    setShowSuccessPopup(false);
  };

  const handleErrorPopupClose = () => {
    setShowErrorPopup(false);
  };

  const updateEstate = async (estateId, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:8900/api/estates/${estateId}`,
        updatedData
      );
      const updatedEstate = response.data;
      const updatedEstateIndex = estateData.findIndex(
        (estate) => estate._id === updatedEstate._id
      );

      if (updatedEstateIndex !== -1) {
        const updatedEstateData = [...estateData];
        updatedEstateData[updatedEstateIndex] = updatedEstate;
        setEstateData(updatedEstateData);
      }
      // Display a success message or perform any other necessary actions
    } catch (error) {
      // Handle error responses and display an error message
    }
  };

  const deleteEstate = async (estateId) => {
    try {
      await axios.delete(`http://localhost:8900/api/estates/${estateId}`);
      setEstateData(estateData.filter((estate) => estate._id !== estateId));
      // Display a success message or perform any other necessary actions
    } catch (error) {
      // Handle error responses and display an error message
    }
  };

  const showDeleteConfirmation = (estate) => {
    setEstateToDelete(estate);
    setShowDeletePopup(true);
  };

  const hideDeleteConfirmation = () => {
    setEstateToDelete(null);
    setShowDeletePopup(false);
  };

  const confirmDeleteEstate = () => {
    if (estateToDelete) {
      deleteEstate(estateToDelete._id);
    }
    hideDeleteConfirmation();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleFileInputChange = (e) => {
    const fileArray = Array.from(e.target.files);
    setFormData({ ...formData, photos: fileArray });
  };

  const clearForm = () => {
    setFormData({
      name: "",
      type: "",
      city: "",
      latitude: 0,
      longitude: 0,
      distance: "",
      photos: [],
      title: "",
      desc: "",
      rating: 0,
      rooms: [],
      cheapestPrice: 0,
      featured: false,
      createdBy: "",
    });
    const fileInput = document.querySelector('input[name="photos"]');
    if (fileInput) {
      fileInput.value = "";
    }
  };
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const renderContent = () => {
    switch (activeTab) {
      case "MyProfile":
        return <div>My Profile Content</div>;
      case "CreateEstate":
        return (
          <div>
            <form className={styles.createForm} onSubmit={createEstate}>
              <label>
                <p>Name:</p>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <p>Type:</p>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <p>City:</p>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <p>Latitude:</p>
                <input
                  type="number"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <p>Longitude:</p>
                <input
                  type="number"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <p>Distance:</p>
                <input
                  type="text"
                  name="distance"
                  value={formData.distance}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <p>Photos:</p>
                <input
                  type="file"
                  name="photos"
                  multiple
                  onChange={handleFileInputChange}
                />
              </label>
              <label>
                <p>Title:</p>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <p>Description:</p>
                <input
                  type="text"
                  name="desc"
                  value={formData.desc}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <p>Rating:</p>
                <input
                  type="number"
                  name="rating"
                  min={0}
                  max={5}
                  value={formData.rating}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <p>Rooms:</p>
                <input
                  type="text"
                  name="rooms"
                  value={formData.rooms}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <p>Cheapest Price:</p>
                <input
                  type="number"
                  name="cheapestPrice"
                  value={formData.cheapestPrice}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <p>Featured:</p>
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                />
              </label>
              <label>
                <p>Created By:</p>
                <input
                  type="text"
                  name="createdBy"
                  value={formData.createdBy}
                  onChange={handleInputChange}
                />
              </label>
              <div className={styles.btns}>
                <button onClick={clearForm}>Clear</button>
                <button type="submit">Create</button>
              </div>
            </form>
          </div>
        );
      case "DeleteEstate":
        return (
          <div className={styles.properties}>
            {estateData?.map((estate) => (
              <div key={estate.id} className={styles.fpItemD}>
                <img
                  src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
                  alt=""
                  className={styles.fpImg}
                />
                <span className={styles.fpName}>{estate.name}</span>
                <span className={styles.fpCity}>{estate.city}</span>
                <span className={styles.fpPrice}>
                  Starting from ${estate.cheapestPrice}
                </span>
                <div className={styles.fpRatingg}>
                  <button onClick={() => showDeleteConfirmation(estate)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {showDeletePopup && (
              <DeleteConfirmationPopup
                estateName={estateToDelete?.name}
                onCancel={hideDeleteConfirmation}
                onConfirm={confirmDeleteEstate}
              />
            )}
          </div>
        );
      case "UpdateEstate":
        return (
          <div className={styles.properties}>
            {estateData.map((estate) => {
              const isUpdating = selectedEstate === estate._id;
              return (
                <div key={estate._id} className={styles.fpItem}>
                  <img
                    src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
                    alt=""
                    className={styles.fpImg}
                  />
                  <span
                    className={styles.fpName}
                    onClick={() => setEstateToUpdateField("name")}
                  >
                    {isUpdating && selectedEstateField === "name" ? (
                      <input
                        type="text"
                        value={estate.name}
                        onChange={(e) =>
                          handleInputChangeee(e, estate._id, "name")
                        }
                        onBlur={() => setEstateToUpdate(null)}
                      />
                    ) : (
                      estate.name
                    )}
                  </span>
                  <span
                    className={styles.fpCity}
                    onClick={() => setEstateToUpdateField("city")}
                  >
                    {isUpdating && selectedEstateField === "city" ? (
                      <input
                        type="text"
                        value={estate.city}
                        onChange={(e) =>
                          handleInputChangeee(e, estate._id, "city")
                        }
                        onBlur={() => setEstateToUpdate(null)}
                      />
                    ) : (
                      estate.city
                    )}
                  </span>
                  <span
                    className={styles.fpPrice}
                    onClick={() => setEstateToUpdateField("cheapestPrice")}
                  >
                    {isUpdating && selectedEstateField === "cheapestPrice" ? (
                      <input
                        type="number"
                        value={estate.cheapestPrice}
                        onChange={(e) =>
                          handleInputChangeee(e, estate._id, "cheapestPrice")
                        }
                        onBlur={() => setEstateToUpdate(null)}
                      />
                    ) : (
                      `Starting from $${estate.cheapestPrice}`
                    )}
                  </span>
                  <div className={styles.fpRating}>
                    {isUpdating ? (
                      <button onClick={() => handleUpdateSubmit(estate._id)}>
                        Save
                      </button>
                    ) : (
                      <button onClick={() => setEstateToUpdate(estate._id)}>
                        Update
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );

      default:
        return null;
    }
  };
  return (
    <div>
      <div className={styles.dash}>
        <div className={styles.left}>
          <ul>
            <li
              className={activeTab === "MyProfile" ? styles.active : ""}
              onClick={() => handleTabClick("MyProfile")}
              role="button"
            >
              My Profile
              <img
                src="https://cdn-icons-png.flaticon.com/128/2102/2102647.png"
                alt="Profile"
              />
            </li>
            <li
              className={activeTab === "CreateEstate" ? styles.active : ""}
              onClick={() => handleTabClick("CreateEstate")}
              role="button"
            >
              Create Estate
              <img
                src="https://cdn-icons-png.flaticon.com/128/10015/10015412.png"
                alt="Create"
              />
            </li>
            <li
              className={activeTab === "DeleteEstate" ? styles.activeD : ""}
              onClick={() => handleTabClick("DeleteEstate")}
              role="button"
            >
              Delete Estate
              <img
                src="https://cdn-icons-png.flaticon.com/128/484/484662.png"
                alt="Delete"
              />
            </li>
            <li
              className={activeTab === "UpdateEstate" ? styles.activeU : ""}
              onClick={() => handleTabClick("UpdateEstate")}
              role="button"
            >
              Update Estate
              <img
                src="https://cdn-icons-png.flaticon.com/128/875/875100.png"
                alt="Update"
              />
            </li>
          </ul>
        </div>
        <div className={styles.right}>{renderContent()}</div>
        {showSuccessPopup && <SuccessPopup onClose={handleSuccessPopupClose} />}

        {/* {showErrorPopup && <ErrorPopup onClose={handleErrorPopupClose} />} */}
      </div>
    </div>
  );
};

export default AgentDashboard;
