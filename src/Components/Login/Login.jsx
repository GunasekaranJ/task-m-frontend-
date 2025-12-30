import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import image from '../Login/3327598.jpg';
import image1 from '../Login/4904575.jpg';
import logo from './logo.jpg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('Please fill in all fields!');
      setMessageType('error');
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      setMessage('Login successful!');
      setMessageType('success');
      setTimeout(() => navigate('/todo'), 1000); 
    } catch (err) {
      setMessage('Invalid credentials!');
      setMessageType('error');
    }
  };

  // Auto-hide notification after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    document.title = 'Login page';
    window.scrollTo(0, 0);
  }, []);
       console.log(import.meta.env.VITE_API_URL);

  return (
    <>

      <header>
        <h2>WELCOME BACK!</h2>
      </header>
      <main>
        <div className={styles.contentBox}>
          <div className={styles.imageContent}>
            <img src={image} alt="Productivity" />
          </div>

          <div className={styles.loginContent}>
            <div className={styles.logoContainer}>
              <img src={logo} alt="logo" />
            </div>

            <form onSubmit={handleLogin}>
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

              <p className={styles.forgot}>Forgot your password?</p>

              <button className={styles.loginBtn} type="submit">
                Login
              </button>

              {message && (
                <div className={`${styles.notification} ${messageType === 'error' ? styles.error : styles.success}`}>
                  {message}
                </div>
              )}

              <p className={styles.register}>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </form>
          </div>

          <div className={styles.imageContent1}>
            <img src={image1} alt="Productivity" />
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
