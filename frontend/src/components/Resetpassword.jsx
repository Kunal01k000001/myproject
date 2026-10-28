import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams(); // URL bar se :token pakad lega
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setIsError(true);
      setMessage('Both passwords do not match');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, {
        newPassword,
      });

      setIsError(false);
      setMessage(res.data.message || 'Password reset successfully! Redirecting...');

      // 2 second baad login page par bhej do
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setIsError(true);
      setMessage(err.response?.data?.message || 'Link is invalid or has expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '380px', margin: '70px auto', padding: '24px', textAlign: 'center', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
      <h2>Set New Password</h2>
      <p style={{ color: '#64748b', fontSize: '14px' }}>Enter your new password below.</p>

      {message && (
        <p style={{ color: isError ? '#ef4444' : '#10b981', fontWeight: 'bold' }}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ textAlign: 'left', marginTop: '16px' }}>
        <div style={{ marginBottom: '14px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600' }}>New Password</label>
          <input
            type="password"
            placeholder="At least 6 characters"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginTop: '4px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '18px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600' }}>Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginTop: '4px', boxSizing: 'border-box' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: '10px', backgroundColor: '#0284c7', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          {loading ? 'Updating Password...' : 'Save Password'}
        </button>
      </form>

      <p style={{ marginTop: '16px' }}>
        <Link to="/login" style={{ color: '#0284c7', textDecoration: 'none' }}>Back to Login</Link>
      </p>
    </div>
  );
};

export default ResetPassword;