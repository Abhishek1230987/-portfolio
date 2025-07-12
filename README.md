# 🚀 Modern Futuristic Portfolio Website

A cutting-edge, full-stack portfolio website built with React and Node.js, featuring a sleek cyberpunk-inspired design with dynamic animations and interactive components.

![Portfolio Preview](./preview.png)

## ✨ Features

### 🎨 Design & UI
- **Futuristic Cyberpunk Theme**: Dark backgrounds with neon accents
- **Responsive Design**: Mobile-first approach with seamless adaptation
- **Dynamic Animations**: Smooth transitions and interactive elements
- **Particle Background**: Animated particle system for visual appeal
- **Glitch Effects**: Eye-catching text animations
- **Gradient Accents**: Modern gradient overlays and borders

### 🔧 Technical Features
- **Full-Stack Architecture**: React frontend with Node.js/Express backend
- **MongoDB Database**: Robust data storage for projects and contacts
- **API Integration**: RESTful APIs for seamless data management
- **Email Notifications**: Contact form with automatic email alerts
- **Rate Limiting**: Protection against spam and abuse
- **Input Validation**: Comprehensive form validation
- **SEO Optimized**: Meta tags and semantic HTML structure

### 🌟 Interactive Components
- **Smooth Scrolling Navigation**: Seamless section navigation
- **Dynamic Skill Bars**: Animated progress indicators
- **Project Showcase**: Interactive project cards with hover effects
- **Contact Form**: Functional contact form with backend integration
- **Loading Animations**: Engaging loading states
- **Holographic Elements**: 3D rotating visual elements

## 🛠️ Tech Stack

### Frontend
- **React 18**: Modern React with hooks and context
- **React Router**: Client-side routing
- **Framer Motion**: Advanced animations and transitions
- **Styled Components**: CSS-in-JS styling
- **GSAP**: High-performance animations
- **Particles.js**: Interactive particle backgrounds
- **Font Awesome**: Icon library
- **Axios**: HTTP client for API requests

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **Nodemailer**: Email sending functionality
- **Express Validator**: Input validation middleware
- **Helmet**: Security middleware
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Request rate limiting

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file and configure environment variables
cp .env.example .env

# Edit .env file with your configurations:
# - MongoDB connection string
# - Email credentials
# - JWT secret
# - Other environment variables

# Start the backend server
npm run dev
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

### 4. Database Setup
```bash
# Make sure MongoDB is running
# The application will automatically create the database and collections
```

## 🔧 Environment Variables

### Backend (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/portfolio

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api
```

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set up environment variables on your hosting platform
2. Configure MongoDB connection (MongoDB Atlas recommended)
3. Deploy the backend code
4. Update CORS settings for production domain

### Frontend Deployment (Netlify/Vercel)
1. Build the React app: `npm run build`
2. Deploy the build folder to your hosting platform
3. Configure environment variables for production API URL
4. Set up redirects for client-side routing

## 📊 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `GET /api/contact/:id` - Get contact by ID
- `PUT /api/contact/:id` - Update contact status

### Skills
- `GET /api/skills` - Get skills data
- `GET /api/skills/categories` - Get skill categories
- `GET /api/skills/tech-cloud` - Get tech cloud data

### About
- `GET /api/about` - Get about information
- `GET /api/about/stats` - Get statistics
- `GET /api/about/experience` - Get work experience
- `GET /api/about/education` - Get education info

## 🎨 Customization

### Colors & Theming
Update CSS custom properties in `frontend/src/index.css`:
```css
:root {
  --primary-color: #00f5ff;
  --secondary-color: #ff6b6b;
  --accent-color: #4ecdc4;
  /* ... other variables */
}
```

### Content Management
- Update personal information in backend route files
- Modify project data in the projects API
- Customize about section content
- Add or remove skill categories

### Animations
- Modify Framer Motion animations in component files
- Adjust GSAP timelines for custom effects
- Update particle configurations in `utils/particles.js`

## 📱 Mobile Responsiveness

The website is fully responsive with:
- Mobile-first CSS approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized loading for mobile networks
- Accessible navigation on all devices

## 🔍 SEO Features

- Semantic HTML structure
- Meta tags optimization
- Open Graph tags
- Twitter Card support
- Fast loading performance
- Accessible design patterns

## 🧪 Testing

```bash
# Frontend testing
cd frontend
npm test

# Backend testing
cd backend
npm test
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help setting up the project:
- Create an issue on GitHub
- Email: abhishek@example.com
- LinkedIn: [Abhishek Kumar Singh](https://linkedin.com/in/abhisheksingh)

## 🙏 Acknowledgments

- Design inspiration from cyberpunk and sci-fi interfaces
- Open source libraries and their maintainers
- The React and Node.js communities
- Font Awesome for icons
- Google Fonts for typography

---

**Built with ❤️ by Abhishek Kumar Singh**
