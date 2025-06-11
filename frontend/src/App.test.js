// App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Todo App title and list', () => {
  render(<App />);
  expect(screen.getByText(/Todo App/i)).toBeInTheDocument();
  expect(screen.getByText(/Todo List/i)).toBeInTheDocument();
});
