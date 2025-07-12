const express = require('express');
const nodemailer = require('nodemailer');
const Contact = require('./models/Contact');
const connectDB = require('./config/database');
require('dotenv').config();

// Test email functionality completely
async function testEmailFunctionality() {
  console.log('🔧 COMPLETE EMAIL FUNCTIONALITY TEST\n');
  
  // Step 1: Check environment variables
  console.log('📋 Step 1: Environment Variables Check');
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***' + process.env.EMAIL_PASS.slice(-4) : 'NOT SET');
  console.log('NOTIFICATION_EMAIL:', process.env.NOTIFICATION_EMAIL);
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || 
      process.env.EMAIL_USER === 'your_email@gmail.com' || 
      process.env.EMAIL_PASS === 'your_app_password') {
    console.log('❌ Email credentials are not configured properly!');
    console.log('\n📝 TO FIX THIS:');
    console.log('1. Open your .env file');
    console.log('2. Replace EMAIL_USER=your_email@gmail.com with EMAIL_USER=your_actual_email@gmail.com');
    console.log('3. Replace EMAIL_PASS=your_app_password with EMAIL_PASS=your_16_character_app_password');
    console.log('4. Get Gmail App Password from: https://myaccount.google.com/apppasswords');
    console.log('\n⚠️  IMPORTANT: Use App Password, NOT your regular Gmail password!');
    return;
  }
  
  // Step 2: Test nodemailer configuration
  console.log('\n📧 Step 2: Nodemailer Configuration Test');
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
    console.log('🔍 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');
  } catch (error) {
    console.log('❌ SMTP verification failed:', error.message);
    return;
  }
  
  // Step 3: Test sending email
  console.log('\n📤 Step 3: Test Email Sending');
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL || 'abhishekkumarsingh5914@gmail.com',
      subject: 'Portfolio Contact Form Test - WORKING!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #28a745;">🎉 Email Functionality Test SUCCESS!</h2>
          <p>This email confirms that your portfolio contact form email functionality is working correctly.</p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Test Details:</strong></p>
            <p><strong>Name:</strong> Test User</p>
            <p><strong>Email:</strong> test@example.com</p>
            <p><strong>Subject:</strong> Test Contact Form</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-left: 4px solid #007bff; margin-top: 10px;">
              This is a test message to verify that the contact form email functionality is working properly.
            </div>
          </div>
          <hr>
          <p style="color: #666; font-size: 12px;">
            Test sent at: ${new Date().toLocaleString()}<br>
            From: ${process.env.EMAIL_USER}<br>
            To: ${process.env.NOTIFICATION_EMAIL || 'abhishekkumarsingh5914@gmail.com'}
          </p>
        </div>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    console.log('📬 Check your inbox at:', process.env.NOTIFICATION_EMAIL || 'abhishekkumarsingh5914@gmail.com');
    
  } catch (error) {
    console.log('❌ Email sending failed:', error.message);
    return;
  }
  
  // Step 4: Test database connection (optional)
  console.log('\n🗄️  Step 4: Database Connection Test');
  try {
    await connectDB();
    console.log('✅ Database connection successful!');
  } catch (error) {
    console.log('⚠️  Database connection failed (this won\'t prevent emails):', error.message);
  }
  
  // Step 5: Simulate contact form submission
  console.log('\n📝 Step 5: Simulate Contact Form Submission');
  try {
    const testContact = new Contact({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Contact Form',
      message: 'This is a test message to verify the contact form functionality.',
      ipAddress: '127.0.0.1',
      userAgent: 'Test User Agent'
    });
    
    await testContact.save();
    console.log('✅ Test contact saved to database!');
    
    // Send notification email
    const notificationOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL || 'abhishekkumarsingh5914@gmail.com',
      subject: 'Portfolio Contact: Test Contact Form',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> Test User</p>
            <p><strong>Email:</strong> test@example.com</p>
            <p><strong>Subject:</strong> Test Contact Form</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-left: 4px solid #007bff; margin-top: 10px;">
              This is a test message to verify the contact form functionality.
            </div>
          </div>
          <div style="color: #666; font-size: 12px; margin-top: 20px;">
            <p>IP Address: 127.0.0.1</p>
            <p>User Agent: Test User Agent</p>
            <p>Submitted: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `
    };
    
    const notificationInfo = await transporter.sendMail(notificationOptions);
    console.log('✅ Contact notification email sent successfully!');
    console.log('📧 Notification Message ID:', notificationInfo.messageId);
    
  } catch (error) {
    console.log('❌ Contact form simulation failed:', error.message);
  }
  
  console.log('\n🎉 EMAIL FUNCTIONALITY TEST COMPLETE!');
  console.log('If you received the test emails, your contact form is working correctly.');
  
  process.exit(0);
}

// Run the test
testEmailFunctionality().catch(console.error);
