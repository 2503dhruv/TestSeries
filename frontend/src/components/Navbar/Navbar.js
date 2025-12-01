import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Login from '../Login';
import logo from '../../logo.svg';
import './Navbar.css';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.setAttribute('data-theme', 'light');
    }

    const checkUser = () => {
      const userData = sessionStorage.getItem('user');
      setUser(userData ? JSON.parse(userData) : null);
    };

    checkUser();

    window.addEventListener('userLogin', checkUser);
    return () => window.removeEventListener('userLogin', checkUser);
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

      {/* LEFT: LOGO */}
      <div className="navbar-logo-group">
        <Link to="/" className="navbar-brand-link">
          <span className="navbar-brand-text">Assessify</span>
        </Link>
      </div>

      {/* CENTER: LINKS */}
      <div className="navbar-center">
        <ul className="navbar-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/about" className="nav-link">About</Link></li>

          {/* Role-based nav items SHOULD BE HERE */}
          {user?.role === 'student' && (
            <li><Link to="/Student" className="nav-link">Student Portal</Link></li>
          )}

          {user?.role === 'faculty' && (
            <li><Link to="/teacher" className="nav-link">Faculty Portal</Link></li>
          )}

          {user?.role === 'admin' && (
            <li><Link to="/admin" className="nav-link">Admin Portal</Link></li>
          )}
        </ul>
      </div>

      {/* RIGHT: LOGIN / LOGOUT */}
      <div className="navbar-right">
        {user ? (
          <div className="user-section">
            <span className="user-name">Welcome, {user.name}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="auth-links">
            {location.pathname === '/' ? (
              <button
                className="auth-link"
                onClick={() => setShowLoginModal(true)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Login
              </button>
            ) : (
              <Link to="/login" className="auth-link">Login</Link>
            )}
          </div>
        )}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <>
          <div className="blur-overlay" onClick={() => setShowLoginModal(false)}></div>
          <div className="login-modal">
            <Login onClose={() => setShowLoginModal(false)} />
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
