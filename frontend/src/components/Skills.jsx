import React from 'react';
import { Globe, Database, Wrench } from 'lucide-react';
import './Skills.css';

const Skills = () => {
  return (
    <section id="skills" className="skills-section py-5">
      <div className="container">
        <div className="section-header text-center mb-5  mt-4" >
          <h2>Skills & Tools</h2>
          <p>What we work with and how we use it</p>
        </div>

        <div className="skills-subsection mb-5">
          <div className="subsection-header d-flex align-items-center gap-2 mb-3">
            <Globe size={20} color="#00e5ff" />
            <h3>Core Frontend & Web Fundamentals</h3>
          </div>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="skill-card h-100">
                <h4>HTML5</h4>
                <p>Semantic markup, accessibility-first structure, SEO-friendly document outlines. I write HTML that screen readers and search engines can actually parse correctly.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="skill-card h-100">
                <h4>CSS3</h4>
                <p>Flexbox and Grid for layout, custom animations, responsive media queries. I handle specificity intentionally and keep stylesheets maintainable as projects grow.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="skill-card h-100">
                <h4>JavaScript (ES6+)</h4>
                <p>Destructuring, async/await, modules, closures — the core language features I use daily. I write vanilla JS when it makes sense and understand what frameworks abstract away.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="skill-card h-100">
                <h4>React.js</h4>
                <p>Component composition, hooks, conditional rendering, prop drilling vs. context. I build interfaces as trees of focused, reusable pieces that stay predictable.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="skills-subsection mb-5">
          <div className="subsection-header d-flex align-items-center gap-2 mb-3">
            <Database size={20} color="#ff6f20" />
            <h3>State Management & Data Flow</h3>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="skill-card h-100">
                <h4>Redux Toolkit</h4>
                <p>Slices, createAsyncThunk, normalized state. I use RTK to manage complex application state without the boilerplate that made Redux painful.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="skill-card h-100">
                <h4>Context API</h4>
                <p>For lighter state needs — theme toggles, auth status, user preferences. I know when Context is enough and when to reach for something heavier.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="skill-card h-100">
                <h4>REST APIs & Axios</h4>
                <p>Fetching, error handling, loading states, request interceptors. I structure API calls in dedicated service layers to keep components clean.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="skills-subsection">
          <div className="subsection-header d-flex align-items-center gap-2 mb-3">
            <Wrench size={20} color="#7c4dff" />
            <h3>Build Tools & Workflow</h3>
          </div>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="skill-card h-100">
                <h4>Vite</h4>
                <p>Fast HMR, optimized builds, clean config. I use Vite as my default build tool because it stays out of the way and lets me focus on code.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="skill-card h-100">
                <h4>Git & GitHub</h4>
                <p>Feature branches, meaningful commits, pull request workflows. Version control isn't just backup — it's how I communicate changes and collaborate.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="skill-card h-100">
                <h4>CSS Layouts</h4>
                <p>Flexbox for one-dimensional flow, Grid for two-dimensional layouts. I pick the right tool for each layout problem instead of forcing everything into one approach.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="skill-card h-100">
                <h4>Performance</h4>
                <p>Code splitting, lazy loading, memoization, minimizing re-renders. I think about bundle size and runtime performance from the start, not as an optimization pass later.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
