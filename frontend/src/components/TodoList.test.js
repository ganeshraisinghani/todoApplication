// TodoList.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoList from './TodoList';
import axios from 'axios';

// Mock axios
jest.mock('axios');

const mockTodos = [
  { _id: '1', title: 'Test Todo 1', completed: false },
  { _id: '2', title: 'Test Todo 2', completed: true },
];

beforeEach(() => {
  axios.get.mockResolvedValue({ data: mockTodos });
});

test('renders todos from API', async () => {
  render(<TodoList />);
  expect(await screen.findByText('Test Todo 1')).toBeInTheDocument();
  expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
});

test('adds a new todo item', async () => {
  const newTodo = { _id: '3', title: 'New Todo', completed: false };
  axios.post.mockResolvedValue({ data: newTodo });

  render(<TodoList />);

  // Wait for initial todos
  await screen.findByText('Test Todo 1');

  const input = screen.getByRole('textbox');
  const addButton = screen.getByText('Add');

  fireEvent.change(input, { target: { value: 'New Todo' } });
  fireEvent.click(addButton);

  expect(await screen.findByText('New Todo')).toBeInTheDocument();
});

test('toggles completion of a todo', async () => {
  const updatedTodo = { _id: '1', title: 'Test Todo 1', completed: true };
  axios.put.mockResolvedValue({ data: updatedTodo });

  render(<TodoList />);
  const todoItem = await screen.findByText('Test Todo 1');

  fireEvent.click(todoItem);

  await waitFor(() =>
    expect(todoItem).toHaveStyle('text-decoration: line-through')
  );
});

test('deletes a todo item', async () => {
  axios.delete.mockResolvedValue({});

  render(<TodoList />);
  await screen.findByText('Test Todo 1');
  const deleteButtons = screen.getAllByText('Delete');

  fireEvent.click(deleteButtons[0]);

  await waitFor(() =>
    expect(screen.queryByText('Test Todo 1')).not.toBeInTheDocument()
  );
});
