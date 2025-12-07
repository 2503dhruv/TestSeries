import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';
import './Login.css';

const Login = ({ onClose }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ------- PURE JAVASCRIPT SHOW/HIDE PASSWORD ----------
  const togglePassword = () => {
    const pwd = document.getElementById("password");
    const icon = document.getElementById("toggleIcon");

    if (pwd.type === "password") {
      pwd.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      pwd.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  };
  // -----------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isSignup ? '/auth/register' : '/auth/login';
      const response = await API.post(endpoint, formData);

      if (isSignup) {
        // For signup, just show success and switch to login
        setError('');
        setIsSignup(false);
        setFormData({
          name: '',
          email: '',
          password: '',
          role: 'student'
        });
      } else {
        // For login, store token and user data, then close modal
        const { token, user } = response.data;
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
        window.dispatchEvent(new Event('userLogin'));
        navigate('/');
        onClose(); // Close the modal
      }
    } catch (err) {
      setError(err.response?.data?.message || (isSignup ? 'Signup failed' : 'Login failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>

        <form onSubmit={handleSubmit}>
          {/* Name field for signup */}
          {isSignup && (
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>

            <div className="password-wrapper">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <i
                id="toggleIcon"
                className="fa fa-eye toggle-password"
                onClick={togglePassword}
              ></i>
            </div>
          </div>

          {/* Role selection for signup */}
          {isSignup && (
            <div className="form-group">
              <label>Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="student">Student</option>
                
              </select>
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? (isSignup ? 'Signing up...' : 'Logging in...') : (isSignup ? 'Sign Up' : 'Login')}
          </button>
        </form>

        <div className="auth-links">
          <p>
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => {
                setIsSignup(!isSignup);
                setError(''); // Clear any errors when switching
                setFormData({
                  name: '',
                  email: '',
                  password: '',
                  role: 'student'
                });
              }}
              style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
            >
              {isSignup ? 'Login' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
