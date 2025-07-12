import React from 'react';
import './Skills.css';

const Skills = () => {
  return (
    <section id="skills" className="skills section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title text-gradient">Skills & Expertise</h2>
          <div className="title-underline"></div>
        </div>
        <div className="skills-content">
          <div className="skills-grid">
            <div className="skill-card">
              <h3>Frontend Development</h3>
              <p>React, Vue.js, HTML5, CSS3, JavaScript, TypeScript</p>
            </div>
            <div className="skill-card">
              <h3>Backend Development</h3>
              <p>Node.js, Python, Express.js, MongoDB, PostgreSQL</p>
            </div>
            <div className="skill-card">
              <h3>Cloud & DevOps</h3>
              <p>AWS, Docker, Linux, CI/CD, Git</p>
            </div>
            <div className="skill-card">
              <h3>UI/UX Design</h3>
              <p>Figma, Adobe XD, Photoshop, Responsive Design</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
