import React, { useState } from "react";
import styles from "../components/Navbar/navbar.module.css";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setLatitude(42.6629);
      setLongitude(21.1655);
    }
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateForm = () => {
    let isValid = true;

    if (username.trim() === "") {
      setUsernameError("Please enter a username.");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (email.trim() === "") {
      setEmailError("Please enter an email.");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.trim() === "") {
      setPasswordError("Please enter a password.");
      isValid = false;
    } else if (password.length < 5) {
      setPasswordError("Password should be at least 5 characters long.");
      isValid = false;
    } else if (!hasUppercaseLetter(password)) {
      setPasswordError("Password should contain at least 1 uppercase letter.");
      isValid = false;
    } else if (!hasSymbol(password)) {
      setPasswordError("Password should contain at least 1 symbol.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const hasUppercaseLetter = (password) => {
    const uppercaseRegex = /[A-Z]/;
    return uppercaseRegex.test(password);
  };

  const hasSymbol = (password) => {
    const symbolRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    return symbolRegex.test(password);
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }
  
    try {
      await axios.post("http://localhost:8900/api/auth/register", {
        username: username,
        email: email,
        password: password,
        latitude: latitude,
        longitude: longitude, 
      });
  
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
        {usernameError && <p className={styles.error}>{usernameError}</p>}
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
        {emailError && <p className={styles.error}>{emailError}</p>}
      </div>
      <div className={styles.formGroup}>
        <input
          type="password"
          id="registerPassword"
          value={password}
          onChange={handlePasswordChange}
          className={styles.inputField}
          placeholder=" "
        />
        <label htmlFor="registerPassword" className={styles.label}>
          Password
        </label>
        {passwordError && <p className={styles.error}>{passwordError}</p>}
      </div>
      <button className={styles.signupButton} onClick={handleRegister}>
        Sign Up
      </button>
      <div>
        <span className={styles.cond}>
        <small>• Password should be at least 5 characters long.</small>
        <small>• Password should contain at least 1 uppercase letter.</small>
        <small>• Password should contain at least 1 symbol .</small>
        </span>
      </div>
    </div>
  );
};

export default Register;
