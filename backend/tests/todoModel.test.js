const mongoose = require('mongoose');
const Todo = require('../models/Todo');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testdb', {
    // Options are no longer necessary with newer drivers but you can keep them if needed
  });
});

afterEach(async () => {
  await Todo.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Todo Model Test', () => {
  it('should create a todo with default completed value as false', () => {
    const todo = new Todo({ text: 'Test Todo' });
    expect(todo.completed).toBe(false);
  });

  it('should save a todo to the database', async () => {
    const todo = new Todo({ text: 'Save me' });
    const savedTodo = await todo.save();
    expect(savedTodo.text).toBe('Save me');
    expect(savedTodo.completed).toBe(false);
  });
});
