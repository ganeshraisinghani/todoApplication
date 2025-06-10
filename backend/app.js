const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todo'); // your route file
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api/todos', todoRoutes);

mongoose.connect(process.env.DB_URI);

const mongoUri = process.env.DB_URI || 'mongodb://localhost:27017/todo-test-db';

mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = app;
