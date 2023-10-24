import { render, screen } from '@testing-library/react';
import React from 'react';
import NotFound from '../NotFound';

test('render NotFound component', () => {
  render(<NotFound />);
  const notFoundElement = screen.getByText('Not found');
  expect(notFoundElement).toBeInTheDocument();
});
