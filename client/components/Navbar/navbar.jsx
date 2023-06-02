import { useState } from "react";
import Modal from "react-modal";
import styles from "./navbar.module.css";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className="flex items-center gap-x-[20px]">
          <Image src='/images/case-logo.svg' width={60} height={60}/>
          <span className='text-[20px] font-semibold text-[#333333]'>ShareEstate</span>
        </div>
        <div>
        <Link href={'/FeaturedPropertiesPage'}>
            <button className={styles.navButton}>
              All Estates
            </button>
          </Link>
        </div>
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
