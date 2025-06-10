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
  await Todo.deleteMany(); // Clear DB after each test
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Todo Controller Test', () => {
  it('should create a new todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ title: 'New Todo' });  // Use 'title' here to match schema

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('New Todo');
  });

  it('should get all todos', async () => {
    // Create a todo first so GET returns something
    await Todo.create({ title: 'Existing Todo' });

    const res = await request(app).get('/api/todos');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
