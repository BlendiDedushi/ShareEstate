import { useState } from "react";
import Modal from "react-modal";
import styles from "./navbar.module.css";
import Link from "next/link";

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
          <Link href={'/registration'}>
            <button className={styles.navButton}>
              Register
            </button>
          </Link>
          <Link href={'/login'}>
            <button className={styles.navButton}>
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
