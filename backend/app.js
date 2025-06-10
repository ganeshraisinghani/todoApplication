const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todo'); // your route file
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api/todos', todoRoutes);

mongoose.connect(process.env.DB_URI);

module.exports = app;
