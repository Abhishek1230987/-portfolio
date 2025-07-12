const axios = require('axios');
require('dotenv').config();

// Test Discord notification functionality
async function testDiscordNotification() {
  console.log('🔧 Testing Discord Notification...\n');
  
  // Check if Discord webhook URL is configured
  if (!process.env.DISCORD_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL === 'https://discord.com/api/webhooks/YOUR_DISCORD_WEBHOOK_URL_HERE') {
    console.log('❌ Discord webhook URL not configured!');
    console.log('Current value:', process.env.DISCORD_WEBHOOK_URL || 'NOT SET');
    console.log('\n📝 To fix this:');
    console.log('1. Create Discord webhook (see DISCORD_SETUP_COMPLETE.md)');
    console.log('2. Update .env file with your webhook URL');
    console.log('3. Run this test again');
    return;
  }
  
  console.log('✅ Discord webhook URL found:', process.env.DISCORD_WEBHOOK_URL);
  
  // Test Discord message
  try {
    console.log('\n📤 Sending test message to Discord...');
    
    const testMessage = {
      embeds: [{
        title: '🚀 Portfolio Contact System Test',
        color: 0x00ff00,
        fields: [
          { name: '👤 Name', value: 'Test User', inline: true },
          { name: '📧 Email', value: 'test@example.com', inline: true },
          { name: '📝 Subject', value: 'Discord Notification Test', inline: false },
          { name: '💬 Message', value: 'This is a test message to verify that Discord notifications are working correctly for your portfolio contact form!', inline: false }
        ],
        timestamp: new Date().toISOString(),
        footer: { text: 'Portfolio Contact Form - Test Message' }
      }]
    };
    
    const response = await axios.post(process.env.DISCORD_WEBHOOK_URL, testMessage);
    
    console.log('✅ Discord notification sent successfully!');
    console.log('📧 Message ID:', response.headers['x-ratelimit-remaining'] ? 'Sent' : 'Delivered');
    console.log('📬 Check your Discord channel for the test message!');
    
    console.log('\n🎉 Discord notification system is working correctly!');
    console.log('Your portfolio will now send notifications when people contact you.');
    
  } catch (error) {
    console.log('❌ Discord notification failed:', error.message);
    
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Error:', error.response.data);
    }
    
    console.log('\n🔧 Common fixes:');
    console.log('- Check webhook URL is correct and complete');
    console.log('- Verify Discord channel exists and allows webhooks');
    console.log('- Make sure you have permission to create webhooks');
  }
}

// Test contact form endpoint
async function testContactForm() {
  console.log('\n🔧 Testing Contact Form with Discord Notification...\n');
  
  try {
    const testContactData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Contact Form Test',
      message: 'This is a test message from the contact form to verify Discord notifications are working.'
    };
    
    console.log('📤 Submitting test contact form...');
    
    const response = await axios.post('http://localhost:5000/api/contact', testContactData, {
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.data.success) {
      console.log('✅ Contact form submitted successfully!');
      console.log('📧 Contact ID:', response.data.data.id);
      console.log('📬 Check your Discord channel for the notification!');
    } else {
      console.log('❌ Contact form submission failed:', response.data.message);
    }
    
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('❌ Server not running. Start server with: npm run dev');
    } else {
      console.log('❌ Contact form test failed:', error.message);
    }
  }
}

// Run tests
async function runAllTests() {
  await testDiscordNotification();
  console.log('\n' + '='.repeat(50) + '\n');
  await testContactForm();
}

runAllTests().catch(console.error);
