const express = require('express');
const router = express.Router();

// GET /api/skills - Get all skills data
router.get('/', async (req, res) => {
  try {
    // Static skills data - in a real app, this could come from database
    const skillsData = {
      categories: [
        {
          name: 'Frontend Development',
          skills: [
            { name: 'HTML5/CSS3', level: 95 },
            { name: 'JavaScript', level: 90 },
            { name: 'React.js', level: 85 },
            { name: 'Vue.js', level: 80 },
            { name: 'TypeScript', level: 75 },
            { name: 'Sass/SCSS', level: 85 }
          ]
        },
        {
          name: 'Backend Development',
          skills: [
            { name: 'Node.js', level: 80 },
            { name: 'Express.js', level: 85 },
            { name: 'Python', level: 75 },
            { name: 'Java', level: 70 },
            { name: 'PHP', level: 65 }
          ]
        },
        {
          name: 'Database & Tools',
          skills: [
            { name: 'MongoDB', level: 80 },
            { name: 'MySQL', level: 75 },
            { name: 'PostgreSQL', level: 70 },
            { name: 'Redis', level: 65 },
            { name: 'Git', level: 90 }
          ]
        },
        {
          name: 'Cloud & DevOps',
          skills: [
            { name: 'AWS', level: 70 },
            { name: 'Docker', level: 75 },
            { name: 'Linux', level: 80 },
            { name: 'Nginx', level: 65 }
          ]
        }
      ],
      techCloud: [
        { name: 'React', category: 'Frontend', level: 85 },
        { name: 'Node.js', category: 'Backend', level: 80 },
        { name: 'JavaScript', category: 'Frontend', level: 90 },
        { name: 'Python', category: 'Backend', level: 75 },
        { name: 'MongoDB', category: 'Database', level: 80 },
        { name: 'CSS3', category: 'Frontend', level: 95 },
        { name: 'HTML5', category: 'Frontend', level: 95 },
        { name: 'Git', category: 'Tools', level: 90 },
        { name: 'Docker', category: 'DevOps', level: 75 },
        { name: 'AWS', category: 'Cloud', level: 70 },
        { name: 'Vue.js', category: 'Frontend', level: 80 },
        { name: 'Express.js', category: 'Backend', level: 85 },
        { name: 'TypeScript', category: 'Frontend', level: 75 },
        { name: 'MySQL', category: 'Database', level: 75 },
        { name: 'Linux', category: 'Tools', level: 80 }
      ]
    };

    res.json({
      success: true,
      data: skillsData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching skills data',
      error: error.message
    });
  }
});

// GET /api/skills/categories - Get skill categories
router.get('/categories', async (req, res) => {
  try {
    const categories = [
      'Frontend Development',
      'Backend Development',
      'Database & Tools',
      'Cloud & DevOps',
      'Mobile Development',
      'Design & UI/UX'
    ];

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching skill categories',
      error: error.message
    });
  }
});

// GET /api/skills/tech-cloud - Get technology cloud data
router.get('/tech-cloud', async (req, res) => {
  try {
    const techCloud = [
      { name: 'React', category: 'Frontend', level: 85, color: '#61DAFB' },
      { name: 'Node.js', category: 'Backend', level: 80, color: '#339933' },
      { name: 'JavaScript', category: 'Frontend', level: 90, color: '#F7DF1E' },
      { name: 'Python', category: 'Backend', level: 75, color: '#3776AB' },
      { name: 'MongoDB', category: 'Database', level: 80, color: '#47A248' },
      { name: 'CSS3', category: 'Frontend', level: 95, color: '#1572B6' },
      { name: 'HTML5', category: 'Frontend', level: 95, color: '#E34F26' },
      { name: 'Git', category: 'Tools', level: 90, color: '#F05032' },
      { name: 'Docker', category: 'DevOps', level: 75, color: '#2496ED' },
      { name: 'AWS', category: 'Cloud', level: 70, color: '#FF9900' },
      { name: 'Vue.js', category: 'Frontend', level: 80, color: '#4FC08D' },
      { name: 'Express.js', category: 'Backend', level: 85, color: '#000000' },
      { name: 'TypeScript', category: 'Frontend', level: 75, color: '#007ACC' },
      { name: 'MySQL', category: 'Database', level: 75, color: '#4479A1' },
      { name: 'Linux', category: 'Tools', level: 80, color: '#FCC624' }
    ];

    res.json({
      success: true,
      data: techCloud
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tech cloud data',
      error: error.message
    });
  }
});

module.exports = router;
