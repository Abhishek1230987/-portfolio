import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title text-gradient">About Me</h2>
          <div className="title-underline"></div>
        </div>
        <div className="about-content">
          <div className="about-text">
            <p className="about-description">
              I'm a passionate Full Stack Developer with expertise in creating innovative digital solutions. 
              My journey in tech spans across multiple domains, from crafting intuitive user interfaces to 
              building robust backend systems.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-item">
                <div className="stat-number">3+</div>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <span className="stat-label">Client Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
