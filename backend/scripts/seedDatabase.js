const mongoose = require('mongoose');
const Project = require('../models/Project');
const Contact = require('../models/Contact');
require('dotenv').config();

// Sample projects data
const sampleProjects = [
  {
    title: 'Neural Network Portfolio',
    description: 'A cutting-edge portfolio website built with React and Node.js, featuring AI-powered animations and dynamic content management. Includes real-time data visualization and advanced user interaction patterns.',
    technologies: ['React', 'Node.js', 'MongoDB', 'TensorFlow.js', 'Three.js'],
    category: 'web',
    featured: true,
    status: 'completed',
    githubUrl: 'https://github.com/abhisheksingh/neural-portfolio',
    liveUrl: 'https://neural-portfolio.vercel.app',
    imageUrl: '/uploads/neural-portfolio.jpg',
    order: 1
  },
  {
    title: 'CyberCommerce Platform',
    description: 'A futuristic e-commerce platform with advanced product visualization, AR try-on features, and blockchain-based payments. Built with microservices architecture for scalability.',
    technologies: ['Next.js', 'GraphQL', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
    category: 'web',
    featured: true,
    status: 'completed',
    githubUrl: 'https://github.com/abhisheksingh/cyber-commerce',
    liveUrl: 'https://cyber-commerce.com',
    imageUrl: '/uploads/cyber-commerce.jpg',
    order: 2
  },
  {
    title: 'AI Task Orchestrator',
    description: 'An intelligent task management system powered by machine learning algorithms for automatic task prioritization, deadline prediction, and team collaboration optimization.',
    technologies: ['Vue.js', 'Python', 'FastAPI', 'TensorFlow', 'Socket.io', 'MySQL'],
    category: 'ai',
    featured: true,
    status: 'completed',
    githubUrl: 'https://github.com/abhisheksingh/ai-task-orchestrator',
    liveUrl: 'https://ai-tasks.io',
    imageUrl: '/uploads/ai-task-orchestrator.jpg',
    order: 3
  },
  {
    title: 'Quantum Analytics Dashboard',
    description: 'Real-time data visualization platform with quantum-inspired algorithms for pattern recognition and predictive analytics. Features interactive 3D charts and immersive data exploration.',
    technologies: ['D3.js', 'WebGL', 'Python', 'Apache Kafka', 'ClickHouse'],
    category: 'web',
    featured: true,
    status: 'completed',
    githubUrl: 'https://github.com/abhisheksingh/quantum-analytics',
    liveUrl: 'https://quantum-analytics.tech',
    imageUrl: '/uploads/quantum-analytics.jpg',
    order: 4
  },
  {
    title: 'Holographic Chat Interface',
    description: 'Next-generation chat application with holographic avatars, spatial audio, and gesture recognition. Built for VR/AR environments with cross-platform compatibility.',
    technologies: ['Unity', 'C#', 'WebRTC', 'ARCore', 'ARKit', 'Node.js'],
    category: 'mobile',
    featured: false,
    status: 'in-progress',
    githubUrl: 'https://github.com/abhisheksingh/holographic-chat',
    liveUrl: '',
    imageUrl: '/uploads/holographic-chat.jpg',
    order: 5
  },
  {
    title: 'Blockchain Identity Vault',
    description: 'Decentralized identity management system with biometric authentication, zero-knowledge proofs, and cross-chain compatibility for secure digital identity verification.',
    technologies: ['Solidity', 'React Native', 'IPFS', 'Web3.js', 'Ethereum'],
    category: 'mobile',
    featured: false,
    status: 'completed',
    githubUrl: 'https://github.com/abhisheksingh/blockchain-identity',
    liveUrl: 'https://identity-vault.crypto',
    imageUrl: '/uploads/blockchain-identity.jpg',
    order: 6
  },
  {
    title: 'Quantum Code Editor',
    description: 'AI-powered code editor with quantum computing support, real-time collaboration, and intelligent code completion using advanced language models.',
    technologies: ['Electron', 'Monaco Editor', 'Python', 'Qiskit', 'WebSockets'],
    category: 'desktop',
    featured: false,
    status: 'completed',
    githubUrl: 'https://github.com/abhisheksingh/quantum-editor',
    liveUrl: 'https://quantum-editor.dev',
    imageUrl: '/uploads/quantum-editor.jpg',
    order: 7
  },
  {
    title: 'Neural Style Transfer API',
    description: 'High-performance REST API for real-time artistic style transfer using advanced neural networks. Includes batch processing and custom model training capabilities.',
    technologies: ['Python', 'TensorFlow', 'Flask', 'Redis', 'Docker', 'AWS'],
    category: 'ai',
    featured: false,
    status: 'completed',
    githubUrl: 'https://github.com/abhisheksingh/neural-style-api',
    liveUrl: 'https://api.neural-style.ai',
    imageUrl: '/uploads/neural-style-api.jpg',
    order: 8
  }
];

// Sample contact data
const sampleContacts = [
  {
    name: 'Sarah Chen',
    email: 'sarah.chen@techcorp.com',
    subject: 'Full Stack Developer Position',
    message: 'Hi Abhishek, I came across your impressive portfolio and would love to discuss a senior full stack position at our company. Your work on the Neural Network Portfolio caught our attention.',
    status: 'new',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  },
  {
    name: 'Marcus Rodriguez',
    email: 'marcus@startup.io',
    subject: 'Collaboration Opportunity',
    message: 'Your AI Task Orchestrator project aligns perfectly with our startup vision. Would you be interested in a technical co-founder role?',
    status: 'read',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
  },
  {
    name: 'Dr. Emily Watson',
    email: 'e.watson@university.edu',
    subject: 'Research Collaboration',
    message: 'I\'m conducting research on quantum computing applications in web development. Your Quantum Analytics Dashboard is fascinating. Could we schedule a discussion?',
    status: 'replied',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');
    
    // Clear existing data
    await Project.deleteMany({});
    await Contact.deleteMany({});
    console.log('🧹 Cleared existing data');
    
    // Insert sample projects
    const projects = await Project.insertMany(sampleProjects);
    console.log(`📦 Inserted ${projects.length} projects`);
    
    // Insert sample contacts
    const contacts = await Contact.insertMany(sampleContacts);
    console.log(`📧 Inserted ${contacts.length} contacts`);
    
    console.log('\n🎉 Database seeded successfully!\n');
    
    // Display summary
    console.log('📊 SUMMARY:');
    console.log(`   • ${projects.length} Projects created`);
    console.log(`   • ${contacts.length} Contacts created`);
    console.log(`   • ${projects.filter(p => p.featured).length} Featured projects`);
    console.log(`   • ${projects.filter(p => p.status === 'completed').length} Completed projects`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    process.exit(0);
  }
};

// Run the seeding script
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
