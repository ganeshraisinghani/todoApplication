const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/todo-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
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
    const res = await request(app).get('/api/todos');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
