import React from 'react';
import { Layers, Palette, GitBranch } from 'lucide-react';
import './Philosophy.css';

const Philosophy = () => {
  const approaches = [
    {
      icon: <Layers size={24} />,
      title: 'Component-Driven',
      text: 'Every UI element is a reusable, isolated component. I think in composition — small pieces that snap together into complex interfaces without tangled dependencies.'
    },
    {
      icon: <Palette size={24} />,
      title: 'Pixel-Perfect UI',
      text: 'Design fidelity matters. I translate mockups into responsive layouts with precise spacing, consistent typography, and attention to visual hierarchy.'
    },
    {
      icon: <GitBranch size={24} />,
      title: 'State Management',
      text: 'Predictable data flow keeps apps stable. Whether it\'s Redux Toolkit or Context API, I keep state logic clean and separate from presentation.'
    }
  ];

  return (
    <section className="py-5">
      <div className="container">
        <div className="section-header text-center mb-5">
          <h2 className="section-title">How We Build</h2>
          <p className="section-subtitle">Our approach to frontend development</p>
        </div>

        <div className="row g-4">
          {approaches.map((item, index) => (
            <div key={index} className="col-lg-4">
              <div className="philosophy-card h-100">
                <div className="philosophy-icon-wrap d-flex align-items-center justify-content-center mb-3">
                  {item.icon}
                </div>
                <h3 className="philosophy-title">{item.title}</h3>
                <p className="philosophy-text">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
