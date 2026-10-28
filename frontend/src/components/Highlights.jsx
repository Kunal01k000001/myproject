import React from 'react';
import { Code2, FileCode, Zap, Monitor } from 'lucide-react';
import './Highlights.css';

const Highlights = () => {
  const cards = [
    {
      icon: <Code2 size={36} />,
      label: 'Core Stack',
      description: 'React, JavaScript ES6+, modern CSS'
    },
    {
      icon: <FileCode size={36} />,
      label: 'Clean Code',
      description: 'Readable, maintainable, well-structured'
    },
    {
      icon: <Zap size={36} />,
      label: 'Performance',
      description: 'Optimized renders, fast load times'
    },
    {
      icon: <Monitor size={36} />,
      label: 'Responsive',
      description: 'Mobile-first, every breakpoint covered'
    }
  ];

  return (
    <div className="container py-5">
      <div className="row g-4">
        {cards.map((card, index) => (
          <div key={index} className="col-sm-6 col-lg-3">
            <div 
              className="highlight-card text-center h-100" 
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="highlight-icon d-flex justify-content-center mb-3">
                {card.icon}
              </div>
              <h3 className="highlight-label">{card.label}</h3>
              <p className="highlight-desc">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Highlights;
