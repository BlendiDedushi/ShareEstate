import styles from "./agentDashboard.module.css";
import DeleteConfirmationPopup from "@/components/DeleteConfirm/DeleteConfirmationPopup";
import ErrorPopup from "@/components/ErrorCreating/ErrorPopup";
import SuccessPopup from "@/components/Success/SuccessPopup";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useCookies } from "react-cookie";
import UsersC from "@/pages/users/users";
import MyProfile from "@/pages/users/myProf";
import Preferences from "@/pages/users/myPreferences";

const AgentDashboard = ({ data }) => {
  const [selectedEstate, setSelectedEstate] = useState(null);
  const [selectedEstateField, setSelectedEstateField] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [estateToDelete, setEstateToDelete] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [estateData, setEstateData] = useState([]);
  const [users, setUsers] = useState([]);
  const [cookie, setCookie] = useCookies(["token"]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState({ role: "" });
  const [cookies] = useCookies(["token"]);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    city: "Prishtina",
    latitude: 42.6629138,
    longitude: 21.1655028,
    photos: ["https://images.unsplash.com/photo-1624204386084-dd8c05e32226?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXBhcnRtZW50JTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D&w=1000&q=80"],
    title: "",
    desc: "",
    rating: 0,
    cheapestPrice: 0,
    featured: false,
    characteristics: {
      rooms: 0,
      bathrooms: 0,
      parking: false,
      balcony: false,
    },
    lifestyle: {
      smoking: false,
      studentFriendly: false,
      familyFriendly: false,
      petsAllowed: false,
      ageRestrictions: 0,
    },
  });
  const [activeTab, setActiveTab] = useState("MyProfile");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8900/api/estates");
      setEstateData(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8900/api/users/${loggedInUserId}/`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );
        setSelectedUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (loggedInUserId) {
      fetchLoggedInUser();
    }
  }, [loggedInUserId, cookies.token]);

  useEffect(() => {
    const fetchLoggedInUserId = async () => {
      try {
        const response = await axios.get("http://localhost:8900/api/users/me", {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        setLoggedInUserId(response.data.id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLoggedInUserId();
  }, [cookies.token]);

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
      const updatedEstate = estateData.find(
        (estate) => estate._id === estateId
      );
      await updateEstate(estateId, updatedEstate);
      setSelectedEstate(null);
      setSelectedEstateField(null);
    } catch (error) {}
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
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      );
      setEstateData([...estateData, response.data]);
      setShowSuccessPopup(true);
      setShowErrorPopup(false);
      clearForm();
    } catch (error) {
      console.error("Error creating estate:", error);
      setShowErrorPopup(true);
      setShowSuccessPopup(false);
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
    } catch (error) {}
  };

  const deleteEstate = async (estateId) => {
    try {
      await axios.delete(`http://localhost:8900/api/estates/${estateId}`);
      setEstateData(estateData.filter((estate) => estate._id !== estateId));
    } catch (error) {}
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

    const nameArray = name.split(".");
    if (nameArray.length === 1) {
      setFormData({ ...formData, [name]: value });
    } else if (nameArray.length === 2) {
      const [parent, child] = nameArray;
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    }
  };

  const handleFileInputChange = (e) => {
    const fileArray = Array.from(e.target.files);
    const fileNames = fileArray.map((file) => file.name);
    setFormData({ ...formData, photos: fileNames });
  };

  const clearForm = () => {
    setFormData({
      name: "",
      type: "",
      city: "",
      latitude: 42.6629138,
      longitude: 21.1655028,
      photos: [],
      title: "",
      desc: "",
      rating: 0,
      cheapestPrice: 0,
      featured: false,
      characteristics: {
        rooms: 0,
        bathrooms: 0,
        parking: false,
        balcony: false,
      },
      lifestyle: {
        smoking: false,
        studentFriendly: false,
        familyFriendly: false,
        petsAllowed: false,
        ageRestrictions: 0,
      },
    });
    const fileInput = document.querySelector('input[name="photos"]');
    if (fileInput) {
      fileInput.value = "";
    }
  };
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [search, setSearch] = useState();
  const [price, setPrice] = useState();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8900/api/estates`, {
        params: {
          search: search,
          price: price,
        },
      });
      setEstateData(response.data);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [price, search]);

  const renderContent = () => {
    if (selectedUser.role === "user") {
      switch (activeTab) {
        case "MyProfile":
          return (
            <div>
              <MyProfile />
            </div>
          );
        case "Preferences":
          return (
            <div>
              <Preferences />
            </div>
          );
        default:
          return null;
      }
    }
    if (selectedUser.role === "admin") {
      switch (activeTab) {
        case "MyProfile":
          return (
            <div>
              <MyProfile />
            </div>
          );
        case "Users":
          return (
            <div>
              <UsersC />
            </div>
          );
        default:
          return null;
      }
    } else if (selectedUser.role === "agent") {
      switch (activeTab) {
        case "MyProfile":
          return (
            <div>
              <MyProfile />
            </div>
          );
        case "CreateEstate":
          return (
            <div>
              <form className={styles.createForm} onSubmit={createEstate}>
                <div className={styles.createForm1}>
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
                      type="text"
                      name="city"
                      value={formData.latitude}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    <p>Longitude:</p>
                    <input
                      type="text"
                      name="city"
                      value={formData.latitude}
                      onChange={handleInputChange}
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
                </div>
                <div className={styles.createForm2}>
                  <label>
                    <p>Rooms:</p>
                    <input
                      type="number"
                      name="characteristics.rooms"
                      value={formData.characteristics.rooms}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    <p>Bathrooms:</p>
                    <input
                      type="number"
                      name="characteristics.bathrooms"
                      value={formData.characteristics.bathrooms}
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
                    <p>Age Restrictions:</p>
                    <input
                      type="number"
                      name="lifestyle.ageRestrictions"
                      value={formData.lifestyle.ageRestrictions}
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
                    <p>Photos:</p>
                    <input
                      type="file"
                      name="photos"
                      multiple
                      onChange={handleFileInputChange}
                    />
                  </label>
                </div>
                <div className={styles.createForm3}>
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
                    <p>Parking:</p>
                    <input
                      type="checkbox"
                      name="characteristics.parking"
                      checked={formData.characteristics.parking}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          characteristics: {
                            ...formData.characteristics,
                            parking: e.target.checked,
                          },
                        })
                      }
                    />
                  </label>
                  <label>
                    <p>Balcony:</p>
                    <input
                      type="checkbox"
                      name="characteristics.balcony"
                      checked={formData.characteristics.balcony}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          characteristics: {
                            ...formData.characteristics,
                            balcony: e.target.checked,
                          },
                        })
                      }
                    />
                  </label>
                  <label>
                    <p>Smoking:</p>
                    <input
                      type="checkbox"
                      name="lifestyle.smoking"
                      checked={formData.lifestyle.smoking}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          lifestyle: {
                            ...formData.lifestyle,
                            smoking: e.target.checked,
                          },
                        })
                      }
                    />
                  </label>
                  <label>
                    <p>Student Friendly:</p>
                    <input
                      type="checkbox"
                      name="lifestyle.studentFriendly"
                      checked={formData.lifestyle.studentFriendly}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          lifestyle: {
                            ...formData.lifestyle,
                            studentFriendly: e.target.checked,
                          },
                        })
                      }
                    />
                  </label>
                  <label>
                    <p>Family Friendly:</p>
                    <input
                      type="checkbox"
                      name="lifestyle.familyFriendly"
                      checked={formData.lifestyle.familyFriendly}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          lifestyle: {
                            ...formData.lifestyle,
                            familyFriendly: e.target.checked,
                          },
                        })
                      }
                    />
                  </label>
                  <label>
                    <p>Pets Allowed:</p>
                    <input
                      type="checkbox"
                      name="lifestyle.petsAllowed"
                      checked={formData.lifestyle.petsAllowed}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          lifestyle: {
                            ...formData.lifestyle,
                            petsAllowed: e.target.checked,
                          },
                        })
                      }
                    />
                  </label>
                </div>
                <div className={styles.btns}>
                  <button type="submit">Create</button>
                  <button onClick={clearForm}>Clear</button>
                </div>
              </form>
            </div>
          );
        case "UpdateEstate":
          return (
            <div>
              <div className={`${styles.formGroup} mb-[20px] mx-[25px]`}>
                <div className={"flex gap-[20px]"}>
                  <div className="flex flex-col justify-center">
                    <label htmlFor="price" className="mb-[5px] text-[16px]">
                      Select a price:
                    </label>
                    <select
                      id="price"
                      className="px-4 py-2 border border-gray-300 rounded-[10px] focus:outline-none w-[200px]"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    >
                      <option value="">Price</option>
                      <option value="200">200€</option>
                      <option value="500">500€</option>
                      <option value="1000">1000€</option>
                    </select>
                  </div>
                  <div className="flex flex-col justify-center">
                    <label htmlFor="search" className="mb-[5px] text-[16px]">
                      Search:
                    </label>
                    <input
                      type={"search"}
                      id="search"
                      placeholder={"Search..."}
                      className="px-4 py-2 border border-gray-300 rounded-[10px] focus:outline-none w-[200px]"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.properties}>
                {estateData
                  .filter(
                    (estate) =>
                      estate.createdBy.toString() === selectedUser.id.toString()
                  )
                  .map((estate) => {
                    const isUpdating = selectedEstate === estate._id;
                    return (
                      <div key={estate._id} className={styles.fpItem}>
                        <img
                          src={estate.photos[0]}
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
                          onClick={() =>
                            setEstateToUpdateField("cheapestPrice")
                          }
                        >
                          {isUpdating &&
                          selectedEstateField === "cheapestPrice" ? (
                            <input
                              type="number"
                              value={estate.cheapestPrice}
                              onChange={(e) =>
                                handleInputChangeee(
                                  e,
                                  estate._id,
                                  "cheapestPrice"
                                )
                              }
                              onBlur={() => setEstateToUpdate(null)}
                            />
                          ) : (
                            `Starting from $${estate.cheapestPrice}`
                          )}
                        </span>
                        <div className={styles.fpRating}>
                          {isUpdating ? (
                            <button
                              onClick={() => handleUpdateSubmit(estate._id)}
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              onClick={() => setEstateToUpdate(estate._id)}
                            >
                              Update
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        case "DeleteEstate":
          return (
            <div>
              <div className={`${styles.formGroup} mb-[20px] mx-[25px]`}>
                <div className={"flex gap-[20px]"}>
                  <div className="flex flex-col justify-center">
                    <label htmlFor="price" className="mb-[5px] text-[16px]">
                      Select a price:
                    </label>
                    <select
                      id="price"
                      className="px-4 py-2 border border-gray-300 rounded-[10px] focus:outline-none w-[200px]"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    >
                      <option value="">Price</option>
                      <option value="200">200€</option>
                      <option value="500">500€</option>
                      <option value="1000">1000€</option>
                    </select>
                  </div>
                  <div className="flex flex-col justify-center">
                    <label htmlFor="search" className="mb-[5px] text-[16px]">
                      Search:
                    </label>
                    <input
                      type={"search"}
                      id="search"
                      placeholder={"Search..."}
                      className="px-4 py-2 border border-gray-300 rounded-[10px] focus:outline-none w-[200px]"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.properties}>
                {estateData
                  .filter(
                    (estate) =>
                      estate.createdBy.toString() === selectedUser.id.toString()
                  )
                  .map((estate) => (
                    <div key={estate.id} className={styles.fpItemD}>
                      <img
                        src={estate.photos[0]}
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
            </div>
          );
        default:
          return null;
      }
    } else {
      switch (activeTab) {
        case "MyProfile":
          return (
            <div>
              <MyProfile />
            </div>
          );
        default:
          return null;
      }
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
            {selectedUser.role === "user" && (
              <li
                className={activeTab === "Preferences" ? styles.active : ""}
                onClick={() => handleTabClick("Preferences")}
                role="button"
              >
                MyPreferences
                <img
                  src="https://cdn-icons-png.flaticon.com/128/7862/7862026.png"
                  alt="Preferences"
                />
              </li>
            )}
            {selectedUser.role === "admin" && (
              <li
                className={activeTab === "Users" ? styles.active : ""}
                onClick={() => handleTabClick("Users")}
                role="button"
              >
                Users
                <img
                  src="https://cdn-icons-png.flaticon.com/128/694/694642.png"
                  alt="Users"
                />
              </li>
            )}
            {selectedUser.role === "agent" && (
              <>
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
              </>
            )}
          </ul>
        </div>
        <div className={styles.right}>{renderContent()}</div>
        {showSuccessPopup && <SuccessPopup onClose={handleSuccessPopupClose} />}
        {showErrorPopup && <ErrorPopup onClose={handleErrorPopupClose} />}
      </div>
    </div>
  );
};

export default AgentDashboard;
