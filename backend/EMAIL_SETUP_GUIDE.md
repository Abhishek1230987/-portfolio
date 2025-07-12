# 📧 Email Setup Guide - Step by Step

## The Problem
You're not receiving emails when people submit your contact form because your email configuration is incomplete. Your `.env` file has placeholder values instead of real email credentials.

## Quick Fix - Follow These Steps:

### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-factor authentication if not already enabled
3. This is required for App Passwords

### Step 2: Create Gmail App Password
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click "2-Step Verification"
3. Scroll down and click "App passwords"
4. Select "Mail" for the app type
5. Select "Other (custom name)" for device
6. Type "Portfolio Website" as the name
7. Click "Generate"
8. **Copy the 16-character password** (it looks like: `abcd efgh ijkl mnop`)

### Step 3: Update Your .env File
Open your `.env` file and replace these lines:

**Replace this:**
```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

**With your actual details:**
```env
EMAIL_USER=your_actual_email@gmail.com
EMAIL_PASS=abcdefghijklmnop
```

**Important Notes:**
- Use your actual Gmail address for `EMAIL_USER`
- Use the 16-character app password (no spaces) for `EMAIL_PASS`
- Do NOT use your regular Gmail password
- Keep `NOTIFICATION_EMAIL=abhishekkumarsingh5914@gmail.com` as is

### Step 4: Test Your Configuration
Run this command in your backend directory:
```bash
node setup-email.js
```

This will:
- Check if your environment variables are set
- Test the SMTP connection
- Send a test email to abhishekkumarsingh5914@gmail.com
- Show you any errors

### Step 5: Restart Your Server
After updating the `.env` file:
```bash
npm run dev
```

### Step 6: Test Contact Form
1. Go to your website
2. Fill out the contact form
3. Submit it
4. Check abhishekkumarsingh5914@gmail.com for the email

## Troubleshooting

### Error: "Invalid login"
- Make sure you're using the App Password, not your regular Gmail password
- The App Password should be 16 characters with no spaces
- Enable 2-factor authentication first

### Error: "Username and Password not accepted"
- Double-check your email address is correct
- Regenerate a new App Password
- Make sure there are no extra spaces in your .env file

### Still not working?
1. Check your spam folder
2. Make sure your .env file is in the backend directory
3. Restart your server after changing .env
4. Check server logs for error messages

## Example .env File
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb+srv://abhishekportfolio:YOUR_MONGODB_PASSWORD@portfoliocluster.mongodb.net/portfolio?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Email Configuration (UPDATE THESE VALUES)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_actual_email@gmail.com
EMAIL_PASS=your_16_character_app_password

# Your personal email where you want to receive notifications
NOTIFICATION_EMAIL=abhishekkumarsingh5914@gmail.com

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# File Upload Configuration
MAX_FILE_SIZE=5000000
UPLOAD_PATH=./uploads/
```

## What Happens After Setup
Once configured correctly:
1. Someone fills out your contact form
2. Their message gets saved to MongoDB
3. An email is sent to abhishekkumarsingh5914@gmail.com
4. The email contains their name, email, subject, and message
5. You get notified immediately!

## Security Tips
- Never commit your .env file to version control (it's already in .gitignore)
- Use App Passwords, not your regular Gmail password
- Consider using a dedicated email account for your portfolio
- Monitor your email usage to avoid being flagged as spam
