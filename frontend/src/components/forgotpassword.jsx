// src/components/ForgotPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const res = await axios.post('https://myproject-nl8l.onrender.com/api/auth/forgot-password', {
        email,
      });

      setIsError(false);
      setMessage(res.data.message || 'Password reset link sent to your email!');
      setEmail('');
    } catch (err) {
      setIsError(true);
      setMessage(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-wrapper">
      <div className="forgot-password-card">
        <div className="card-header-icon">
          <span>🔒</span>
        </div>

        <h2 className="title">Forgot Password?</h2>
        <p className="subtitle">
          No worries, enter your registered email address and we will send you a reset link.
        </p>

        {message && (
          <div className={`status-alert ${isError ? 'alert-danger' : 'alert-success'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="forgot-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="e.g. name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <span className="spinner-wrap">
                <span className="spinner"></span>
                Sending Link...
              </span>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        <div className="back-to-login">
          <Link to="/login">← Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;