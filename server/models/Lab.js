const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  estimatedTime: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  resources: {
    type: [{
      title: { type: String },
      url: { type: String },
      type: { type: String }
    }],
    default: []
  },
  tasks: {
    type: [{
      description: { type: String },
      order: { type: Number }
    }],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Lab', labSchema);
