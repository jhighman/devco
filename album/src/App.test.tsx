import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Pop Song Summer title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Pop Song Summer/i);
  expect(titleElement).toBeInTheDocument();
});
