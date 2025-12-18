# Kloudsavvy LMS - Learning Management System

A comprehensive Learning Management System for Kloudsavvy Solutions Pvt Ltd, an Edutech startup company providing virtual/in-person trainings on Azure Cloud, Azure DevOps, Terraform, Docker, Kubernetes, Ansible, and more.

## Features

- **Student Authentication**: Secure login and registration system
- **Course Management**: Browse and enroll in various technology courses
- **Recorded Sessions**: Watch expert-led training sessions at your own pace
- **Interactive Quizzes**: Test your knowledge with comprehensive quizzes
- **Hands-On Labs**: Practice with real-world scenarios
- **Student Dashboard**: Track progress, enrolled courses, and achievements
- **Progress Tracking**: Monitor completed sessions, quiz scores, and lab completions

## Technology Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcrypt.js for password hashing
- Express Validator for input validation

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Responsive design
- RESTful API integration

## Course Categories

- ☁️ Azure Cloud
- 🔧 Azure DevOps
- 🏗️ Terraform
- 🐳 Docker
- ⚓ Kubernetes
- 🤖 Ansible
- 📚 Other Technologies

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)

### Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/Purna7/Kloudsavvy_LMS.git
cd Kloudsavvy_LMS
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kloudsavvy_lms
JWT_SECRET=your_secure_jwt_secret_key
NODE_ENV=development
```

4. Start MongoDB:
```bash
# On Linux/Mac
sudo systemctl start mongod

# On Windows
net start MongoDB
```

5. Start the application:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

6. Access the application:
Open your browser and navigate to `http://localhost:5000`

## Project Structure

```
Kloudsavvy_LMS/
├── server/
│   ├── config/
│   │   └── db.js              # Database connection
│   ├── models/
│   │   ├── User.js            # User model
│   │   ├── Course.js          # Course model
│   │   ├── Quiz.js            # Quiz model
│   │   └── Lab.js             # Lab model
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   ├── courses.js         # Course routes
│   │   ├── quizzes.js         # Quiz routes
│   │   └── labs.js            # Lab routes
│   └── middleware/
│       └── auth.js            # Authentication middleware
├── public/
│   ├── css/
│   │   └── styles.css         # Application styles
│   ├── js/
│   │   ├── auth.js            # Authentication utilities
│   │   ├── main.js            # Homepage scripts
│   │   ├── login.js           # Login page scripts
│   │   ├── register.js        # Registration scripts
│   │   ├── dashboard.js       # Dashboard scripts
│   │   ├── courses.js         # Courses page scripts
│   │   └── course-detail.js   # Course detail scripts
│   ├── pages/
│   │   ├── login.html         # Login page
│   │   ├── register.html      # Registration page
│   │   ├── dashboard.html     # Student dashboard
│   │   ├── courses.html       # My courses page
│   │   └── course-detail.html # Course detail page
│   └── index.html             # Homepage
├── server.js                  # Application entry point
├── package.json               # Project dependencies
└── README.md                  # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new student
- `POST /api/auth/login` - Student login
- `GET /api/auth/me` - Get current user

### Courses
- `GET /api/courses` - Get all published courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses/:id/enroll` - Enroll in a course
- `GET /api/courses/user/enrolled` - Get enrolled courses
- `POST /api/courses/:courseId/sessions/:sessionId/complete` - Mark session as completed

### Quizzes
- `GET /api/quizzes/course/:courseId` - Get quizzes for a course
- `POST /api/quizzes/:id/submit` - Submit quiz answers
- `GET /api/quizzes/:id/results` - Get quiz results

### Labs
- `GET /api/labs/course/:courseId` - Get labs for a course
- `GET /api/labs/:id` - Get lab details
- `POST /api/labs/:id/complete` - Mark lab as completed

## User Roles

- **Student**: Can enroll in courses, watch sessions, take quizzes, and complete labs
- **Instructor**: Can create and manage courses (future feature)
- **Admin**: Full system access (future feature)

## Features for Students

1. **Browse Courses**: View all available courses with categories and levels
2. **Enroll**: One-click enrollment in courses
3. **Watch Sessions**: Access recorded training sessions
4. **Take Quizzes**: Test knowledge with interactive quizzes
5. **Hands-On Labs**: Practice with guided lab exercises
6. **Track Progress**: Monitor learning journey on dashboard
7. **View Statistics**: See completed sessions, quiz scores, and lab completions

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected API endpoints
- Input validation and sanitization
- Secure session management

## Future Enhancements

- Live virtual classroom integration
- Certificate generation upon course completion
- Discussion forums and Q&A
- Assignment submissions
- Instructor dashboard for course management
- Admin panel for user and content management
- Payment integration for premium courses
- Mobile application
- Video streaming integration
- Advanced analytics and reporting

## Contributing

This is a proprietary project for Kloudsavvy Solutions Pvt Ltd. For any contributions or suggestions, please contact the development team.

## License

Copyright © 2025 Kloudsavvy Solutions Pvt Ltd. All rights reserved.

## Support

For support, please contact: support@kloudsavvy.com

---

**Kloudsavvy Solutions Pvt Ltd** - Empowering careers through cloud technology education