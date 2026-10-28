import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Registrationform.css';

const Registrationform = () => {
  // Page load animation ke liye state
  const [pageLoading, setPageLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    tick: false,
  });

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Page open hote hi initial animation chalaane ke liye (1.8 second)
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  // Input change handle karne ke liye
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Form submit karne ke liye
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const res = await axios.post('https://myproject-nl8l.onrender.com/api/auth/register', formData);
      setIsError(false);
      setMessage(res.data.message || 'Registration successful! Redirecting to login...');

      // Form reset
      setFormData({
        name: '',
        email: '',
        password: '',
        tick: false,
      });

      // Successful registration ke baad Login page par redirect
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setIsError(true);
      setMessage(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // 1. Initial Page Loading Screen (Mast glow pulse + rotating ring effect)
  if (pageLoading) {
    return (
      <div className="custom-loader-wrapper">
        <div className="loader-container">
          <div className="loader-ring"></div>
          <div className="loader-core"></div>
        </div>
        <p className="loader-text">Preparing your portal...</p>
      </div>
    );
  }

  // 2. Main Form (Smooth Fade-in Animation ke sath open hoga)
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-4 register-page-wrapper">
      <div className="col-11 col-sm-9 col-md-6 col-lg-4 mx-auto animate-form-entry">
        <div className="card register-form-box border-0 shadow">
          <div className="card-body p-4 p-md-5">
            <h2 className="text-center mb-4 fw-bold">Register</h2>

            {message && (
              <div
                className={`alert ${isError ? 'alert-danger' : 'alert-success'} text-center py-2`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label register-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control register-input"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label register-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control register-input"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label register-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control register-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  name="tick"
                  id="tick"
                  className="form-check-input"
                  checked={formData.tick}
                  onChange={handleChange}
                  disabled={loading}
                />
                <label className="form-check-label register-label" htmlFor="tick">
                  I agree to the terms (Tick)
                </label>
              </div>

              <button
                type="submit"
                className="btn w-100 register-submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Signing Up...
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            </form>

            <p className="text-center mt-3 mb-0 register-label">
              Already have an account?{' '}
              <Link to="/login" className="register-link fw-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registrationform;