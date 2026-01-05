# TradeDrive - Full-Stack Automotive Platform

A comprehensive full-stack web application for automotive trading and management, featuring advanced user authentication, secure data management, and an intuitive admin panel.

## 🚀 Technologies

**Frontend:**
- HTML5
- JavaScript (ES6+)
- React 18.3
- Tailwind CSS
- Vite (Build Tool)
- React Router DOM
- Bootstrap 5.3

**Backend & Services:**
- Firebase Authentication
- MongoDB (Database)
- Express.js
- JWT Token Authentication
- Stripe Payment Integration

**Additional Libraries:**
- Chart.js (Analytics)
- EmailJS (Email Integration)
- React Chatbot Kit
- OpenAI Integration
- Google Maps API
- Swiper & PhotoSwipe

## ✨ Key Features

### Authentication & Security
- **User Authentication & Registration**: Implemented secure user authentication system using Firebase
- **Route Protection**: Restricted access to specific pages for non-authenticated users
- **JWT Token Management**: Secure token-based authentication for API requests
- **Firebase Integration**: Leveraged Firebase for real-time authentication and authorization

### Database & Storage
- **MongoDB Integration**: Secure storage of user data, vehicle listings, and transaction history
- **Data Encryption**: Ensured secure handling of sensitive user information

### Admin Panel
- **User Management**: Created comprehensive admin panel for managing users and permissions
- **Route Management**: Special route configuration for different user roles
- **Permission System**: Role-based access control for enhanced security
- **Analytics Dashboard**: Real-time insights into user activity and platform metrics

### Additional Features
- **Chatbot Integration**: AI-powered customer support
- **Payment Processing**: Stripe integration for secure transactions
- **Email Notifications**: Automated email system using EmailJS
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Maps**: Google Maps integration for dealer locations
- **Image Gallery**: Advanced photo viewing with PhotoSwipe

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration

1. Create a `.env` file in the root directory
2. Add your environment variables:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_MONGODB_URI=your_mongodb_uri
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
```

## 🏗️ Project Structure

```
src/
├── components/     # Reusable React components
├── pages/          # Page components
├── providers/      # Context providers (Auth, API)
├── routes/         # Route configuration & protection
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
└── config/         # Configuration files (Firebase, etc.)
```

## 👨‍💻 Development

Built with modern development practices:
- Component-based architecture
- Custom hooks for state management
- Protected routes for secure navigation
- Responsive design principles
- RESTful API integration

## 📄 License

See [LICENSE](LICENSE) file for details.

---

**Version:** 1.2.2  
**Last Updated:** January 2026
