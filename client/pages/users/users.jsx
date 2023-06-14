import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "../../pages/style/users.module.css";
import { useCookies } from 'react-cookie';

const DeleteConfirmationPopup = ({ closePopup, confirmDelete }) => {
  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <h2>Delete User</h2>
        <p>Are you sure you want to delete this user?</p>
        <div className={styles.popupButtonss}>
          <button onClick={confirmDelete}>Confirm</button>
          <button onClick={closePopup}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const Popup = ({ selectedUser, closePopup, saveChanges }) => {
  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <h2>Edit User</h2>
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
          <label>Role:</label>
          <input
            type="text"
            value={selectedUser.role}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, role: e.target.value })
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

const UsersC = () => {
  const [users, setUsers] = useState([]);
  const [cookies] = useCookies(['token']);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8900/api/users', {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (userId) => {
    const user = users.find((user) => user.id === userId);
    setSelectedUser(user);
    openPopup();
  };

  const handleDelete = (userId) => {
    const user = users.find((user) => user.id === userId);
    setSelectedUser(user);
    openDeletePopup();
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8900/api/users/${selectedUser.id}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedUser.id));

      closeDeletePopup();

      console.log('User deleted successfully.');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const openDeletePopup = () => {
    setIsDeletePopupOpen(true);
  };

  const closeDeletePopup = () => {
    setIsDeletePopupOpen(false);
  };

  const saveChanges = async () => {
    try {
      await axios.put(`http://localhost:8900/api/users/${selectedUser.id}`, selectedUser, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === selectedUser.id ? selectedUser : user))
      );

      closePopup();

      console.log('User updated successfully.');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {users.map((user) => (
        <div key={user.id} className={styles.userss}>
          <div className={styles.userD}>
            <span>
              Username:
              <span><b>{user.username}</b></span>
            </span>
            <span>
              Email:
              <span><b>{user.email}</b></span>
            </span>
            <span>
              Role:
              <span><b>{user.role}</b></span>
            </span>
          </div>
          <div className={styles.userbtnn}>
            <button onClick={() => handleEdit(user.id)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </div>
        </div>
      ))}

      {isPopupOpen && selectedUser && (
        <Popup
          selectedUser={selectedUser}
          closePopup={closePopup}
          saveChanges={saveChanges}
        />
      )}

      {isDeletePopupOpen && selectedUser && (
        <DeleteConfirmationPopup
          closePopup={closeDeletePopup}
          confirmDelete={confirmDelete}
        />
      )}
    </div>
  );
};

export default UsersC;
