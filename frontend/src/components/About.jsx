import React from 'react';
import { BookOpen, Target, Coffee } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about-section py-5">
      <div className="container">
        <div className="section-header text-center mb-5 mt-4">
          <h2>About Our Company</h2>
          <p>A bit about our background and what makes me tick</p>
        </div>
        
        <div className="d-flex flex-column gap-4">
          <div className="about-card d-flex gap-4 align-items-start">
            <div className="icon-circle d-flex justify-content-center align-items-center flex-shrink-0">
              <BookOpen size={24} color="#00e5ff" />
            </div>
            <div className="card-text">
              <h3>Background & Journey</h3>
              <p>We got into web development through a genuine curiosity about how websites work under the hood. What started with basic HTML pages turned into a deep interest in JavaScript and the modern frontend ecosystem. Over time, I've focused on React as my primary tool for building web applications — its component model just clicks with how I think about UI problems. I enjoy taking a design or an idea and turning it into something functional, responsive, and well-structured.</p>
            </div>
          </div>

          <div className="about-card d-flex gap-4 align-items-start">
            <div className="icon-circle d-flex justify-content-center align-items-center flex-shrink-0">
              <Target size={24} color="#ff6f20" />
            </div>
            <div className="card-text">
              <h3>What Drives our</h3>
              <p>We care about the details that most users never consciously notice but always feel — consistent spacing, smooth transitions, logical navigation. My development approach prioritizes clean folder structures and readable code. I believe a well-organized codebase is just as important as the final product. I follow responsive-first principles, making sure layouts hold up across devices. Modern UI patterns like proper state management, accessible markup, and performance-conscious rendering are part of my default workflow, not afterthoughts.</p>
            </div>
          </div>

          <div className="about-card d-flex gap-4 align-items-start">
            <div className="icon-circle d-flex justify-content-center align-items-center flex-shrink-0">
              <Coffee size={24} color="#7c4dff" />
            </div>
            <div className="card-text">
              <h3>Beyond the Code</h3>
              <p>When we not writing components, We usually exploring new tools in the JavaScript ecosystem or reading about frontend architecture patterns. I value continuous learning — the web moves fast, and staying current means staying effective. I work well in team settings, enjoy code reviews as a learning opportunity, and believe clear communication is underrated in development. Problem-solving is what keeps me engaged, whether it's debugging a tricky re-render or figuring out the cleanest way to structure a new feature.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
