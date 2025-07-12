import React, { useEffect, useRef, useState, useCallback } from 'react';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef(null);
  const hologramRef = useRef(null);
  const [currentText, setCurrentText] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [localMousePosition, setLocalMousePosition] = useState({ x: 0, y: 0 });
  const interactiveObjectRef = useRef(null);
  
  const typewriterTexts = [
    'NEURAL NETWORK ARCHITECT',
    'QUANTUM COMPUTING SPECIALIST', 
    'CYBERSECURITY EXPERT',
    'AI/ML ENGINEER',
    'BLOCKCHAIN DEVELOPER',
    'FULL STACK DEVELOPER',
    'CLOUD ARCHITECT'
  ];
  
  // Enhanced particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const connectionDistance = 150;
    const maxParticles = 100;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.size = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.hue = 180 + Math.random() * 60; // Cyan to blue range
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        
        // Mouse interaction
        const dx = mousePosition.x - this.x;
        const dy = mousePosition.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          this.x += dx * 0.001;
          this.y += dy * 0.001;
        }
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, ${this.opacity})`;
        ctx.fill();
        ctx.shadowColor = `hsl(${this.hue}, 100%, 60%)`;
        ctx.shadowBlur = 10;
      }
    }
    
    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }
    
    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(180, 100%, 60%, ${0.3 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      drawConnections();
      requestAnimationFrame(animate);
    }
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mousePosition]);
  
  // Throttled mouse tracking for better performance
  const throttledMouseMove = useCallback((e) => {
    requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    });
  }, []);
  
  useEffect(() => {
    window.addEventListener('mousemove', throttledMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', throttledMouseMove);
  }, [throttledMouseMove]);
  
  // Optimized interactive object mouse tracking
  const handleInteractiveMouseMove = useCallback((e) => {
    if (interactiveObjectRef.current) {
      requestAnimationFrame(() => {
        const rect = interactiveObjectRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const x = (e.clientX - centerX) / (rect.width / 2);
        const y = (e.clientY - centerY) / (rect.height / 2);
        
        setLocalMousePosition({ 
          x: Math.max(-1, Math.min(1, x)), 
          y: Math.max(-1, Math.min(1, y)) 
        });
      });
    }
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setLocalMousePosition({ x: 0, y: 0 });
  }, []);
  
  useEffect(() => {
    const interactiveElement = interactiveObjectRef.current;
    if (interactiveElement) {
      interactiveElement.addEventListener('mousemove', handleInteractiveMouseMove, { passive: true });
      interactiveElement.addEventListener('mouseleave', handleMouseLeave, { passive: true });
      
      return () => {
        interactiveElement.removeEventListener('mousemove', handleInteractiveMouseMove);
        interactiveElement.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [handleInteractiveMouseMove, handleMouseLeave]);
  
  // Floating particles effect
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    
    const createFloatingParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 5 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      container.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 15000);
    };
    
    const interval = setInterval(createFloatingParticle, 500);
    return () => clearInterval(interval);
  }, []);
  
  // Advanced typewriter effect
  useEffect(() => {
    let currentIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    const typeWriter = () => {
      if (isPaused) return;
      
      const currentWord = typewriterTexts[currentIndex];
      
      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentCharIndex - 1));
        currentCharIndex--;
        
        if (currentCharIndex === 0) {
          isDeleting = false;
          currentIndex = (currentIndex + 1) % typewriterTexts.length;
          isPaused = true;
          setTimeout(() => { isPaused = false; }, 500);
        }
      } else {
        setCurrentText(currentWord.substring(0, currentCharIndex + 1));
        currentCharIndex++;
        
        if (currentCharIndex === currentWord.length) {
          isPaused = true;
          setTimeout(() => {
            isDeleting = true;
            isPaused = false;
          }, 3000);
        }
      }
    };
    
    const timer = setInterval(typeWriter, isDeleting ? 50 : 120);
    return () => clearInterval(timer);
  }, [currentText]);
  
  // Hologram rotation effect
  useEffect(() => {
    const hologram = hologramRef.current;
    if (!hologram) return;
    
    let rotationX = 0;
    let rotationY = 0;
    
    const animate = () => {
      rotationX += 0.5;
      rotationY += 0.3;
      hologram.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
      requestAnimationFrame(animate);
    };
    
    animate();
  }, []);
  
  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section id="home" className={`hero ${isLoaded ? 'loaded' : ''}`} ref={heroRef}>
      {/* Advanced Canvas Background */}
      <canvas ref={canvasRef} className="hero-canvas" />
      
      {/* Floating Particles Container */}
      <div ref={particlesRef} className="floating-particles-container"></div>
      
      {/* Neural Network Background */}
      <div className="neural-network">
        <div className="neural-node node-1"></div>
        <div className="neural-node node-2"></div>
        <div className="neural-node node-3"></div>
        <div className="neural-node node-4"></div>
        <div className="neural-node node-5"></div>
        <div className="neural-connection connection-1"></div>
        <div className="neural-connection connection-2"></div>
        <div className="neural-connection connection-3"></div>
        <div className="neural-connection connection-4"></div>
      </div>
      
      {/* Cyber Grid Overlay */}
      <div className="cyber-grid">
        <div className="grid-lines">
          {[...Array(20)].map((_, i) => (
            <div key={`v-${i}`} className="grid-line vertical" style={{left: `${i * 5}%`}}></div>
          ))}
          {[...Array(20)].map((_, i) => (
            <div key={`h-${i}`} className="grid-line horizontal" style={{top: `${i * 5}%`}}></div>
          ))}
        </div>
        <div className="grid-pulse"></div>
      </div>
      
      {/* Data Flow Streams */}
      <div className="data-flow">
        <div className="data-stream stream-top"></div>
        <div className="data-stream stream-bottom"></div>
        <div className="data-stream stream-left"></div>
        <div className="data-stream stream-right"></div>
      </div>
      
      {/* Holographic Interference Patterns */}
      <div className="holographic-interference">
        <div className="interference-layer layer-1"></div>
        <div className="interference-layer layer-2"></div>
        <div className="interference-layer layer-3"></div>
        <div className="glitch-overlay"></div>
      </div>
      
      {/* Energy Pulse Network */}
      <div className="energy-pulse-network">
        <div className="pulse-node node-1"></div>
        <div className="pulse-node node-2"></div>
        <div className="pulse-node node-3"></div>
        <div className="pulse-node node-4"></div>
        <div className="pulse-node node-5"></div>
        <div className="pulse-node node-6"></div>
        <div className="energy-wave wave-1"></div>
        <div className="energy-wave wave-2"></div>
        <div className="energy-wave wave-3"></div>
        <div className="energy-wave wave-4"></div>
      </div>
      
      {/* Digital Rain Effect */}
      <div className="digital-rain">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="rain-column" style={{left: `${(i + 1) * 6.67}%`}}>
            <div className="rain-characters">
              {[...Array(20)].map((_, j) => (
                <span key={j} className="rain-char" style={{animationDelay: `${Math.random() * 5}s`}}>
                  {String.fromCharCode(65 + Math.floor(Math.random() * 26))}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Quantum Flux Lines */}
      <div className="quantum-flux">
        <div className="flux-line flux-1"></div>
        <div className="flux-line flux-2"></div>
        <div className="flux-line flux-3"></div>
        <div className="flux-line flux-4"></div>
        <div className="flux-line flux-5"></div>
        <div className="flux-line flux-6"></div>
        <div className="flux-intersection intersection-1"></div>
        <div className="flux-intersection intersection-2"></div>
        <div className="flux-intersection intersection-3"></div>
      </div>
      
      {/* Main Content */}
      <div className="hero-content">
        <div className="container">
          <div className="hero-main">
            <div className="hero-text">
              {/* System Status */}
              <div className="system-status ">
                <div className="status-bar">
                  <div className="status-indicator">
                    <span className="status-dot pulse"></span>
                    <span className="status-text">NEURAL_SYSTEM_ONLINE</span>
                  </div>
                  <div className="system-time">{new Date().toLocaleTimeString()}</div>
                </div>
              </div>
              
              {/* Terminal Introduction */}
              <div className="terminal-intro">
                <div className="terminal-line">
                  <span className="terminal-prompt">abhishek@neural-net:~$ </span>
                  <span className="terminal-command">whoami</span>
                </div>
                <div className="terminal-output">
                  <span className="output-text">Initializing user profile...</span>
                </div>
              </div>
              
              {/* Main Title with Holographic Effect */}
              <h1 className="hero-title">
                <div className="title-container">
                  <span className="glitch-text" data-text="ABHISHEK">ABHISHEK</span>
                  <div className="title-glow"></div>
                </div>
                <div className="subtitle-container">
                  <span className="cyber-text">KUMAR SINGH</span>
                  <div className="subtitle-particles">
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                  </div>
                </div>
              </h1>
              
              {/* Dynamic Role Display */}
              <div className="role-display">
                <div className="role-container">
                  <span className="role-prefix">[ROLE]:</span>
                  <span className="typewriter-text">{currentText}</span>
                  <span className="cursor blink">█</span>
                </div>
                <div className="role-background">
                  <div className="role-scan"></div>
                </div>
              </div>
              
              {/* Advanced Stats Panel */}
              <div className="stats-panel">
                <div className="stats-header">
                  <span>SYSTEM_METRICS</span>
                  <div className="stats-indicator"></div>
                </div>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-value animate-counter" data-target="99.9">0</div>
                    <div className="stat-label">UPTIME_%</div>
                    <div className="stat-bar"><div className="stat-fill" style={{width: '99.9%'}}></div></div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value animate-counter" data-target="127">0</div>
                    <div className="stat-label">NEURAL_NODES</div>
                    <div className="stat-bar"><div className="stat-fill" style={{width: '95%'}}></div></div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value animate-counter" data-target="1337">0</div>
                    <div className="stat-label">CODE_COMMITS</div>
                    <div className="stat-bar"><div className="stat-fill" style={{width: '88%'}}></div></div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="action-panel">
                <button className="cyber-button primary" onClick={scrollToProjects}>
                  <div className="button-bg"></div>
                  <div className="button-content">
                    <i className="fas fa-rocket"></i>
                    <span>LAUNCH_PROJECTS</span>
                  </div>
                  <div className="button-glow"></div>
                </button>
                <button className="cyber-button secondary" onClick={scrollToContact}>
                  <div className="button-bg"></div>
                  <div className="button-content">
                    <i className="fas fa-satellite-dish"></i>
                    <span>INITIATE_CONTACT</span>
                  </div>
                  <div className="button-glow"></div>
                </button>
              </div>
            </div>
            
            {/* Extraordinary Visual Side */}
            <div className="hero-visual">
              {/* Main Holographic Display */}
              <div className="holographic-display">
                <div className="display-frame">
                  <div className="frame-corners">
                    <div className="corner top-left"></div>
                    <div className="corner top-right"></div>
                    <div className="corner bottom-left"></div>
                    <div className="corner bottom-right"></div>
                  </div>
                  
                  {/* Central Hologram */}
                  <div className="central-hologram" ref={hologramRef}>
                    <div className="hologram-layers">
                      <div className="layer layer-1">
                        <div className="geometric-shape">
                          <div className="shape-face front"></div>
                          <div className="shape-face back"></div>
                          <div className="shape-face top"></div>
                          <div className="shape-face bottom"></div>
                          <div className="shape-face left"></div>
                          <div className="shape-face right"></div>
                        </div>
                      </div>
                      <div className="layer layer-2">
                        <div className="rotating-rings">
                          <div className="ring ring-x"></div>
                          <div className="ring ring-y"></div>
                          <div className="ring ring-z"></div>
                        </div>
                      </div>
                      <div className="layer layer-3">
                        <div className="energy-core">
                          <div className="core-center">
                            <i className="fas fa-brain"></i>
                          </div>
                          <div className="energy-waves">
                            <div className="wave wave-1"></div>
                            <div className="wave wave-2"></div>
                            <div className="wave wave-3"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Orbiting Elements */}
                    <div className="orbiting-elements">
                      <div className="orbit orbit-1">
                        <div className="orbital-element"><i className="fab fa-react"></i></div>
                      </div>
                      <div className="orbit orbit-2">
                        <div className="orbital-element"><i className="fab fa-node-js"></i></div>
                      </div>
                      <div className="orbit orbit-3">
                        <div className="orbital-element"><i className="fab fa-python"></i></div>
                      </div>
                      <div className="orbit orbit-4">
                        <div className="orbital-element"><i className="fas fa-database"></i></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* HUD Elements */}
                  <div className="hud-elements">
                    <div className="hud-top">
                      <div className="hud-indicator">
                        <span className="indicator-dot"></span>
                        <span>NEURAL_INTERFACE_ACTIVE</span>
                      </div>
                    </div>
                    <div className="hud-sides">
                      <div className="hud-left">
                        <div className="radar-sweep"></div>
                      </div>
                      <div className="hud-right">
                        <div className="data-readout">
                          <div className="readout-line">PWR: 98.7%</div>
                          <div className="readout-line">CPU: 67.2%</div>
                          <div className="readout-line">NET: 1Gbps</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tech Stack Visualization */}
              <div className="tech-visualization">
                <div className="tech-nodes">
                  <div className="tech-node" style={{top: '10%', left: '20%'}}>
                    <i className="fab fa-js"></i>
                    <span>JavaScript</span>
                  </div>
                  <div className="tech-node" style={{top: '30%', right: '10%'}}>
                    <i className="fab fa-react"></i>
                    <span>React</span>
                  </div>
                  <div className="tech-node" style={{bottom: '20%', left: '15%'}}>
                    <i className="fab fa-node-js"></i>
                    <span>Node.js</span>
                  </div>
                  <div className="tech-node" style={{bottom: '10%', right: '20%'}}>
                    <i className="fas fa-database"></i>
                    <span>MongoDB</span>
                  </div>
                </div>
                <svg className="tech-connections">
                  <line x1="20%" y1="10%" x2="80%" y2="30%" className="connection-line" />
                  <line x1="80%" y1="30%" x2="20%" y2="80%" className="connection-line" />
                  <line x1="20%" y1="80%" x2="80%" y2="90%" className="connection-line" />
                </svg>
              </div>
              
              {/* Interactive Cursor-Controlled 3D Object */}
              <div 
                className="interactive-3d-object" 
                ref={interactiveObjectRef}
                style={{
                  transform: `perspective(1000px) rotateY(${localMousePosition.x * 25}deg) rotateX(${localMousePosition.y * -25}deg)`
                }}
              >
                <div className="object-container">
                  {/* Main 3D Structure */}
                  <div className="main-structure">
                    <div className="structure-core">
                      <div className="core-inner">
                        <i className="fas fa-atom"></i>
                      </div>
                      <div className="core-rings">
                        <div className="ring ring-outer" style={{
                          transform: `rotateZ(${localMousePosition.x * 180}deg)`
                        }}></div>
                        <div className="ring ring-middle" style={{
                          transform: `rotateX(90deg) rotateZ(${localMousePosition.y * 180}deg)`
                        }}></div>
                        <div className="ring ring-inner" style={{
                          transform: `rotateY(90deg) rotateZ(${(localMousePosition.x + localMousePosition.y) * 180}deg)`
                        }}></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="floating-elements">
                    <div className="floating-element element-1" style={{
                      transform: `translate3d(${localMousePosition.x * 30}px, ${localMousePosition.y * 30}px, ${localMousePosition.x * 20}px)`
                    }}>
                      <i className="fas fa-code"></i>
                    </div>
                    <div className="floating-element element-2" style={{
                      transform: `translate3d(${localMousePosition.x * -25}px, ${localMousePosition.y * 25}px, ${localMousePosition.y * 15}px)`
                    }}>
                      <i className="fas fa-microchip"></i>
                    </div>
                    <div className="floating-element element-3" style={{
                      transform: `translate3d(${localMousePosition.x * 35}px, ${localMousePosition.y * -20}px, ${localMousePosition.x * -15}px)`
                    }}>
                      <i className="fas fa-network-wired"></i>
                    </div>
                    <div className="floating-element element-4" style={{
                      transform: `translate3d(${localMousePosition.x * -20}px, ${localMousePosition.y * -30}px, ${localMousePosition.y * 25}px)`
                    }}>
                      <i className="fas fa-wifi"></i>
                    </div>
                  </div>
                  
                  {/* Energy Field */}
                  <div className="energy-field" style={{
                    transform: `scale(${1 + Math.abs(localMousePosition.x) * 0.1 + Math.abs(localMousePosition.y) * 0.1})`
                  }}>
                    <div className="field-layer layer-1"></div>
                    <div className="field-layer layer-2"></div>
                    <div className="field-layer layer-3"></div>
                  </div>
                  
                  {/* Particle Trails */}
                  <div className="particle-trails">
                    {[...Array(8)].map((_, i) => (
                      <div 
                        key={i}
                        className="particle-trail"
                        style={{
                          transform: `rotate(${i * 45 + localMousePosition.x * 30}deg) translateY(${-50 - Math.abs(localMousePosition.y) * 20}px)`,
                          opacity: 0.3 + Math.abs(localMousePosition.x) * 0.3 + Math.abs(localMousePosition.y) * 0.3
                        }}
                      >
                        <div className="trail-dot"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-container">
          <div className="scroll-text">SCROLL_TO_EXPLORE</div>
          <div className="scroll-arrow">
            <div className="arrow-line"></div>
            <div className="arrow-point"></div>
          </div>
          <div className="scroll-glow"></div>
        </div>
      </div>
      
      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="loading-spinner">
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
            </div>
            <div className="loading-text">INITIALIZING_NEURAL_INTERFACE</div>
            <div className="loading-progress">
              <div className="progress-bar"></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
