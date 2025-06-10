const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Todo = require('../models/Todo');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/todo-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  await Todo.deleteMany(); // Clear DB between tests
});

afterAll(async () => {
  await mongoose.connection.dropDatabase(); // Clean up test DB
  await mongoose.connection.close();        // Close shared connection
});

describe('Todo Routes Test', () => {
  it('should create a new todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ title: 'New Todo' });  // Use 'title' here

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('New Todo');
  });

  it('should get all todos', async () => {
    // Create a todo to ensure something exists
    await Todo.create({ title: 'Another Todo' });

    const res = await request(app).get('/api/todos');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
