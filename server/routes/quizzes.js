const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Quiz = require('../models/Quiz');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// Get all quizzes for a course
router.get('/course/:courseId', auth, async (req, res) => {
  try {
    if (!isValidObjectId(req.params.courseId)) {
      return res.status(400).json({ message: 'Invalid course ID' });
    }

    const quizzes = await Quiz.find({ course: req.params.courseId });
    
    // Remove correct answers from response
    const quizzesWithoutAnswers = quizzes.map(quiz => ({
      _id: quiz._id,
      course: quiz.course,
      title: quiz.title,
      description: quiz.description,
      questions: quiz.questions.map(q => ({
        question: q.question,
        options: q.options,
        _id: q._id
      })),
      passingScore: quiz.passingScore,
      timeLimit: quiz.timeLimit
    }));

    res.json(quizzesWithoutAnswers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit quiz
router.post('/:id/submit', auth, async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid quiz ID' });
    }

    const quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const { answers } = req.body; // Array of user's answers
    let correctCount = 0;

    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctCount++;
      }
    });

    const score = (correctCount / quiz.questions.length) * 100;
    const passed = score >= quiz.passingScore;

    // Save score to user progress
    const user = await User.findById(req.user._id);
    const progress = user.progress.find(p => p.course.toString() === quiz.course.toString());
    
    if (progress) {
      progress.quizScores.push({
        quiz: quiz._id,
        score,
        completedAt: new Date()
      });
      await user.save();
    }

    res.json({
      score,
      passed,
      correctAnswers: correctCount,
      totalQuestions: quiz.questions.length,
      passingScore: quiz.passingScore
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get quiz results for a user
router.get('/:id/results', auth, async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid quiz ID' });
    }

    const user = await User.findById(req.user._id);
    const quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const progress = user.progress.find(p => p.course.toString() === quiz.course.toString());
    
    if (!progress) {
      return res.json({ attempts: [] });
    }

    const attempts = progress.quizScores.filter(q => q.quiz.toString() === req.params.id);
    res.json({ attempts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
