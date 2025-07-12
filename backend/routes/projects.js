const express = require('express');
const { body, validationResult } = require('express-validator');
const Project = require('../models/Project');
const router = express.Router();

// GET /api/projects - Get all projects
router.get('/', async (req, res) => {
  try {
    const { featured, category, status } = req.query;
    
    let filter = {};
    if (featured !== undefined) filter.featured = featured === 'true';
    if (category) filter.category = category;
    if (status) filter.status = status;

    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
});

// GET /api/projects/:id - Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: error.message
    });
  }
});

// POST /api/projects - Create new project
router.post('/', [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('technologies').isArray().withMessage('Technologies must be an array'),
  body('category').optional().isIn(['web', 'mobile', 'desktop', 'ai', 'other']).withMessage('Invalid category')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const project = new Project(req.body);
    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    });
  }
});

// PUT /api/projects/:id - Update project
router.put('/:id', [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
  body('technologies').optional().isArray().withMessage('Technologies must be an array'),
  body('category').optional().isIn(['web', 'mobile', 'desktop', 'ai', 'other']).withMessage('Invalid category')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating project',
      error: error.message
    });
  }
});

// DELETE /api/projects/:id - Delete project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error.message
    });
  }
});

module.exports = router;
