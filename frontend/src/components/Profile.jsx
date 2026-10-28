import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

export const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Agar user login nahi hai toh login par bhej do
      navigate('/login');
    }
  }, []);

  // Cross icon click hone par home ya previous page par bhejna
  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="profile-overlay">
      {user ? (
        <div className="profile-modal-card">
          {/* Close / Cross Icon */}
          <button 
            type="button" 
            className="profile-close-btn" 
            onClick={handleClose} 
            aria-label="Close Profile"
          >
            &times;
          </button>

          {/* Profile Header */}
          <div className="profile-avatar-circle">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>

          <h3 className="profile-title">{user.name || 'User Profile'}</h3>
          <p className="profile-status">Active User</p>

          {/* User Information Grid */}
          <div className="profile-info-list">
            <div className="info-row">
              <span className="info-key">Full Name</span>
              <span className="info-val">{user.name || 'Not Available'}</span>
            </div>

            <div className="info-row">
              <span className="info-key">Email</span>
              <span className="info-val">{user.email || 'Not Available'}</span>
            </div>

            {user.phone && (
              <div className="info-row">
                <span className="info-key">Phone</span>
                <span className="info-val">{user.phone}</span>
              </div>
            )}

            {user.role && (
              <div className="info-row">
                <span className="info-key">Role</span>
                <span className="info-val">{user.role}</span>
              </div>
            )}

            {user.bio && (
              <div className="info-row bio-row">
                <span className="info-key">About</span>
                <p className="info-val bio-text">{user.bio}</p>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;