import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="nav-logo">
            <span className="logo-text">AKS</span>
            <div className="logo-glow"></div>
          </Link>

          <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <li className="nav-item">
              <button 
                className="nav-link" 
                onClick={() => scrollToSection('home')}
              >
                Home
              </button>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link" 
                onClick={() => scrollToSection('about')}
              >
                About
              </button>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link" 
                onClick={() => scrollToSection('skills')}
              >
                Skills
              </button>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link" 
                onClick={() => scrollToSection('projects')}
              >
                Projects
              </button>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link" 
                onClick={() => scrollToSection('contact')}
              >
                Contact
              </button>
            </li>
          </ul>

          <button 
            className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
