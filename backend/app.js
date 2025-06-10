const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todo');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

// MongoDB connection (no deprecated options)
if (process.env.DB_URI) {
  mongoose.connect(process.env.DB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
} else {
  console.error('DB_URI is not defined in .env');
}

module.exports = app;
