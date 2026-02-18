import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../Register/Register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import image from '../Register/1.jpg';

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });

  const navigate = useNavigate();

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      showNotification("Please fill in all fields!", "error");
      return;
    }

    if (password !== confirmPassword) {
      showNotification("Passwords do not match!", "error");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { username, email, password });
      showNotification("Registration successful! Redirecting to login...", "success");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        showNotification("Email already exists!", "error");
      } else {
        showNotification("Something went wrong!", "error");
      }
    }
  };

  useEffect(() => {
    document.title = "Register page";
  }, []);

  return (
    <div className={styles.overallBox}>
     
      {notification.message && (
        <div className={`${styles.notification} ${notification.type === "error" ? styles.error : styles.success}`}>
          {notification.message}
        </div>
      )}

      <div className={styles.Container}>
        <div className={styles.writings}>
          <h2>WELCOME TO NEXTMOVE</h2>
        </div>
        <img src={image} alt="Slide 1" />
      </div>

      <div className={styles.loginContent}>
        <h2>Register here</h2>

        <form onSubmit={handleRegister}>
          <div className={styles.name}>
            <label>Name</label>
            <input
              type="text"
              placeholder="john"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className={styles.email}>
            <label>Email</label>
            <input
              type="email"
              placeholder="abc@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.password}>
            <label>Password</label>
            <input
              type="password"
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.password}>
            <label>Confirm password</label>
            <input
              type="password"
              placeholder="**********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button className={styles.loginBtn} type="submit">
            Register
          </button>

          <p className={styles.register}>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
