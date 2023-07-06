import React from "react";
import styles from "./ErrorPopup.module.css";

const ErrorPopup = ({ onClose }) => {
  return (
    <div className={styles.popupContainer}>
      <div className={styles.popup}>
        <span>Error creating estate. Please try again.</span>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup;
