import { render, screen } from '@testing-library/react';
import TodoList from './TodoList';
import axios from 'axios';

jest.mock('axios');

test('renders todo list', async () => {
  axios.get.mockResolvedValue({ data: [{ _id: '1', title: 'Mock Todo', completed: false }] });

  render(<TodoList />);
  const item = await screen.findByText(/Mock Todo/i);
  expect(item).toBeInTheDocument();
});
