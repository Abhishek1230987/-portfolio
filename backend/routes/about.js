const express = require('express');
const router = express.Router();

// GET /api/about - Get about information
router.get('/', async (req, res) => {
  try {
    const aboutData = {
      personalInfo: {
        name: 'Abhishek Kumar Singh',
        title: 'Full Stack Developer & UI/UX Designer',
        location: 'India',
        email: 'abhishek@example.com',
        phone: '+91 12345 67890',
        bio: `I'm a passionate Full Stack Developer with expertise in creating innovative digital solutions. 
              My journey in tech spans across multiple domains, from crafting intuitive user interfaces to 
              building robust backend systems. I love turning complex problems into simple, beautiful and 
              intuitive designs.`,
        resumeUrl: '/uploads/resume.pdf'
      },
      stats: [
        { label: 'Projects Completed', value: 50, suffix: '+' },
        { label: 'Years Experience', value: 3, suffix: '+' },
        { label: 'Happy Clients', value: 100, suffix: '%' },
        { label: 'Code Commits', value: 1000, suffix: '+' }
      ],
      experience: [
        {
          title: 'Senior Full Stack Developer',
          company: 'Tech Solutions Inc.',
          location: 'Remote',
          duration: '2022 - Present',
          description: 'Led development of multiple web applications using React, Node.js, and MongoDB. Collaborated with cross-functional teams to deliver high-quality software solutions.',
          technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker']
        },
        {
          title: 'Frontend Developer',
          company: 'Digital Agency',
          location: 'Mumbai, India',
          duration: '2021 - 2022',
          description: 'Developed responsive web applications and e-commerce platforms. Worked closely with designers to implement pixel-perfect UI designs.',
          technologies: ['HTML5', 'CSS3', 'JavaScript', 'Vue.js', 'Sass']
        },
        {
          title: 'Junior Web Developer',
          company: 'StartUp Solutions',
          location: 'Delhi, India',
          duration: '2020 - 2021',
          description: 'Built and maintained company websites and web applications. Learned best practices in web development and agile methodologies.',
          technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL']
        }
      ],
      education: [
        {
          degree: 'Bachelor of Technology',
          field: 'Computer Science Engineering',
          institution: 'Indian Institute of Technology',
          location: 'India',
          duration: '2016 - 2020',
          grade: 'First Class with Distinction'
        },
        {
          degree: 'Higher Secondary',
          field: 'Science (PCM)',
          institution: 'Central Board of Secondary Education',
          location: 'India',
          duration: '2014 - 2016',
          grade: '92%'
        }
      ],
      certifications: [
        {
          name: 'AWS Certified Developer',
          issuer: 'Amazon Web Services',
          date: '2023',
          credentialId: 'AWS-DEV-2023-001'
        },
        {
          name: 'Google Cloud Professional',
          issuer: 'Google Cloud',
          date: '2022',
          credentialId: 'GCP-PRO-2022-001'
        },
        {
          name: 'Meta Frontend Developer',
          issuer: 'Meta',
          date: '2021',
          credentialId: 'META-FE-2021-001'
        }
      ],
      socialLinks: [
        {
          platform: 'GitHub',
          url: 'https://github.com/abhisheksingh',
          icon: 'fab fa-github'
        },
        {
          platform: 'LinkedIn',
          url: 'https://linkedin.com/in/abhisheksingh',
          icon: 'fab fa-linkedin'
        },
        {
          platform: 'Twitter',
          url: 'https://twitter.com/abhisheksingh',
          icon: 'fab fa-twitter'
        },
        {
          platform: 'Instagram',
          url: 'https://instagram.com/abhisheksingh',
          icon: 'fab fa-instagram'
        }
      ]
    };

    res.json({
      success: true,
      data: aboutData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching about information',
      error: error.message
    });
  }
});

// GET /api/about/stats - Get statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = [
      { label: 'Projects Completed', value: 50, suffix: '+', icon: 'fas fa-project-diagram' },
      { label: 'Years Experience', value: 3, suffix: '+', icon: 'fas fa-calendar-alt' },
      { label: 'Happy Clients', value: 100, suffix: '%', icon: 'fas fa-smile' },
      { label: 'Code Commits', value: 1000, suffix: '+', icon: 'fas fa-code-branch' }
    ];

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
});

// GET /api/about/experience - Get work experience
router.get('/experience', async (req, res) => {
  try {
    const experience = [
      {
        title: 'Senior Full Stack Developer',
        company: 'Tech Solutions Inc.',
        location: 'Remote',
        duration: '2022 - Present',
        description: 'Led development of multiple web applications using React, Node.js, and MongoDB. Collaborated with cross-functional teams to deliver high-quality software solutions.',
        technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
        achievements: [
          'Led a team of 5 developers',
          'Improved application performance by 40%',
          'Implemented CI/CD pipeline',
          'Mentored junior developers'
        ]
      },
      {
        title: 'Frontend Developer',
        company: 'Digital Agency',
        location: 'Mumbai, India',
        duration: '2021 - 2022',
        description: 'Developed responsive web applications and e-commerce platforms. Worked closely with designers to implement pixel-perfect UI designs.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Vue.js', 'Sass'],
        achievements: [
          'Developed 15+ responsive websites',
          'Reduced page load time by 50%',
          'Implemented modern CSS frameworks',
          'Collaborated with UX/UI designers'
        ]
      },
      {
        title: 'Junior Web Developer',
        company: 'StartUp Solutions',
        location: 'Delhi, India',
        duration: '2020 - 2021',
        description: 'Built and maintained company websites and web applications. Learned best practices in web development and agile methodologies.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
        achievements: [
          'Built first commercial website',
          'Learned agile methodologies',
          'Contributed to open source projects',
          'Maintained legacy systems'
        ]
      }
    ];

    res.json({
      success: true,
      data: experience
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching experience',
      error: error.message
    });
  }
});

// GET /api/about/education - Get education information
router.get('/education', async (req, res) => {
  try {
    const education = [
      {
        degree: 'Bachelor of Technology',
        field: 'Computer Science Engineering',
        institution: 'Indian Institute of Technology',
        location: 'India',
        duration: '2016 - 2020',
        grade: 'First Class with Distinction',
        description: 'Focused on software engineering, algorithms, and data structures. Participated in coding competitions and hackathons.'
      },
      {
        degree: 'Higher Secondary',
        field: 'Science (PCM)',
        institution: 'Central Board of Secondary Education',
        location: 'India',
        duration: '2014 - 2016',
        grade: '92%',
        description: 'Studied Physics, Chemistry, and Mathematics. Developed strong analytical and problem-solving skills.'
      }
    ];

    res.json({
      success: true,
      data: education
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching education information',
      error: error.message
    });
  }
});

module.exports = router;
