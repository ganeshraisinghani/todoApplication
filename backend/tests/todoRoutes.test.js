const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Todo = require('../models/Todo');

afterEach(async () => {
  await Todo.deleteMany(); // Clear test data after each test
});

afterAll(async () => {
  await mongoose.connection.dropDatabase(); // Clean up test DB
  await mongoose.connection.close();        // Close connection
});

describe('Todo Routes Test', () => {
  it('should create a new todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ text: 'New Todo' });

    expect(res.status).toBe(201);
    expect(res.body.text).toBe('New Todo');
  });

  it('should get all todos', async () => {
    // Ensure there's at least one todo to fetch
    await Todo.create({ text: 'Example Todo' });

    const res = await request(app).get('/api/todos');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
