import React, {useState} from "react";
import styles from "../components/Navbar/navbar.module.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const handleUsernameChange = (e) => {
      setUsername(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
    
    const handleLogin = () => {
      // Perform login logic here
      console.log("Username:", username);
      console.log("Password:", password);
      // Add your login logic or API call here
      // Reset the form if needed
      setUsername("");
      setPassword("");
      setIsLoginModalOpen(false);
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
        </div>
     );
}
 
export default Login;