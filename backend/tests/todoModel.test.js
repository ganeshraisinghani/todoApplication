const mongoose = require('mongoose');
const Todo = require('../models/Todo');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testdb');
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
    const todo = new Todo({ title: 'Test Todo' });  // use title instead of text
    expect(todo.completed).toBe(false);
  });

  it('should save a todo to the database', async () => {
    const todo = new Todo({ title: 'Save me' });   // use title instead of text
    const savedTodo = await todo.save();
    expect(savedTodo.title).toBe('Save me');
    expect(savedTodo.completed).toBe(false);
  });
});

