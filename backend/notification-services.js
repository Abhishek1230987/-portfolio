const nodemailer = require('nodemailer');
const axios = require('axios');

// Multiple notification services
class NotificationService {
  constructor() {
    this.services = [];
  }

  // Add different notification methods
  addService(service) {
    this.services.push(service);
  }

  // Send notifications through all configured services
  async sendNotification(contactData) {
    const notifications = [];
    
    for (const service of this.services) {
      try {
        const result = await service.send(contactData);
        notifications.push({ service: service.name, success: true, result });
      } catch (error) {
        notifications.push({ service: service.name, success: false, error: error.message });
      }
    }
    
    return notifications;
  }
}

// 1. Email Notification Service (using a free service)
class EmailNotificationService {
  constructor() {
    this.name = 'Email';
  }

  async send(contactData) {
    // Using EmailJS or similar free service
    const emailData = {
      to: 'abhishekkumarsingh5914@gmail.com',
      subject: `New Contact: ${contactData.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Subject:</strong> ${contactData.subject}</p>
        <p><strong>Message:</strong></p>
        <div style="border-left: 4px solid #007bff; padding-left: 15px;">
          ${contactData.message}
        </div>
        <p><em>Sent at: ${new Date().toLocaleString()}</em></p>
      `
    };

    // Using a free email service API
    return await this.sendViaFreeService(emailData);
  }

  async sendViaFreeService(emailData) {
    // Using EmailJS (free service)
    try {
      const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', {
        service_id: 'your_service_id',
        template_id: 'your_template_id',
        user_id: 'your_user_id',
        template_params: {
          to_email: emailData.to,
          subject: emailData.subject,
          message: emailData.html
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Email service failed: ' + error.message);
    }
  }
}

// 2. Discord Webhook Notification (FREE)
class DiscordNotificationService {
  constructor(webhookUrl) {
    this.name = 'Discord';
    this.webhookUrl = webhookUrl;
  }

  async send(contactData) {
    const discordMessage = {
      embeds: [{
        title: '📧 New Contact Form Submission',
        color: 0x007bff,
        fields: [
          { name: '👤 Name', value: contactData.name, inline: true },
          { name: '📧 Email', value: contactData.email, inline: true },
          { name: '📝 Subject', value: contactData.subject, inline: false },
          { name: '💬 Message', value: contactData.message.substring(0, 1000), inline: false }
        ],
        timestamp: new Date().toISOString(),
        footer: { text: 'Portfolio Contact Form' }
      }]
    };

    const response = await axios.post(this.webhookUrl, discordMessage);
    return response.data;
  }
}

// 3. Telegram Bot Notification (FREE)
class TelegramNotificationService {
  constructor(botToken, chatId) {
    this.name = 'Telegram';
    this.botToken = botToken;
    this.chatId = chatId;
  }

  async send(contactData) {
    const message = `
🚨 *New Contact Form Submission*

👤 *Name:* ${contactData.name}
📧 *Email:* ${contactData.email}
📝 *Subject:* ${contactData.subject}

💬 *Message:*
${contactData.message}

🕐 *Time:* ${new Date().toLocaleString()}
    `;

    const response = await axios.post(
      `https://api.telegram.org/bot${this.botToken}/sendMessage`,
      {
        chat_id: this.chatId,
        text: message,
        parse_mode: 'Markdown'
      }
    );
    return response.data;
  }
}

// 4. Slack Webhook Notification (FREE)
class SlackNotificationService {
  constructor(webhookUrl) {
    this.name = 'Slack';
    this.webhookUrl = webhookUrl;
  }

  async send(contactData) {
    const slackMessage = {
      text: "New Contact Form Submission",
      attachments: [{
        color: "good",
        fields: [
          { title: "Name", value: contactData.name, short: true },
          { title: "Email", value: contactData.email, short: true },
          { title: "Subject", value: contactData.subject, short: false },
          { title: "Message", value: contactData.message, short: false }
        ],
        footer: "Portfolio Contact Form",
        ts: Math.floor(Date.now() / 1000)
      }]
    };

    const response = await axios.post(this.webhookUrl, slackMessage);
    return response.data;
  }
}

// 5. Simple HTTP Webhook (for services like IFTTT, Zapier)
class WebhookNotificationService {
  constructor(webhookUrl) {
    this.name = 'Webhook';
    this.webhookUrl = webhookUrl;
  }

  async send(contactData) {
    const webhookData = {
      event: 'contact_form_submission',
      data: contactData,
      timestamp: new Date().toISOString()
    };

    const response = await axios.post(this.webhookUrl, webhookData);
    return response.data;
  }
}

// 6. Phone Notification via IFTTT (FREE)
class PhoneNotificationService {
  constructor(iftttKey, eventName) {
    this.name = 'Phone';
    this.iftttKey = iftttKey;
    this.eventName = eventName;
  }

  async send(contactData) {
    const iftttData = {
      value1: contactData.name,
      value2: contactData.email,
      value3: contactData.subject
    };

    const response = await axios.post(
      `https://maker.ifttt.com/trigger/${this.eventName}/with/key/${this.iftttKey}`,
      iftttData
    );
    return response.data;
  }
}

module.exports = {
  NotificationService,
  EmailNotificationService,
  DiscordNotificationService,
  TelegramNotificationService,
  SlackNotificationService,
  WebhookNotificationService,
  PhoneNotificationService
};
