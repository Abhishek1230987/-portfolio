const express = require('express');
const { body, validationResult } = require('express-validator');
const axios = require('axios');
const router = express.Router();

// Simple in-memory storage for contacts when MongoDB is not available
let contacts = [];
let idCounter = 1;

// Try to use MongoDB, fallback to simple storage
let Contact = null;
let useSimpleStorage = false;

try {
  Contact = require('../models/Contact');
} catch (error) {
  console.log('📝 Using simple storage (MongoDB not available)');
  useSimpleStorage = true;
}


// POST /api/contact - Submit contact form
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required')
    .isLength({ max: 50 }).withMessage('Name cannot exceed 50 characters'),
  body('email').trim().isEmail().withMessage('Please provide a valid email'),
  body('subject').trim().notEmpty().withMessage('Subject is required')
    .isLength({ max: 100 }).withMessage('Subject cannot exceed 100 characters'),
  body('message').trim().notEmpty().withMessage('Message is required')
    .isLength({ max: 1000 }).withMessage('Message cannot exceed 1000 characters')
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

    const { name, email, subject, message } = req.body;

    // Save contact to simple storage (in-memory)
    const contact = {
      id: idCounter++,
      name,
      email,
      subject,
      message,
      status: 'new',
      createdAt: new Date().toISOString(),
      ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'] || ''
    };

    contacts.push(contact);
    console.log('💾 Contact saved:', contact.id);

    // Send Discord notification
    if (process.env.DISCORD_WEBHOOK_URL) {
      try {
        const discordMessage = {
          embeds: [{
            title: '📧 New Contact Form Submission',
            color: 0x007bff,
            fields: [
              { name: '👤 Name', value: name, inline: true },
              { name: '📧 Email', value: email, inline: true },
              { name: '📝 Subject', value: subject, inline: false },
              { name: '💬 Message', value: message.substring(0, 1000), inline: false }
            ],
            timestamp: new Date().toISOString(),
            footer: { text: 'Portfolio Contact Form' }
          }]
        };

        await axios.post(process.env.DISCORD_WEBHOOK_URL, discordMessage, {
          timeout: 5000
        });
        
        console.log('✅ Discord notification sent successfully');
      } catch (discordError) {
        console.error('❌ Discord notification failed:', discordError.message);
        // Don't fail the request if Discord fails
      }
    } else {
      console.warn('⚠️ Discord webhook URL not configured');
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      data: {
        id: contact._id || contact.id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        createdAt: contact.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting contact form',
      error: error.message
    });
  }
});

// GET /api/contact - Get all stored contacts from memory
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      count: contacts.length,
      data: contacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message
    });
  }
});

module.exports = router;
