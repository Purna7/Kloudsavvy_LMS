const express = require('express');
const router = express.Router();
const Lab = require('../models/Lab');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

// Get all labs for a course
router.get('/course/:courseId', auth, async (req, res) => {
  try {
    const labs = await Lab.find({ course: req.params.courseId });
    res.json(labs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single lab
router.get('/:id', auth, async (req, res) => {
  try {
    const lab = await Lab.findById(req.params.id).populate('course', 'title');
    
    if (!lab) {
      return res.status(404).json({ message: 'Lab not found' });
    }

    res.json(lab);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark lab as completed
router.post('/:id/complete', auth, async (req, res) => {
  try {
    const lab = await Lab.findById(req.params.id);
    
    if (!lab) {
      return res.status(404).json({ message: 'Lab not found' });
    }

    const user = await User.findById(req.user._id);
    const progress = user.progress.find(p => p.course.toString() === lab.course.toString());
    
    if (!progress) {
      return res.status(404).json({ message: 'Not enrolled in this course' });
    }

    if (!progress.labsCompleted.includes(lab._id)) {
      progress.labsCompleted.push(lab._id);
      await user.save();
    }

    res.json({ message: 'Lab marked as completed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
