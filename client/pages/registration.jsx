import React,{useState} from "react";
import styles from "../components/Navbar/navbar.module.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
 
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };


  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    // Perform registration logic here
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    // Add your registration logic or API call here
    // Reset the form if needed
    setUsername("");
    setEmail("");
    setPassword("");
    setIsRegisterModalOpen(false);
  };
  
    return ( 
        <div className={styles.modalContent}>
          <h2>Register Form</h2>
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
          <button className={styles.signupButton} onClick={handleRegister}>
            Sign Up
          </button>
        </div>
     );
}
 
export default Register;
