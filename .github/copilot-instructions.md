# Kloudsavvy LMS - AI Coding Instructions

## Project Overview
Kloudsavvy LMS is a Learning Management System. This is a new project - update this document as architecture decisions are made.

## Architecture
- **Frontend Framework**: [To be decided]
- **Backend Framework**: [To be decided]
- **Database**: MongoDB Atlas (cloud-hosted)
- **Authentication**: [To be decided]

## Database Configuration
- **Provider**: MongoDB Atlas (M0 Free Tier)
- **Connection**: Use environment variable `MONGODB_URI` for connection string
- **Collections**: Follow singular naming (e.g., `user`, `course`, `enrollment`)
- **Environment**: Store credentials in `.env` file (never commit to git)

## Directory Structure (To Be Established)
```
/src
  /frontend    # Client-side application
  /backend     # Server-side API
  /shared      # Shared types/utilities
/tests         # Test files
/docs          # Documentation
```

## Development Workflow
<!-- Update with actual commands once established -->
```bash
# Install dependencies
# npm install

# Start development server
# npm run dev

# Run tests
# npm test
```

## Conventions
- Follow consistent naming conventions across the codebase
- Document API endpoints with clear request/response examples
- Keep LMS domain concepts (courses, lessons, users, enrollments) well-separated

## Key LMS Domain Concepts
- **Users**: Students, instructors, administrators
- **Courses**: Learning content containers
- **Lessons/Modules**: Individual learning units
- **Enrollments**: User-course relationships
- **Progress Tracking**: Completion status, quiz scores

---
*Update this document as the project evolves. Remove placeholder sections once real implementations exist.*
