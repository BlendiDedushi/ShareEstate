import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./style/FindRoomate.module.css";
import { useCookies } from "react-cookie";
import Navbar from "@/components/Navbar/navbar";
import Footer from "@/components/Footer/footer";
import { LoadingScreen } from "@/components/Load/LoadingScreen";

const Roommate = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [cookies] = useCookies(["token"]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [filterPreferences, setFilterPreferences] = useState({
    smoking: false,
    gender: "",
    age: "",
    occupation: "",
    preferredLocation: "",
    preferredGender: ""
  });

  useEffect(() => {
    getUsers();
  }, []);

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

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8900/api/users", {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const applyFilters = () => {
    const { smoking, gender, age, occupation, preferredLocation, preferredGender } = filterPreferences;

    const filteredUsers = users.filter((user) => {
      let matchedFieldCount = 0;

      if (smoking && user.smoking === smoking) {
        matchedFieldCount++;
      }

      if (gender && user.gender && user.gender.toLowerCase() === gender.toLowerCase()) {
        matchedFieldCount++;
      }

      if (preferredGender && user.preferredGender && user.preferredGender.toLowerCase() === preferredGender.toLowerCase()) {
        matchedFieldCount++;
      }

      if (age && user.age === parseInt(age)) {
        matchedFieldCount++;
      }

      if (occupation && user.occupation && user.occupation.toLowerCase() === occupation.toLowerCase()) {
        matchedFieldCount++;
      }

      if (preferredLocation && user.preferredLocation && user.preferredLocation.toLowerCase() === preferredLocation.toLowerCase()) {
        matchedFieldCount++;
      }

      const minimumMatchedFields = 2;
      return matchedFieldCount >= minimumMatchedFields;
    });

    setFilteredUsers(filteredUsers);
  };

  const handlePreferenceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilterPreferences((prevPreferences) => ({
      ...prevPreferences,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSearch = () => {
    applyFilters();
  };

  const calculateMatchPercentage = (user) => {
    const { smoking, gender, age, occupation, preferredLocation, preferredGender } = filterPreferences;
    let matchCount = 0;
    let totalFields = 0;

    if (smoking && user.smoking === smoking) {
      matchCount++;
    }
    totalFields++;

    if (gender && user.gender === gender) {
      matchCount++;
    }
    totalFields++;

    if (preferredGender && user.preferredGender === preferredGender) {
      matchCount++;
    }
    totalFields++;

    if (age && user.age === parseInt(age)) {
      matchCount++;
    }
    totalFields++;

    if (occupation && user.occupation === occupation) {
      matchCount++;
    }
    totalFields++;

    if (preferredLocation && user.preferredLocation === preferredLocation) {
      matchCount++;
    }
    totalFields++;

    const matchPercentage = (matchCount / totalFields) * 100;
    return matchPercentage.toFixed(2);
  };

  const shouldDisplayUsers = () => {
    return filteredUsers.length > 0;
  };

  return (
    <div>
      <Navbar />
      <div className={styles.filtr}>
        <div>
          <label>Gender:</label>
          <select
            name="gender"
            value={filterPreferences.gender}
            onChange={handlePreferenceChange}
          >
            <option value="">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label>Smoking:</label>
          <input
            type="checkbox"
            name="smoking"
            checked={filterPreferences.smoking}
            onChange={handlePreferenceChange}
          />
        </div>
        <div>
          <label>Preferred Gender:</label>
          <select
            name="preferredGender"
            value={filterPreferences.preferredGender}
            onChange={handlePreferenceChange}
          >
            <option value="">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label>Age:</label>
          <input
            type="text"
            name="age"
            value={filterPreferences.age}
            onChange={handlePreferenceChange}
          />
        </div>
        <div>
          <label>Occupation:</label>
          <input
            type="text"
            name="occupation"
            value={filterPreferences.occupation}
            onChange={handlePreferenceChange}
          />
        </div>
        <div>
          <label>Preferred Location:</label>
          <input
            type="text"
            name="preferredLocation"
            value={filterPreferences.preferredLocation}
            onChange={handlePreferenceChange}
          />
        </div>
        <button onClick={handleSearch}>Search</button>
      </div>

      {shouldDisplayUsers() &&
        filteredUsers.map((user) => {
          if (user.role === "admin" || user.role === "agent" || user.id === loggedInUserId) {
            return null;
          }

          const matchPercentage = calculateMatchPercentage(user);

          return (
            <div key={user.id} className={styles.userss}>
              <div className={styles.userD}>
                <span>
                  Email: <b>{user.email.toLowerCase()}</b>
                </span>
                <span>
                  Gender: <b>{user.gender.toLowerCase()}</b>
                </span>
                <span>
                  Smoking: <b>{user.smoking ? "Yes" : "No"}</b>
                </span>
                <span>
                  Preferred Gender: <b>{user.preferredGender.toLowerCase()}</b>
                </span>
                <span>
                  Age: <b>{user.age}</b>
                </span>
                <span>
                  Occupation: <b>{user.occupation.toLowerCase()}</b>
                </span>
                <span>
                  Preferred Location: <b>{user.preferredLocation.toLowerCase()}</b>
                </span>
                <span>
                  Matched: <b>{matchPercentage}%</b>
                </span>
              </div>
            </div>
          );
        })}
      {!shouldDisplayUsers() && <LoadingScreen />}
      <Footer />
    </div>
  );
};

export default Roommate;
