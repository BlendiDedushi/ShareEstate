import React, { useEffect, useState } from "react";
import styles from "../../pages/style/myPreferences.module.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { LoadingScreen } from "@/components/Load/LoadingScreen";

const Popup = ({
  selectedUser,
  closePopup,
  saveChanges,
  setSelectedUser,
  errorMessage,
}) => {
  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <h2>Edit User</h2>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <div>
          <label>Gender:</label>
          <input
            type="text"
            value={selectedUser.gender}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, gender: e.target.value })
            }
          />
        </div>
        <div>
          <label>Smoking:</label>
          <input
            type="checkbox"
            checked={selectedUser.smoking}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, smoking: e.target.checked })
            }
          />
        </div>
        <div>
          <label>Preferred Gender:</label>
          <input
            type="text"
            value={selectedUser.preferredGender}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                preferredGender: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={selectedUser.age}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, age: e.target.value })
            }
          />
        </div>
        <div>
          <label>Occupation:</label>
          <input
            type="text"
            value={selectedUser.occupation}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, occupation: e.target.value })
            }
          />
        </div>
        <div>
          <label>Preferred Location:</label>
          <input
            type="text"
            value={selectedUser.preferredLocation}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                preferredLocation: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label>Bio:</label>
          <textarea
            value={selectedUser.bio}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, bio: e.target.value })
            }
          />
        </div>
        <div className={styles.popupButtons}>
          <button onClick={saveChanges}>Save</button>
          <button onClick={closePopup}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const Preferences = () => {
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState({
    gender: "",
    smoking: false,
    preferredGender: "",
    age: null,
    occupation: "",
    preferredLocation: "",
    bio: "",
  });
  const [cookies] = useCookies(["token"]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleEdit = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const saveChanges = async () => {
    try {
      const updatedUser = {
        gender: selectedUser.gender,
        smoking: selectedUser.smoking,
        preferredGender: selectedUser.preferredGender,
        age: selectedUser.age,
        occupation: selectedUser.occupation,
        preferredLocation: selectedUser.preferredLocation,
        bio: selectedUser.bio,
      };

      await axios.put(
        `http://localhost:8900/api/users/${loggedInUserId}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      closePopup();
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!selectedUser) {
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className={styles.u}>
      <div className={styles.userss}>
        <div className={styles.userD}>
          <span>
            Username: <b>{selectedUser.username}</b>
          </span>
          <span>
            Gender: <b>{selectedUser.gender}</b>
          </span>
          <span>
            Smoking: <b>{selectedUser.smoking ? "Yes" : "No"}</b>
          </span>
          <span>
            Preferred Gender: <b>{selectedUser.preferredGender}</b>
          </span>
          <span>
            Age: <b>{selectedUser.age}</b>
          </span>
          <span>
            Occupation: <b>{selectedUser.occupation}</b>
          </span>
          <span>
            Preferred Location: <b>{selectedUser.preferredLocation}</b>
          </span>
          <span>
            Bio: <b>{selectedUser.bio}</b>
          </span>
        </div>
        <div className={styles.userbtnn}>
          <button onClick={handleEdit}>Edit</button>
        </div>
      </div>
      {isPopupOpen && (
        <Popup
          selectedUser={selectedUser}
          closePopup={closePopup}
          saveChanges={saveChanges}
          setSelectedUser={setSelectedUser}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};

export default Preferences;
