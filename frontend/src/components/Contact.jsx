import { useState } from 'react';
import axios from 'axios';
import { Mail } from 'lucide-react';
import './Contact.css';

const LinkedinIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GithubIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [alert, setAlert] = useState({ msg: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ msg: '', type: '' });

    // 1. LocalStorage se token nikalein
    const token = localStorage.getItem('token');
    if (!token) {
      setAlert({ msg: 'Please login first to send a message!', type: 'danger' });
      return;
    }

    setLoading(true);

    try {
      // 2. Protected backend route hit karein
      const res = await axios.post(
        'https://myproject-nl8l.onrender.com/api/contact',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Middleware isi token ko verify karega
          },
        }
      );

      // 3. Success state
      setAlert({
        msg: res.data.message || 'Send successful! Your message has been delivered.',
        type: 'success',
      });
      setFormData({ name: '', email: '', message: '' });

      // 4 seconds baad alert auto-hide
      setTimeout(() => setAlert({ msg: '', type: '' }), 4000);
    } catch (err) {
      setAlert({
        msg: err.response?.data?.message || 'Failed to send message. Please try again.',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section" style={{ marginTop: '81px' }}>
      <div className="container">
        <div className="section-header text-center mb-5" style={{ marginTop: '97px' }}>
          <h2>Get in Touch</h2>
          <p>Have a project in mind or just want to connect? Drop ours a message.</p>
        </div>

        {/* Message Alert Banner */}
        {alert.msg && (
          <div className={`alert alert-${alert.type} text-center py-2 col-lg-8 mx-auto mb-4`}>
            {alert.msg}
          </div>
        )}

        <div className="row g-4">
          <div className="col-lg-7">
            <form className="contact-form d-flex flex-column gap-3" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  required
                />
              </div>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>

          <div className="col-lg-5">
            <div className="contact-info-card h-100">
              <h3>Contact Details</h3>

              <div className="info-item d-flex gap-3 align-items-center">
                <Mail size={20} color="#00e5ff" />
                <div className="d-flex flex-column">
                  <span className="info-label">Email</span>
                  <a href="mailto:paras@example.com" className="info-value">paras@example.com</a>
                </div>
              </div>

              <div className="info-item d-flex gap-3 align-items-center">
                <LinkedinIcon size={20} color="#ff6f20" />
                <div className="d-flex flex-column">
                  <span className="info-label">LinkedIn</span>
                  <a href="https://www.linkedin.com/in/kunal-parasrampuria-420893321?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="info-value">linkedin.com/in/paras</a>
                </div>
              </div>

              <div className="info-item d-flex gap-3 align-items-center">
                <GithubIcon size={20} color="#7c4dff" />
                <div className="d-flex flex-column">
                  <span className="info-label">GitHub</span>
                  <a href="https://github.com/paras" target="_blank" rel="noopener noreferrer" className="info-value">github.com/paras</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;