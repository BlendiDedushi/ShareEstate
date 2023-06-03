import { useState } from "react";
import Modal from "react-modal";
import styles from "./navbar.module.css";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link href={"/"}>
          <div className="flex items-center gap-x-[20px]">
            <Image src="/images/case-logo.svg" width={60} height={60} />
            <span className="text-[20px] font-semibold text-[#333333]">
              ShareEstate
            </span>
          </div>
        </Link>
        <div>
          <Link href="/allEstates">
            <button className={styles.navButton}>AllEstates</button>
          </Link>
          <Link href="/eByCity">
            <button className={styles.navButton}>EstatesByCity</button>
          </Link>
        </div>
        <div className={styles.navItems}>
          <Link href={"/registration"}>
            <button className={styles.navButton}>Register</button>
          </Link>
          <Link href={"/login"}>
            <button className={styles.navButton}>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
