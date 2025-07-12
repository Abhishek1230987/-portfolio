import axios from 'axios';

// Simple in-memory storage for messages (since we don't have MongoDB in serverless)
let contacts = [];
let idCounter = 1;

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { name, email, subject, message } = req.body;

      // Validation
      if (!name || !email || !subject || !message) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required'
        });
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email'
        });
      }

      // Save contact
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

      return res.status(201).json({
        success: true,
        message: 'Thank you for your message! I will get back to you soon.',
        data: {
          id: contact.id,
          name: contact.name,
          email: contact.email,
          subject: contact.subject,
          createdAt: contact.createdAt
        }
      });

    } catch (error) {
      console.error('Server error:', error);
      return res.status(500).json({
        success: false,
        message: 'Error submitting contact form',
        error: error.message
      });
    }
  }

  // GET method - return all contacts
  if (req.method === 'GET') {
    return res.json({
      success: true,
      count: contacts.length,
      data: contacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    });
  }

  // Method not allowed
  return res.status(405).json({
    success: false,
    message: 'Method not allowed'
  });
}
