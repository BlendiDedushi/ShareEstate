import { useState } from "react";
import Modal from "react-modal";
import styles from "./navbar.module.css";

const Navbar = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleRegisterClick = () => {
    setIsRegisterModalOpen(true);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    // Perform registration logic here
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    // Add your registration logic or API call here
    // Reset the form if needed
    setUsername("");
    setEmail("");
    setPassword("");
    setIsRegisterModalOpen(false);
  };
  
  const handleLogin = () => {
    // Perform login logic here
    console.log("Username:", username);
    console.log("Password:", password);
    // Add your login logic or API call here
    // Reset the form if needed
    setUsername("");
    setPassword("");
    setIsLoginModalOpen(false);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navContainer}>
        <span className={styles.logo}>ShareEstate</span>
        <div className={styles.navItems}>
          <button className={styles.navButton} onClick={handleRegisterClick}>
            Register
          </button>
          <button className={styles.navButton} onClick={handleLoginClick}>
            Login
          </button>
        </div>
      </div>
      <Modal
        isOpen={isRegisterModalOpen}
        onRequestClose={handleCloseRegisterModal}
        className={styles.modal}
        overlayClassName={styles.modalOverlay}
      >
        <div className={styles.modalContent}>
          <h2>Register Form</h2>
          <br></br>
          <div className={styles.formGroup}>
            <input
              type="text"
               id="registerUsername"
               value={username}
                  onChange={handleUsernameChange}
                   className={styles.inputField}
                   placeholder=" "
             />
             <label htmlFor="registerUsername" className={styles.label}>
                Username
              </label>
        </div>
        <div className={styles.formGroup}>
            <input
              type="text"
               id="registerEmail"
               value={email}
                  onChange={handleEmailChange}
                   className={styles.inputField}
                   placeholder=" "
             />
             <label htmlFor="registerEmail" className={styles.label}>
                Email
              </label>
        </div>
        <div className={styles.formGroup}>
            <input
              type="text"
               id="registerPassword"
               value={password}
                  onChange={handlePasswordChange}
                   className={styles.inputField}
                   placeholder=" "
             />
             <label htmlFor="registerPassword" className={styles.label}>
                Password
              </label>
        </div>

         
          <button className={styles.signupButton} onClick={handleRegister}>
            Sign Up
          </button>
          <button className={styles.closeButton} onClick={handleCloseRegisterModal}>
            Close
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={handleCloseLoginModal}
        className={styles.modal}
        overlayClassName={styles.modalOverlay}
      >
        <div className={styles.modalContent}>
          <h2>Login Form</h2>
          <br></br>
          <div className={styles.formGroup}>
            <input
              type="text"
               id="registerUsername"
               value={username}
                  onChange={handleUsernameChange}
                   className={styles.inputField}
                   placeholder=" "
             />
             <label htmlFor="registerUsername" className={styles.label}>
                Username
              </label>
        </div>
        <div className={styles.formGroup}>
            <input
              type="text"
               id="registerPassword"
               value={password}
                  onChange={handlePasswordChange}
                   className={styles.inputField}
                   placeholder=" "
             />
             <label htmlFor="registerPassword" className={styles.label}>
                Password
              </label>
        </div>

          <button className={styles.loginButton} onClick={handleLogin}>
            Login
          </button>
          <button className={styles.closeButton} onClick={handleCloseLoginModal}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;
