import React, { useEffect, useState } from 'react';
import './AdminMessage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Adminmessage = () => {
  const [messages, setMessages] = useState([]);
  const [isAdminVerified, setIsAdminVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Agar token hi nahi mila to login page par bhej do
    if (!token) {
      navigate('/login');
      return;
    }

    const checkAdminAndFetchData = async () => {
      try {
        // STEP A: Backend me verify karo ki user sach me admin hai
        await axios.get('https://myproject-nl8l.onrender.com/api/auth/admin-check', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Backend ne verify kar diya
        setIsAdminVerified(true);

        // STEP B: Ab saare messages fetch karo
        const res = await axios.get('https://myproject-nl8l.onrender.com/api/auth/admin/all-messages', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMessages(res.data.data || []);
      } catch (err) {
        // Agar backend ne 401 ya 403 feka (matlab admin nahi hai)
        setError(err.response?.data?.message || 'Access Denied: Admins only');
        setTimeout(() => {
          navigate('/'); // Normal user ko home par redirect kar do
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    checkAdminAndFetchData();
  }, [navigate]);

  // Loading state
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary me-2" role="status"></div>
        <span>Verifying Admin Access...</span>
      </div>
    );
  }

  // Agar user admin nahi hai
  if (!isAdminVerified) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger">{error}</div>
        <p>Redirecting to home page...</p>
      </div>
    );
  }

  // Admin verified hone par table render hoga
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Panel - All Messages</h2>
        <span className="badge bg-success p-2">Admin Verified</span>
      </div>

      {messages.length === 0 ? (
        <div className="alert alert-info">Koi messages nahi mile.</div>
      ) : (
        <div className="table-responsive shadow-sm rounded border">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>User ID</th>
                <th>Sender Name</th>
                <th>Sender Email</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((item) => (
                <tr key={item._id}>
                  {/* User ki ObjectId */}
                  <td className="small text-muted font-monospace">
                    {item.userId?._id || item.userId || 'N/A'}
                  </td>
                  <td>{item.name || item.userId?.name}</td>
                  <td>{item.email || item.userId?.email}</td>
                  <td>{item.message}</td>
                  <td className="small text-muted">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Adminmessage;