import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Loginform.css';

const Loginform = () => {
  const [pageLoading, setPageLoading] = useState(true);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const res = await axios.post('https://myproject-nl8l.onrender.com/api/auth/login', formData);

      const token = res.data.data?.token;
      const user = res.data.data?.user; // 👈 user ko define kiya

      if (token && user) {
        // 1. LocalStorage me save kiya
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        setIsError(false);
        setMessage(res.data.message || 'Login successful! Redirecting...');

        // 2. Form reset
        setFormData({
          email: '',
          password: '',
        });

        // 3. Role check karke 1.5 second baad sahi page par redirect
        setTimeout(() => {
          if (user.role === 'admin') {
            navigate('/adminmessage'); // 👈 Admin seedha yahan jayega
          } else {
            navigate('/'); // 👈 Normal user home par jayega
          }
        }, 1500);
      }
    } catch (err) {
      setIsError(true);
      setMessage(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="custom-loader-wrapper">
        <div className="loader-container">
          <div className="loader-ring"></div>
          <div className="loader-core"></div>
        </div>
        <p className="loader-text">Securing your session...</p>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-4 login-page-wrapper">
      <div className="col-11 col-sm-9 col-md-6 col-lg-4 mx-auto animate-form-entry">
        <div className="card login-form-box border-0 shadow">
          <div className="card-body p-4 p-md-5">
            <h2 className="text-center mb-4 fw-bold">Login</h2>

            {message && (
              <div
                className={`alert ${isError ? 'alert-danger' : 'alert-success'} text-center py-2`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label login-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control login-input"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label login-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control login-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
                <Link to="/forgot-password" className="text-decoration-none small">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="btn w-100 login-submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <p className="text-center mt-3 mb-0 login-label">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="login-link fw-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginform;