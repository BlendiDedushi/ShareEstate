import {useEffect, useState} from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import {useCookies} from "react-cookie";
import { useRouter } from "next/router";


const Navbar = () => {
  const [cookie, setCookie, removeCookie] = useCookies(['token']);
  const [token, setToken] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (cookie.token) {
      setToken(true);
    }
  },[])

  const logout = () => {
    removeCookie('token');
    setToken(false);
    router.push("/");
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link href={"/"}>
          <div className="flex items-center gap-x-[20px]">
            <Image alt={'logo'} src="/images/case-logo.svg" width={60} height={60} />
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
        {!token &&
          <div className={styles.navItems}>
            <Link href={"/registration"}>
              <button className={styles.navButton}>Register</button>
            </Link>
            <Link href={"/login"}>
              <button className={styles.navButton}>Login</button>
            </Link>
          </div>
        }
      </div>
      {token &&
      <div>
        <Link href={"/AgentDashboard"}>
              <button className={styles.navButton}>MyProfile</button>
        </Link>
        <button className={styles.navButton} onClick={logout}>
            Logout
        </button>
      </div>
      }
    </div>
  );
};

export default Navbar;
