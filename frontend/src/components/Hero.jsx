import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero-section d-flex align-items-center">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 hero-content">
            <p className="hero-greeting">HELLO, WELCOME TO</p>
            <h1 className="hero-name">MAZE RUNNER PVT LTD</h1>
            <h2 className="hero-title">Frontend React Technology Company</h2>
            <p className="hero-intro">
              We build responsive, component-driven web applications with React. 
              Focused on clean architecture, smooth interactions, and interfaces that actually work well.
            </p>
            
            <div className="d-flex gap-3 mt-4 hero-cta-group">
              <Link to="/contact" className="btn btn-primary">
                Get in Touch
              </Link>
              <Link to="/skills" className="btn btn-secondary">
                View our Work
              </Link>
            </div>
          </div>
          
          <div className="col-lg-6 hero-image-wrapper" >
            <div className="hero-image-placeholder d-flex flex-column align-items-center justify-content-center">
             
      <div style={{ width: '100%', height: '520px', overflow: 'hidden' }}>
      <iframe
        title="Worker 12"
        frameBorder="0"
        allowFullScreen
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        src="https://sketchfab.com/models/9688985db84d447580d40e40e1649407/embed?autospin=1&autostart=1&preload=1&transparent=1&ui_animations=0&ui_infos=0&ui_stop=0&ui_inspector=0&ui_watermark_link=0&ui_watermark=0&ui_hint=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&ui"
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
