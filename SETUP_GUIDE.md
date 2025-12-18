# Kloudsavvy LMS - Setup and Testing Guide

## Quick Start Guide

### 1. Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher) - [Download](https://nodejs.org/)
- MongoDB (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- Git - [Download](https://git-scm.com/downloads)

### 2. Installation Steps

#### Step 1: Clone the Repository
```bash
git clone https://github.com/Purna7/Kloudsavvy_LMS.git
cd Kloudsavvy_LMS
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Configure Environment
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env file with your configuration
# You can use the default values for local development
```

Default `.env` configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kloudsavvy_lms
JWT_SECRET=kloudsavvy_secure_jwt_secret_key_2025
NODE_ENV=development
```

#### Step 4: Start MongoDB

**On Windows:**
```bash
net start MongoDB
```

**On macOS/Linux:**
```bash
sudo systemctl start mongod
# or
sudo service mongod start
```

**Verify MongoDB is running:**
```bash
# Connect to MongoDB shell
mongosh
# or
mongo
```

#### Step 5: Seed the Database (Optional but Recommended)

This will create sample courses, quizzes, labs, and test users:

```bash
npm run seed
```

**Sample Login Credentials Created:**
- Student: `student@kloudsavvy.com` / `student123`
- Instructor: `instructor@kloudsavvy.com` / `instructor123`

#### Step 6: Start the Application

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The application will start on `http://localhost:5000`

### 3. Access the Application

Open your browser and navigate to:
```
http://localhost:5000
```

## Testing the Application

### Manual Testing Guide

#### 1. Test Student Registration
1. Navigate to `http://localhost:5000`
2. Click "Register" in the navigation bar
3. Fill in the registration form:
   - Full Name: Test Student
   - Email: test@example.com
   - Password: test123456
   - Confirm Password: test123456
4. Click "Register"
5. You should be redirected to the dashboard

#### 2. Test Student Login
1. Navigate to `http://localhost:5000`
2. Click "Login" in the navigation bar
3. Use sample credentials:
   - Email: student@kloudsavvy.com
   - Password: student123
4. Click "Login"
5. You should be redirected to the dashboard

#### 3. Test Course Browsing
1. On the homepage, scroll to "Available Courses" section
2. You should see sample courses (if you ran the seed script)
3. Each course card displays:
   - Course category icon
   - Course title
   - Description
   - Level and duration
   - Enroll button

#### 4. Test Course Enrollment
1. Login as a student
2. Navigate to the homepage
3. Click "Enroll Now" on any course
4. You should be redirected to the dashboard
5. The enrolled course should appear in "My Enrolled Courses"

#### 5. Test Student Dashboard
1. Login as a student
2. Navigate to "Dashboard" in the navigation
3. Verify the following are displayed:
   - Welcome message with your name
   - Statistics cards (Enrolled Courses, Completed Sessions, Quizzes Taken, Labs Completed)
   - List of enrolled courses

#### 6. Test Course Details and Sessions
1. Login as a student
2. Navigate to "My Courses"
3. Click "View Course" on any enrolled course
4. You should see:
   - Course header with details
   - Tabs: Sessions, Quizzes, Labs
   - List of video sessions
5. Click on a session to "play" it (it will show an alert in demo mode)

#### 7. Test Quizzes
1. In a course detail page, click the "Quizzes" tab
2. You should see available quizzes
3. Click "Take Quiz" (note: full quiz functionality shows placeholder)
4. Quiz details should display:
   - Number of questions
   - Time limit
   - Passing score

#### 8. Test Hands-On Labs
1. In a course detail page, click the "Labs" tab
2. You should see available labs
3. Lab details should display:
   - Description
   - Difficulty level
   - Estimated time
   - Instructions
   - Task list
4. Click "Mark as Completed" to complete a lab

#### 9. Test Navigation and Logout
1. While logged in, verify all navigation links work:
   - Home
   - My Courses
   - Dashboard
2. Click "Logout" in the navigation
3. You should be redirected to the homepage
4. Verify that protected pages (Dashboard, My Courses) redirect to login when not authenticated

### API Testing with cURL or Postman

#### Register a New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "testuser@example.com",
    "password": "password123"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@kloudsavvy.com",
    "password": "student123"
  }'
```

#### Get All Courses (No Auth Required)
```bash
curl http://localhost:5000/api/courses
```

#### Get Current User (Requires Auth)
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

#### Enroll in Course (Requires Auth)
```bash
curl -X POST http://localhost:5000/api/courses/COURSE_ID/enroll \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

## Troubleshooting

### Issue: MongoDB Connection Error
**Solution:**
1. Ensure MongoDB is running: `mongosh` or `mongo`
2. Check MongoDB URI in `.env` file
3. Verify MongoDB is listening on port 27017

### Issue: Port 5000 Already in Use
**Solution:**
1. Change the PORT in `.env` file to another port (e.g., 3000, 8080)
2. Restart the application

### Issue: Cannot Login or Register
**Solution:**
1. Check browser console for errors
2. Verify MongoDB is running
3. Check server logs for errors
4. Clear browser localStorage: `localStorage.clear()`

### Issue: Courses Not Displaying
**Solution:**
1. Run the seed script: `npm run seed`
2. Check MongoDB has data: `mongosh` then `use kloudsavvy_lms` then `db.courses.find()`

### Issue: JWT Token Errors
**Solution:**
1. Ensure JWT_SECRET is set in `.env` file
2. Clear browser localStorage and login again
3. Check token expiry (default is 7 days)

## Development Notes

### Project Structure
```
Kloudsavvy_LMS/
├── server/              # Backend code
│   ├── config/         # Database configuration
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   └── middleware/     # Custom middleware
├── public/             # Frontend code
│   ├── css/           # Stylesheets
│   ├── js/            # JavaScript files
│   └── pages/         # HTML pages
├── server.js          # Main server file
├── seed.js            # Database seeding script
└── package.json       # Dependencies
```

### Key Technologies
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Validation**: express-validator

### Environment Variables
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Environment (development/production)

## Next Steps

After testing the basic functionality:

1. **Create Your Own Account**: Register with your own email
2. **Browse Courses**: Explore different technology courses
3. **Enroll and Learn**: Start with a beginner-level course
4. **Track Progress**: Monitor your learning journey on the dashboard
5. **Complete Labs**: Practice hands-on with lab exercises
6. **Take Quizzes**: Test your knowledge

## Support

For issues or questions:
- Check the troubleshooting section above
- Review server logs for errors
- Check browser console for frontend errors
- Contact: support@kloudsavvy.com

---

**Happy Learning with Kloudsavvy LMS! 🚀**
