import { Link } from 'react-router-dom';
import './CtaBanner.css';

const CtaBanner = () => {
  return (
    <section className="cta-banner text-center">
      <div className="container">
        <div className="cta-content mx-auto">
          <h2 className="cta-title d-flex align-items-center justify-content-center gap-2 flex-wrap">
            Currently Available for Frontend Opportunities
            <span className="status-dot"></span>
          </h2>
          <p className="cta-subtitle mx-auto">
            Looking for a developer who cares about clean code and great user experiences? Let's talk.
          </p>
          <Link to="/contact" className="btn btn-primary">
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
