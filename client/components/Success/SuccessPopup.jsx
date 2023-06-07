import React from "react";
import styles from "./SuccessPopup.module.css";

const SuccessPopup = ({ onClose }) => {
  return (
    <div className={styles.popupContainer}>
      <div className={styles.popup}>
        <span>Estate created successfully!</span>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
