import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-text">
            <p>&copy; 2024 Abhishek Kumar Singh. All rights reserved.</p>
          </div>
          <div className="footer-social">
            <a href="https://github.com/abhishek-kumar-singh" className="social-link">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://linkedin.com/in/abhishek-kumar-singh" className="social-link">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://twitter.com/abhishek_kumar" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com/abhishek_kumar" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
