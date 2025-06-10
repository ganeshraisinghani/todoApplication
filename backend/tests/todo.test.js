const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Todo = require('../models/Todo');

// No manual mongoose.connect here — app.js handles it

afterEach(async () => {
  await Todo.deleteMany(); // Clear test data after each test
});

afterAll(async () => {
  await mongoose.connection.dropDatabase(); // Clean up test DB
  await mongoose.connection.close(); // Close shared connection
});

test('GET /api/todos should return empty array', async () => {
  const res = await request(app).get('/api/todos');
  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual([]);
});

test('POST /api/todos creates a todo', async () => {
  const res = await request(app).post('/api/todos').send({ title: 'Test' });
  expect(res.statusCode).toBe(201);
  expect(res.body.title).toBe('Test');
});
