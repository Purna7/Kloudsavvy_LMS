require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./server/config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes (before static files)
app.use('/api/auth', require('./server/routes/auth'));
app.use('/api/courses', require('./server/routes/courses'));
app.use('/api/quizzes', require('./server/routes/quizzes'));
app.use('/api/labs', require('./server/routes/labs'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve frontend for all other routes (SPA fallback)
app.use((req, res, next) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } else {
    next();
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
