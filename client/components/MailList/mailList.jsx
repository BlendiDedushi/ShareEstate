import styles from "./mailList.module.css";

const MailList = () => {
  return (
    <div className={styles.mail}>
      <div className={styles.mailContent}>
        <div className={styles.mailLeft}>
          <h1 className={styles.mailTitle}>Save time, save money!</h1>
          <span className={styles.mailDesc}>
            Sign up and we'll send the best deals to you
          </span>
        </div>
        <div className={styles.mailRight}>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.socialIcon}>
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className={styles.socialIcon}>
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className={styles.socialIcon}>
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <div className={styles.mailInputContainer}>
            <input type="text" placeholder="Your Email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailList;
