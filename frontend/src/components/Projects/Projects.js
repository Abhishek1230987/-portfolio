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
      setError('Failed to load projects');
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
      title: 'Neural Network Portfolio',
      description: 'A cutting-edge portfolio website built with React and Node.js, featuring AI-powered animations and dynamic content management.',
      technologies: ['React', 'Node.js', 'MongoDB', 'TensorFlow.js', 'Three.js'],
      category: 'web',
      featured: true,
      status: 'completed',
      githubUrl: 'https://github.com/abhisheksingh/neural-portfolio',
      liveUrl: 'https://neural-portfolio.vercel.app'
    },
    {
      _id: '2',
      title: 'CyberCommerce Platform',
      description: 'A futuristic e-commerce platform with advanced product visualization, AR try-on features, and blockchain-based payments.',
      technologies: ['Next.js', 'GraphQL', 'PostgreSQL', 'Redis', 'Docker'],
      category: 'web',
      featured: true,
      status: 'completed',
      githubUrl: 'https://github.com/abhisheksingh/cyber-commerce',
      liveUrl: 'https://cyber-commerce.com'
    },
    {
      _id: '3',
      title: 'AI Task Orchestrator',
      description: 'An intelligent task management system powered by machine learning algorithms for automatic task prioritization.',
      technologies: ['Vue.js', 'Python', 'FastAPI', 'TensorFlow', 'Socket.io'],
      category: 'ai',
      featured: true,
      status: 'completed',
      githubUrl: 'https://github.com/abhisheksingh/ai-task-orchestrator',
      liveUrl: 'https://ai-tasks.io'
    },
    {
      _id: '4',
      title: 'Quantum Analytics Dashboard',
      description: 'Real-time data visualization platform with quantum-inspired algorithms for pattern recognition and predictive analytics.',
      technologies: ['D3.js', 'WebGL', 'Python', 'Apache Kafka'],
      category: 'web',
      featured: true,
      status: 'completed',
      githubUrl: 'https://github.com/abhisheksingh/quantum-analytics',
      liveUrl: 'https://quantum-analytics.tech'
    }
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
          {['all', 'web', 'ai', 'mobile', 'desktop'].map(category => (
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
                  <i className={getProjectIcon(project.category)}></i>
                  <div className="image-overlay">
                    <div className="scan-line"></div>
                  </div>
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
