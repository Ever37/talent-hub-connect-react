import { render, screen } from '@testing-library/react';
import React from 'react';
import { TooltipLabel } from '../TooltipLabel';

// Mock useWindowSize hook
jest.mock('../hooks/useWindowSize', () => ({
  useWindowSize: jest.fn(() => ({ width: 800 })),
}));

describe('TooltipLabel', () => {
  it('renders with a tooltip and content', () => {
    render(<TooltipLabel label="Challenge EmiLabs!" />);
    const tooltip = screen.getByRole('tooltip');
    const content = screen.getByText('Challenge EmiLabs!');
    expect(tooltip).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  it('truncates long labels', () => {
    render(<TooltipLabel label="This is a very long label that should be truncated" />);
    const content = screen.getByText('This is a very long label...');
    expect(content).toBeInTheDocument();
  });

  it('accepts a custom proportion for truncation', () => {
    render(<TooltipLabel label="Custom proportion label" proportion={30} />);
    const content = screen.getByText('Custom proportion label...');
    expect(content).toBeInTheDocument();
  });
});
