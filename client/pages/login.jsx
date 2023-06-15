import React, { useState } from "react";
import styles from "../components/Navbar/navbar.module.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    try {
      window.location.href = "http://localhost:8900/api/auth/google";
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8900/api/auth/login", {
        username: username,
        email: email,
        password: password,
      });

      router.push("/");
      setCookie("token", res.data.token, { path: "/" });
    } catch (error) {
      setError("Something went wrong. Please check your credentials and try again.");
      console.log(error);
    }
  };

  return (
    <div className={styles.modalContent}>
      <h2>Login Form</h2>
      <br />
      <div className={styles.formGroup}>
        <input
          type="text"
          id="registerUsername"
          value={username}
          onChange={handleUsernameChange}
          className={styles.inputField}
          placeholder=" "
        />
        <label htmlFor="registerUsername" className={styles.label}>
          Username
        </label>
      </div>
      <div className={styles.formGroup}>
        <input
          type="text"
          id="registerEmail"
          value={email}
          onChange={handleEmailChange}
          className={styles.inputField}
          placeholder=" "
        />
        <label htmlFor="registerEmail" className={styles.label}>
          Email
        </label>
      </div>
      <div className={styles.formGroup}>
        <input
          type="password"
          id="registerPassword"
          value={password}
          onChange={handlePasswordChange}
          className={styles.inputField}
          placeholder=" "
        />
        <label htmlFor="registerPassword" className={styles.label}>
          Password
        </label>
      </div>
      <Link href="/forget-password" className="mt-[10px] text-[14px] text-[#135de3] underline">
        Forget password?
      </Link>

      <button className={styles.loginButton} onClick={handleLogin}>
        Login
      </button>

      <button className={`${styles.loginButton} bg-[#fff] text-[#1a1a1a] flex justify-center`} onClick={handleGoogleLogin}>
        <img alt={"google logo"} className={"w-[20px] mr-[10px]"} src={"/images/Google__G__Logo.svg.png"} /> Login with
        Google
      </button>
      <Link href="/registration" className="mt-[15px] text-[14px] text-[#135de3] underline">
        You don't have an account? Create a new one
      </Link>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Login;
