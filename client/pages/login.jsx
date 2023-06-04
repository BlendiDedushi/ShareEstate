import React, {useState} from "react";
import styles from "../components/Navbar/navbar.module.css";
import axios from "axios";
import {useCookies} from "react-cookie";
import {useRouter} from "next/router";
import Link from "next/link";

const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies(['token']);

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
        await axios
            .post("http://localhost:8900/api/auth/login", {
                username: username,
                email: email,
                password: password,
            })
            .then((res) => {
                router.push("/");
                setCookie('token', res.data.token, {path: '/'});
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className={styles.modalContent}>
            <h2>Login Form</h2>
            <br></br>
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

            <button className={styles.loginButton} onClick={handleLogin}>
                Login
            </button>
            <Link href="/registration" className='mt-[15px] text-[14px] text-[#135de3] underline'>You don't have an account? Create a new one</Link>
        </div>
    );
};

export default Login;
