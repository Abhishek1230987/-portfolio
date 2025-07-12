import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await apiService.projects.getAll({ featured: true });
      setProjects(response.data || []);
    } catch (err) {
      
      console.error('Error fetching projects:', err);
      // Fallback to sample data if API fails
      setProjects(getSampleProjects());
    } finally {
      setLoading(false);
    }
  };

  const getSampleProjects = () => [
    {
      _id: '1',
      title: 'Threadsy',
      description: 'A full-stack E-commerce site built with the MERN stack and Stripe for secure payments. Features include product browsing, user auth, cart management, and order tracking—delivering a complete, real-world shopping experience.',
      technologies: ['React.js', 'Node.js','Express.js','Multer', 'MongoDB','JWT','bcrypt.js','Stripe','Razorpay'],
      category: 'web',
      featured: true,
      status: 'completed',
      githubUrl: 'https://github.com/Abhishek1230987/Threadsy',
      liveUrl: 'https://neural-portfolio.vercel.app'
    },
    {
      _id: '2',
      title: 'MentorHub',
      description: 'Created a scalable platform that could potentially serve thousands of users, with features designed for both individual learners and enterprise clients. The intuitive UX/UI design reduces onboarding friction while the robust feature set supports long-term user engagement.',
      technologies: ['Next.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'WebRTC'],
      category: 'ai',
      featured: true,
      status: 'completed',
      githubUrl: 'https://github.com/abhisheksingh/cyber-commerce',
      liveUrl: 'https://cyber-commerce.com'
    }
    // Add more sample projects as needed
    
  ];

  const getProjectIcon = (category) => {
    const icons = {
      web: 'fas fa-globe',
      mobile: 'fas fa-mobile-alt',
      desktop: 'fas fa-desktop',
      ai: 'fas fa-brain',
      other: 'fas fa-code'
    };
    return icons[category] || icons.other;
  };

  const filteredProjects = projects.filter(project => 
    filter === 'all' || project.category === filter
  );

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  if (loading) {
    return (
      <section id="projects" className="projects section">
        <div className="container">
          <div className="loading-container">
            <div className="cyber-loader">
              <div className="loader-ring"></div>
              <div className="loader-ring"></div>
              <div className="loader-ring"></div>
              <div className="loader-text">LOADING_PROJECTS</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-text">FEATURED</span>
            <span className="title-accent">PROJECTS</span>
          </h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            Showcasing cutting-edge solutions and innovative technologies
          </p>
        </div>

        {/* Project Filters */}
        <div className="project-filters">
          {['all', 'web', 'ai'].map(category => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              <span className="filter-text">{category.toUpperCase()}</span>
              <span className="filter-glow"></span>
            </button>
          ))}
        </div>

        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-triangle"></i>
            <span>{error}</span>
          </div>
        )}

        <div className="projects-grid">
          {visibleProjects.map((project, index) => (
            <div 
              key={project._id} 
              className="project-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="project-header">
                <div className="project-status">
                  <span className={`status-indicator ${project.status}`}></span>
                  <span className="status-text">{project.status.toUpperCase()}</span>
                </div>
                <div className="project-category">
                  <i className={getProjectIcon(project.category)}></i>
                  <span>{project.category.toUpperCase()}</span>
                </div>
              </div>

              <div className="project-image">
              <div className="project-placeholder">
                <img 
                  src={`/images/projects/${project.title.toLowerCase().replace(/\s+/g, '')}.svg`} 
                  alt={`${project.title} Thumbnail`} 
                  className="project-thumbnail"
                />
              </div>
                <div className="project-overlay">
                  <div className="project-links">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link live"
                        title="View Live"
                      >
                        <i className="fas fa-external-link-alt"></i>
                        <span>LIVE</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link github"
                        title="View Code"
                      >
                        <i className="fab fa-github"></i>
                        <span>CODE</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.technologies?.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      <span className="tech-text">{tech}</span>
                      <span className="tech-glow"></span>
                    </span>
                  ))}
                </div>

                <div className="project-footer">
                  <div className="project-metrics">
                    <div className="metric">
                      <i className="fas fa-star"></i>
                      <span>Featured</span>
                    </div>
                    <div className="metric">
                      <i className="fas fa-code-branch"></i>
                      <span>{project.technologies?.length || 0} Tech</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length > visibleCount && (
          <div className="load-more-container">
            <button 
              className="load-more-btn"
              onClick={() => setVisibleCount(prev => prev + 3)}
            >
              <span className="btn-text">
                <i className="fas fa-download"></i>
                LOAD_MORE_PROJECTS
              </span>
              <div className="btn-particles">
                <span className="particle"></span>
                <span className="particle"></span>
                <span className="particle"></span>
              </div>
            </button>
          </div>
        )}

        <div className="projects-stats">
          <div className="stat-item">
            <span className="stat-value">{projects.length}</span>
            <span className="stat-label">Total Projects</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{projects.filter(p => p.status === 'completed').length}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{projects.filter(p => p.featured).length}</span>
            <span className="stat-label">Featured</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
