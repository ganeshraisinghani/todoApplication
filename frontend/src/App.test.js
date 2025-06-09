import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Todo App header', () => {
  render(<App />);
  const headerElement = screen.getByText(/todo app/i);
  expect(headerElement).toBeInTheDocument();
});
