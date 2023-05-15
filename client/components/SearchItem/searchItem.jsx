import styles from "./searchItem.module.css";

const SearchItem = () => {
  return (
    <div className={styles.searchItem}>
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        alt=""
        className={styles.siImg}
      />
      <div className={styles.siDesc}>
        <h1 className={styles.siTitle}>Tower Street Apartments</h1>
        <span className={styles.siDistance}>500m from center</span>
        <span className={styles.siTaxiOp}>Free airport taxi</span>
        <span className={styles.siSubtitle}>
          Studio Apartment with Air conditioning
        </span>
        <span className={styles.siFeatures}>
          Entire studio • 1 bathroom • 21m² 1 full bed
        </span>
        <span className={styles.siCancelOp}>Free cancellation </span>
        <span className={styles.siCancelOpSubtitle}>
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className={styles.siDetails}>
          <div className={styles.siRating}>
          <span>Excellent</span>
          <button>8.9</button>
        </div>
        <div className={styles.siDetailTexts}>
          <span className={styles.siPrice}>$112</span>
          <span className={styles.siTaxOp}>Includes taxes and fees</span>
          <button className={styles.siCheckButton}>See availability</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
