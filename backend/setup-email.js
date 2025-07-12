const nodemailer = require('nodemailer');
require('dotenv').config();

// Test email configuration
async function testEmailConfig() {
  console.log('🔧 Testing Email Configuration...\n');
  
  // Check if environment variables are set
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('❌ Email configuration incomplete:');
    console.log('- EMAIL_USER:', process.env.EMAIL_USER || 'NOT SET');
    console.log('- EMAIL_PASS:', process.env.EMAIL_PASS || 'NOT SET');
    console.log('\n📝 Please update your .env file with:');
    console.log('EMAIL_USER=your_actual_email@gmail.com');
    console.log('EMAIL_PASS=your_16_character_app_password');
    console.log('\n📖 Follow the setup guide in SETUP.md to create Gmail App Password');
    return;
  }
  
  console.log('✅ Environment variables found:');
  console.log('- EMAIL_USER:', process.env.EMAIL_USER);
  console.log('- EMAIL_PASS:', '***' + process.env.EMAIL_PASS.slice(-4));
  console.log('- NOTIFICATION_EMAIL:', process.env.NOTIFICATION_EMAIL || 'abhishekkumarsingh5914@gmail.com');
  
  // Test transporter
  const transporter = nodemailer.createTransport({
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
  
  try {
    console.log('\n🔍 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');
    
    console.log('\n📧 Sending test email...');
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL || 'abhishekkumarsingh5914@gmail.com',
      subject: 'Portfolio Email Test - Configuration Working!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #28a745;">🎉 Email Configuration Success!</h2>
          <p>Your portfolio website email configuration is working correctly.</p>
          <p>You should now receive emails when someone submits your contact form.</p>
          <hr>
          <p style="color: #666; font-size: 12px;">
            Test sent at: ${new Date().toLocaleString()}<br>
            From: ${process.env.EMAIL_USER}<br>
            To: ${process.env.NOTIFICATION_EMAIL || 'abhishekkumarsingh5914@gmail.com'}
          </p>
        </div>
      `
    });
    
    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    console.log('📬 Check your inbox at:', process.env.NOTIFICATION_EMAIL || 'abhishekkumarsingh5914@gmail.com');
    
  } catch (error) {
    console.log('❌ Email configuration failed:');
    console.log('Error:', error.message);
    
    if (error.message.includes('Invalid login')) {
      console.log('\n🔑 Common fixes for "Invalid login" error:');
      console.log('1. Make sure you are using an App Password, not your regular Gmail password');
      console.log('2. Enable 2-factor authentication on your Google account');
      console.log('3. Generate a new App Password from Google Account Security settings');
      console.log('4. Use the 16-character app password (no spaces)');
    }
  }
}

// Run the test
testEmailConfig().catch(console.error);
