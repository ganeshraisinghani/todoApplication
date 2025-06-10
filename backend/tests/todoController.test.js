const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('Todo Controller Test', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create a new todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ text: 'New Todo' });

    expect(res.status).toBe(201);
    expect(res.body.text).toBe('New Todo');
  });
});
