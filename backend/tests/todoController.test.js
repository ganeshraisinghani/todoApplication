const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Todo = require('../models/Todo');

afterEach(async () => {
  await Todo.deleteMany(); // Clear DB between tests
});

afterAll(async () => {
  await mongoose.connection.dropDatabase(); // Clean up test DB
  await mongoose.connection.close();        // Close shared connection
});

describe('Todo Controller Test', () => {
  it('should create a new todo', async () => {
    const res = await
