const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const {
  NotificationService,
  DiscordNotificationService,
  TelegramNotificationService,
  WebhookNotificationService
} = require('../notification-services');
const simpleStorage = require('../simple-storage');
const router = express.Router();

// Try to use MongoDB, fallback to simple storage
let Contact = null;
let useSimpleStorage = false;

try {
  Contact = require('../models/Contact');
} catch (error) {
  console.log('📝 Using simple storage (MongoDB not available)');
  useSimpleStorage = true;
}

// Configure nodemailer transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

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

    // Save contact to database or simple storage
    let contact;
    
    if (useSimpleStorage || !Contact) {
      // Use simple storage
      contact = simpleStorage.saveContact({
        name,
        email,
        subject,
        message,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent') || ''
      });
      console.log('💾 Contact saved to simple storage:', contact.id);
    } else {
      // Use MongoDB
      try {
        contact = new Contact({
          name,
          email,
          subject,
          message,
          ipAddress: req.ip,
          userAgent: req.get('User-Agent') || ''
        });
        await contact.save();
        console.log('🎉 Contact saved to MongoDB:', contact._id);
      } catch (dbError) {
        console.log('📝 MongoDB failed, using simple storage:', dbError.message);
        contact = simpleStorage.saveContact({
          name,
          email,
          subject,
          message,
          ipAddress: req.ip,
          userAgent: req.get('User-Agent') || ''
        });
      }
    }

    // Send notifications through multiple channels
    try {
      const notificationService = new NotificationService();
      
      // Add Discord webhook notification if configured
      if (process.env.DISCORD_WEBHOOK_URL) {
        notificationService.addService(
          new DiscordNotificationService(process.env.DISCORD_WEBHOOK_URL)
        );
      }
      
      // Add Telegram notification if configured
      if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
        notificationService.addService(
          new TelegramNotificationService(
            process.env.TELEGRAM_BOT_TOKEN,
            process.env.TELEGRAM_CHAT_ID
          )
        );
      }
      
      // Add IFTTT webhook for phone notification if configured
      if (process.env.IFTTT_WEBHOOK_URL) {
        notificationService.addService(
          new WebhookNotificationService(process.env.IFTTT_WEBHOOK_URL)
        );
      }
      
      // Send notifications if any services are configured
      if (notificationService.services.length > 0) {
        const notificationResults = await notificationService.sendNotification({
          name,
          email,
          subject,
          message,
          timestamp: new Date().toISOString()
        });
        
        console.log('Notification results:', notificationResults);
      }
      
      // Still try email notification as fallback
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = createTransporter();
        
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.NOTIFICATION_EMAIL || 'abhishekkumarsingh5914@gmail.com',
          subject: `Portfolio Contact: ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
                New Contact Form Submission
              </h2>
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <div style="background-color: white; padding: 15px; border-left: 4px solid #007bff; margin-top: 10px;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
              <div style="color: #666; font-size: 12px; margin-top: 20px;">
                <p>IP Address: ${req.ip}</p>
                <p>User Agent: ${req.get('User-Agent') || 'N/A'}</p>
                <p>Submitted: ${new Date().toLocaleString()}</p>
              </div>
            </div>
          `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
      } else {
        console.warn('No notification services configured!');
      }
      
    } catch (notificationError) {
      console.error('Notification sending failed:', notificationError.message);
      // Don't fail the request if notifications fail
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

// GET /api/contact - Get all contact submissions (admin only)
router.get('/', async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    let filter = {};
    if (status) filter.status = status;

    const skip = (page - 1) * limit;
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Contact.countDocuments(filter);

    res.json({
      success: true,
      count: contacts.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message
    });
  }
});

// GET /api/contact/:id - Get single contact
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contact',
      error: error.message
    });
  }
});

// PUT /api/contact/:id - Update contact status
router.put('/:id', [
  body('status').optional().isIn(['new', 'read', 'replied']).withMessage('Invalid status')
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

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating contact',
      error: error.message
    });
  }
});

// Test email route (for debugging)
router.post('/test-email', async (req, res) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(400).json({
        success: false,
        message: 'Email configuration not set in environment variables'
      });
    }

    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL || 'abhishekkumarsingh5914@gmail.com',
      subject: 'Portfolio Email Test',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Email Test Successful!</h2>
          <p>This is a test email from your portfolio website.</p>
          <p>If you received this, your email configuration is working correctly.</p>
          <p>Sent at: ${new Date().toLocaleString()}</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    
    res.json({
      success: true,
      message: 'Test email sent successfully',
      messageId: info.messageId
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to send test email',
      error: error.message
    });
  }
});

module.exports = router;
