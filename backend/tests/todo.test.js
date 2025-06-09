const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Todo = require('../models/Todo');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testdb');
});

afterEach(async () => {
  await Todo.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
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
