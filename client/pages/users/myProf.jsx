import React, { useEffect, useState } from "react";
import styles from "../../pages/style/myProf.module.css";
import axios from "axios";
import { useCookies } from "react-cookie";


const Popup = ({ selectedUser, closePopup, saveChanges, setSelectedUser }) => {
  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <h2>Edit User</h2>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={selectedUser.username}
            onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={selectedUser.email}
            onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
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

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8900/api/users/${loggedInUserId}/`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });
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
    // Fetch the logged-in user's ID
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
      await axios.put(`http://localhost:8900/api/users/${loggedInUserId}`, selectedUser, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
  
      closePopup();
  
      console.log("User updated successfully.");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!selectedUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={styles.userss}>
        <div className={styles.userD}>
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
        />
      )}
    </div>
  );
};

export default MyProfile;