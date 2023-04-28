import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.fLists}>
        <ul className={styles.fList}>
          <li className={styles.fListItem}>Countries</li>
          <li className={styles.fListItem}>Regions</li>
          <li className={styles.fListItem}>Cities</li>
          <li className={styles.fListItem}>Districts</li>
          <li className={styles.fListItem}>Airports</li>
          <li className={styles.fListItem}>Hotels</li>
        </ul>
        <ul className={styles.fList}>
          <li className={styles.fListItem}>Homes </li>
          <li className={styles.fListItem}>Apartments </li>
          <li className={styles.fListItem}>Resorts </li>
          <li className={styles.fListItem}>Villas</li>
          <li className={styles.fListItem}>Hostels</li>
          <li className={styles.fListItem}>Guest houses</li>
        </ul>
        <ul className={styles.fList}>
          <li className={styles.fListItem}>Unique places to stay </li>
          <li className={styles.fListItem}>Reviews</li>
          <li className={styles.fListItem}>Unpacked: Travel articles </li>
          <li className={styles.fListItem}>Travel communities </li>
          <li className={styles.fListItem}>Seasonal and holiday deals </li>
        </ul>
        <ul className={styles.fList}>
          <li className={styles.fListItem}>Car rental </li>
          <li className={styles.fListItem}>Flight Finder</li>
          <li className={styles.fListItem}>Restaurant reservations </li>
          <li className={styles.fListItem}>Travel Agents </li>
        </ul>
        <ul className={styles.fList}>
          <li className={styles.fListItem}>Curtomer Service</li>
          <li className={styles.fListItem}>Partner Help</li>
          <li className={styles.fListItem}>Careers</li>
          <li className={styles.fListItem}>Sustainability</li>
          <li className={styles.fListItem}>Press center</li>
          <li className={styles.fListItem}>Safety Resource Center</li>
          <li className={styles.fListItem}>Investor relations</li>
          <li className={styles.fListItem}>Terms & conditions</li>
        </ul>
      </div>
      <div className={styles.fText}>Copyright © 2023.</div>
    </div>
  );
};

export default Footer;