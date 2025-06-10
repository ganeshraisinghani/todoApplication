const Todo = require('../models/Todo');

describe('Todo Model Test', () => {
  it('should create a todo with default completed value as false', async () => {
    const todo = new Todo({ text: 'Test Todo' });
    expect(todo.completed).toBe(false);
  });
});
