# Portfolio Website Setup Guide

## MongoDB Atlas Setup

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Sign up for a free account
3. Create a new cluster (choose the free tier)
4. Name your cluster: `PortfolioCluster`

### 2. Create Database User
1. In Atlas dashboard, go to "Database Access"
2. Click "Add New Database User"
3. Username: `abhishekportfolio`
4. Password: Create a strong password (save this!)
5. Grant "Read and write to any database" permissions

### 3. Configure Network Access
1. Go to "Network Access" in Atlas dashboard
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Or add your specific IP address for better security

### 4. Get Connection String
1. Go to "Database" in Atlas dashboard
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password

### 5. Update .env File
Replace the MongoDB URI in your `.env` file:
```
MONGODB_URI=mongodb+srv://abhishekportfolio:YOUR_ACTUAL_PASSWORD@portfoliocluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

## Email Setup (Gmail)

### 1. Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Enable 2-factor authentication if not already enabled

### 2. Create App Password
1. Go to Google Account > Security
2. Under "Signing in to Google", click "App passwords"
3. Select "Mail" and "Other (custom name)"
4. Name it "Portfolio Website"
5. Copy the generated 16-character password

### 3. Update .env File
```
EMAIL_USER=your_actual_email@gmail.com
EMAIL_PASS=your_16_character_app_password
```

## Environment Variables Setup

Update your `.env` file with actual values:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb+srv://abhishekportfolio:YOUR_ACTUAL_PASSWORD@portfoliocluster.mongodb.net/portfolio?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Email Configuration (for contact form)
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

## Testing the Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm run dev
```

3. Test the contact form from your frontend
4. Check if you receive email notifications at abhishekkumarsingh5914@gmail.com

## Features Included

✅ **MongoDB Atlas Integration**: Cloud database that stores all messages
✅ **Email Notifications**: Sends emails to abhishekkumarsingh5914@gmail.com
✅ **Message Storage**: All contact form submissions are saved in MongoDB
✅ **Validation**: Input validation for all form fields
✅ **Rate Limiting**: Prevents spam submissions
✅ **Error Handling**: Comprehensive error handling
✅ **Security**: Helmet, CORS, and other security measures

## API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (admin)
- `GET /api/contact/:id` - Get specific message
- `PUT /api/contact/:id` - Update message status

## Next Steps

1. Follow the MongoDB Atlas setup above
2. Configure Gmail app password
3. Update your `.env` file with real values
4. Test the contact form
5. Deploy to production when ready

## Security Notes

- Never commit your `.env` file to version control
- Use strong passwords for your database
- Consider IP whitelisting for production
- Monitor your email usage to avoid spam flags
