import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaComment } from "react-icons/fa";
import styles from "./ContactForm.module.css";
import axios from "axios";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handlePhoneChange = (e) => {
    const sanitizedValue = e.target.value.replace(/\D/g, "");
    setPhone(sanitizedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(`http://localhost:8900/api/contact/`, {
        name,
        email,
        phone,
        subject,
        message,
      });

      setSuccessMessage(response.data.message);
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");

      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Something went wrong while sending the message.");
      }

      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <div className={styles["contact-form-container"]}>
      <img
        src="https://brokerpublicportal.com/wp-content/uploads/2020/08/hero-houses-blue-1.jpg"
        alt="Header"
        className={styles["header-image"]}
      />
      <div className={styles["form-container"]}>
        <h2 className={styles["fade-in"]}>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <FaUser className={styles["input-icon"]} />
          </div>
          <div className={styles["form-group"]}>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FaEnvelope className={styles["input-icon"]} />
          </div>
          <div className={styles["form-group"]}>
            <input
              type="tel"
              id="phone"
              placeholder="Your Phone"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
            <FaPhone className={styles["input-icon"]} />
          </div>
          <div className={styles["form-group"]}>
            <input
              id="subject"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            ></input>
            <FaComment className={styles["input-icon"]} />
          </div>
          <div className={styles["form-group"]}>
            <textarea
              id="message"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
            <FaComment className={styles["input-icon"]} />
          </div>
          {errorMessage && (
            <div className={styles["error-message"]}>{errorMessage}</div>
          )}
          {successMessage && (
            <div className={styles["success-message"]}>{successMessage}</div>
          )}
          <div className={styles["form-group"]}>
            <button type="submit" className={styles["submit-button"]}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
