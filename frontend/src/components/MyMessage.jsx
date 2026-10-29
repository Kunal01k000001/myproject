import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Mymessage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get('https://myproject-nl8l.onrender.com/api/my-messages', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(res.data.data);
      } catch (err) {
        setError('Failed to fetch messages.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [navigate]);

  return (
    <div className="container" style={{ marginTop: '110px', minHeight: '80vh' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">My Sent Messages</h2>
        <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)}>
           Back
        </button>
      </div>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Loading your messages...</p>
        </div>
      )}

      {error && <div className="alert alert-danger text-center">{error}</div>}

      {!loading && messages.length === 0 && (
        <div className="text-center py-5 bg-light rounded-3">
          <p className="text-muted mb-3">You haven't sent any messages yet.</p>
          <button className="btn btn-primary" onClick={() => navigate('/contact')}>
            Send a Message
          </button>
        </div>
      )}

      <div className="row g-3">
        {messages.map((item) => (
          <div key={item._id} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0 rounded-3">
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h6 className="card-title fw-bold text-primary mb-0">{item.name}</h6>
                  <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </small>
                </div>
                <p className="text-muted small mb-2">{item.email}</p>
                <div className="p-2 bg-light rounded flex-grow-1">
                  <p className="card-text mb-0 text-dark small">{item.message}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mymessage;