const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Course = require('../models/Course');
const User = require('../models/User');
const { auth, authorizeRoles } = require('../middleware/auth');

// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// Get all published courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .populate('instructor', 'name email')
      .sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single course
router.get('/:id', async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid course ID' });
    }

    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name email');
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Enroll in a course
router.post('/:id/enroll', auth, async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid course ID' });
    }

    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const user = await User.findById(req.user._id);
    
    if (user.enrolledCourses.includes(course._id)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    user.enrolledCourses.push(course._id);
    user.progress.push({
      course: course._id,
      completedSessions: [],
      quizScores: [],
      labsCompleted: []
    });

    await user.save();

    res.json({ message: 'Successfully enrolled in course' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get enrolled courses for current user
router.get('/user/enrolled', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: 'enrolledCourses',
        populate: { path: 'instructor', select: 'name' }
      });
    
    res.json(user.enrolledCourses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark session as completed
router.post('/:courseId/sessions/:sessionId/complete', auth, async (req, res) => {
  try {
    if (!isValidObjectId(req.params.courseId)) {
      return res.status(400).json({ message: 'Invalid course ID' });
    }

    const user = await User.findById(req.user._id);
    const progress = user.progress.find(p => p.course.toString() === req.params.courseId);
    
    if (!progress) {
      return res.status(404).json({ message: 'Not enrolled in this course' });
    }

    if (!progress.completedSessions.includes(req.params.sessionId)) {
      progress.completedSessions.push(req.params.sessionId);
      await user.save();
    }

    res.json({ message: 'Session marked as completed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create course (instructor/admin only)
router.post('/', auth, authorizeRoles('instructor', 'admin'), async (req, res) => {
  try {
    // Whitelist allowed fields to prevent mass assignment
    const allowedFields = ['title', 'description', 'category', 'duration', 'level', 'thumbnail', 'sessions', 'isPublished'];
    const courseData = {};
    
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        courseData[field] = req.body[field];
      }
    });

    const course = new Course({
      ...courseData,
      instructor: req.user._id
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
