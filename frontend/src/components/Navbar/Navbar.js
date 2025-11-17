import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../logo.svg'; // CORRECTED PATH: Trying one more level up to resolve compilation
import './Navbar.css';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.setAttribute('data-theme', 'light');
    }

    // Check for logged in user
    const checkUser = () => {
      const userData = sessionStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    };

    checkUser();

    // Listen for login events
    const handleUserLogin = () => {
      checkUser();
    };

    window.addEventListener('userLogin', handleUserLogin);

    return () => {
      window.removeEventListener('userLogin', handleUserLogin);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo-group">
        <Link to="/" className="navbar-brand-link">
          {/* <img
            src={logo}
            alt="Assessify Logo"
            className="navbar-logo-img"
          /> */}
          <span className="navbar-brand-text">
            Assessify
          </span>
        </Link>
      </div>
      <div className="navbar-right">
        <ul className="navbar-links">
          <li>
              <Link to="/" className="nav-link">Home</Link>
          </li>
          {user && user.role === 'student' && (
            <li>
              <Link to="/Student" className="nav-link">Student Portal</Link>
            </li>
          )}
          {user && user.role === 'faculty' && (
            <li>
              <Link to="/teacher" className="nav-link">Faculty Dashboard</Link>
            </li>
          )}
          {user && user.role === 'admin' && (
            <li>
              <Link to="/admin" className="nav-link">Admin Portal</Link>
            </li>
          )}
          {!user && (
            <>
              <li>
                <Link to="/quizes" className="nav-link">Learning Resources</Link>
              </li>
            </>
          )}
        </ul>

        {user ? (
          <div className="user-section">
            <span className="user-name">Welcome, {user.name}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="auth-link">Login</Link>
            <Link to="/signup" className="auth-link signup-link">Sign Up</Link>
          </div>
        )}

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
