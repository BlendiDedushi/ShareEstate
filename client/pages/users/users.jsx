import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../pages/style/users.module.css";
import { useCookies } from "react-cookie";

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

const Popup = ({ selectedUser, setSelectedUser, closePopup, saveChanges }) => {
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

const UsersC = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [cookies] = useCookies(["token"]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [filterRole, setFilterRole] = useState("");
  const [searchUsername, setSearchUsername] = useState("");
  const [sortBy, setSortBy] = useState("asc");

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    applyFilters();
    setFilteredUsers(prevFilteredUsers => {
      const sortedUsers = [...prevFilteredUsers];
      sortedUsers.sort((a, b) => a.username.localeCompare(b.username));
      return sortedUsers;
    });
  
    setSortBy("asc");
  }, [users, filterRole, searchUsername]);

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

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== selectedUser.id)
      );

      closeDeletePopup();

      console.log("User deleted successfully.");
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
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
      await axios.put(
        `http://localhost:8900/api/users/${selectedUser.id}`,
        selectedUser,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? selectedUser : user
        )
      );

      closePopup();

      console.log("User updated successfully.");
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const applyFilters = () => {
    let filteredUsers = users;

    if (filterRole !== "") {
      filteredUsers = filteredUsers.filter((user) => user.role === filterRole);
    }

    if (searchUsername !== "") {
      filteredUsers = filteredUsers.filter((user) =>
        user.username.toLowerCase().includes(searchUsername.toLowerCase())
      );
    }

    setFilteredUsers(filteredUsers);
  };

  const toggleSortOrder = () => {
    setFilteredUsers((prevFilteredUsers) => {
      const sortedUsers = [...prevFilteredUsers];
      if (sortBy === "asc") {
        sortedUsers.sort((a, b) => b.username.localeCompare(a.username));
      } else if (sortBy === "desc") {
        sortedUsers.sort((a, b) => a.username.localeCompare(b.username));
      }
      return sortedUsers;
    });

    setSortBy((prevSortBy) => (prevSortBy === "asc" ? "desc" : "asc"));
  };

  return (
    <div>
      <div className={styles.filtr}>
        <button onClick={toggleSortOrder}>
          Sort: ({sortBy === "desc" ? "A-Z" : "Z-A"})
        </button>
        <div>
          <label>Search by username: </label>
          <input
            type="text"
            value={searchUsername}
            onChange={(e) => setSearchUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Filter by role: </label>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="agent">Agent</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      {filteredUsers.map((user) => (
        <div key={user.id} className={styles.userss}>
          <div className={styles.userD}>
            <span>
              Username: <b>{user.username}</b>
            </span>
            <span>
            Email: <b>{user.email}</b>
          </span>
            <span>
              Role:
              <span>
                <b>{user.role}</b>
              </span>
            </span>
            <span>
              Lat: 
              <span>
                <b>{user.latitude}</b>
              </span>
            </span>
            <span>
              Long: 
              <span>
                <b>{user.longitude}</b>
              </span>
            </span>
          </div>
          <div className={styles.userbtnn}>
            <button onClick={() => handleEdit(user.id)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </div>
        </div>
      ))}

      {isPopupOpen && (
        <Popup
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          closePopup={closePopup}
          saveChanges={saveChanges}
        />
      )}

      {isDeletePopupOpen && (
        <DeleteConfirmationPopup
          closePopup={closeDeletePopup}
          confirmDelete={confirmDelete}
        />
      )}
    </div>
  );
};

export default UsersC;
