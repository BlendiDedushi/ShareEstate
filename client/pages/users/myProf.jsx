import React, { useEffect, useState } from "react";
import styles from "../../pages/style/myProf.module.css";
import axios from "axios";
import bcrypt from "bcryptjs";
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
          <label>Username:</label>
          <input
            type="text"
            value={selectedUser.username}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, username: e.target.value })
            }
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={selectedUser.email}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, email: e.target.value })
            }
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={selectedUser.password}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, password: e.target.value })
            }
          />
        </div>
        <div>
          <label>Lat:</label>
          <input
            type="number"
            value={selectedUser.latitude}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, latitude: parseFloat(e.target.value) })
            }
          />
        </div>
        <div>
          <label>Long:</label>
          <input
            type="number"
            value={selectedUser.longitude}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, longitude: parseFloat(e.target.value) })
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

const MyProfile = () => {
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
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
      if (!selectedUser.username) {
        setErrorMessage("Please enter a username.");
        return;
      }

      if (!selectedUser.email) {
        setErrorMessage("Please enter an email.");
        return;
      }

      if (!selectedUser.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        setErrorMessage("Please enter a valid email.");
        return;
      }

      if (!selectedUser.password) {
        setErrorMessage("Please enter a password.");
        return;
      }

      if (selectedUser.password.length < 5) {
        setErrorMessage("Password should be at least 5 characters long.");
        return;
      }

      if (!/[A-Z]/.test(selectedUser.password)) {
        setErrorMessage("Password should contain at least 1 uppercase letter.");
        return;
      }

      if (!/[!@#$%^&*]/.test(selectedUser.password)) {
        setErrorMessage("Password should contain at least 1 symbol.");
        return;
      }
      let hashedPassword = null;
      if (selectedUser.password) {
        hashedPassword = await bcrypt.hash(selectedUser.password, 10);
      }
      const updatedUser = {
        username: selectedUser.username,
        email: selectedUser.email,
        password: hashedPassword,
        latitude: selectedUser.latitude,
        longitude: selectedUser.longitude,
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
    <div>
      <div className={styles.userss}>
        <div className={styles.userD}>
          <span>
            ID: <b>{selectedUser.id}</b>
          </span>
          <span>
            Username: <b>{selectedUser.username}</b>
          </span>
          <span>
            Email: <b>{selectedUser.email}</b>
          </span>
          <span>
            Role: <b>{selectedUser.role}</b>
          </span>
          <span>
            stripeCustomerId: <b>{selectedUser.stripeCustomerId}</b>
          </span>
          <span>
            Lat: <b>{selectedUser.latitude}</b>
          </span>
          <span>
            Long: <b>{selectedUser.longitude}</b>
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

export default MyProfile;