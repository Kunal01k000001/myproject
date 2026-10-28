import React from 'react';
import './RecentWork.css';

const RecentWork = () => {
  const projects = [
    {
      color: '#00e5ff',
      title: 'E-Commerce Dashboard',
      tags: ['React', 'Redux Toolkit', 'REST API'],
      description: 'Admin panel with product management, order tracking, and real-time data visualization. Built with component composition and centralized state.'
    },
    {
      color: '#00e676',
      title: 'Weather Application',
      tags: ['React', 'Axios', 'CSS Grid'],
      description: 'Location-based weather app with API integration, clean data fetching patterns, and responsive card layouts.'
    },
    {
      color: '#ff6f20',
      title: 'Task Management App',
      tags: ['React', 'Context API', 'LocalStorage'],
      description: 'Kanban-style task board with drag interactions, persistent storage, and filter/sort capabilities.'
    }
  ];

  return (
    <section id="recent-work" className="py-5">
      <div className="container">
        <div className="section-header text-center mb-5">
          <h2 className="section-title">What We've Been Building</h2>
          <p className="section-subtitle">A quick look at the kind of work I do</p>
        </div>

        <div className="row g-4">
          {projects.map((project, index) => (
            <div key={index} className="col-lg-4">
              <div className="work-card h-100">
                <div 
                  className="work-accent-bar" 
                  style={{ backgroundColor: project.color }}
                ></div>
                <div className="work-body">
                  <h3 className="work-title">{project.title}</h3>
                  <div className="work-tags d-flex gap-2 flex-wrap mb-3">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="work-tag">{tag}</span>
                    ))}
                  </div>
                  <p className="work-desc">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentWork;
