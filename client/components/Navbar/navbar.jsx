import styles from "./navbar.module.css"

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navContainer}>
        <span className={styles.logo}>ShareEstate</span>
        <div className={styles.navItems}>
          <button className={styles.navButton}>Register</button>
          <button className={styles.navButton}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar