const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from 'app.js'

describe('Todo Controller Test', () => {
  it('should create a new todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ text: 'New Todo' });
    expect(res.status).toBe(201);
    expect(res.body.text).toBe('New Todo');
  });
});
