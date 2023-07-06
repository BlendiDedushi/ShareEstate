import React from "react";
import styles from "./DeleteConfirmationPopup.module.css";

const DeleteConfirmationPopup = ({ estateName, onCancel, onConfirm }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete the estate: <br /> <b>{estateName}</b>?</p>
        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationPopup;
