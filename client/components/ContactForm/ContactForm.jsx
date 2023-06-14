import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaComment } from 'react-icons/fa';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handlePhoneChange = (e) => {
    // Remove any non-digit characters from the input value
    const sanitizedValue = e.target.value.replace(/\D/g, '');
    setPhone(sanitizedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission here
    // You can access the form field values using the state variables (name, email, phone, message)
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Message:', message);


  };

  return (
    <div className={styles['contact-form']}>
    <img
      src="https://static.vecteezy.com/system/resources/previews/008/470/319/original/envelope-anime-cute-character-cartoon-model-emotion-illustration-clipart-drawing-kawaii-manga-design-idea-art-free-png.png"
      alt="Envelope"
      className={styles['image']}
    />
    <div className={styles['form-container']}>
      <h2 className={`${styles['fade-in']}`}>Contact Form</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
        <FaUser className={`${styles['input-icon']} ${styles['fade-in']} ${styles['icon-animation']}`} />
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles['form-group']}>
        <FaEnvelope className={`${styles['input-icon']} ${styles['fade-in']} ${styles['icon-animation']}`} />
          <input
            type="email"
            id="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles['form-group']}>
        <FaPhone className={`${styles['input-icon']} ${styles['fade-in']} ${styles['icon-animation']}`} />
          <input
            type="tel"
            id="phone"
            placeholder="Your Phone"
            value={phone}
            onChange={handlePhoneChange} // Use the custom event handler for phone input
            required
          />
        </div>
        <div className={styles['form-group']}>
        <FaComment className={`${styles['input-icon']} ${styles['fade-in']} ${styles['icon-animation']}`} />
          <textarea
            id="message"
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
          <div className={styles['form-group']}>
           <button type="submit" className={styles['submit-button']}>
             Submit
           </button> 
          </div>
        
      </form>
    </div>
    </div>
  );
};

export default ContactForm;
