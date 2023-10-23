import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import CandidateForm from '../CandidateForm';

describe('CandidateForm', () => {
  it('initial renders', () => {
    const mockCandidate = {
      id: '1',
      name: 'John Doe',
      reason: 'Rejected',
    };

    const mockCandidates = [mockCandidate];

    const mockSetCandidates = jest.fn();

    render(
      <CandidateForm
        open={true}
        onClose={() => {}}
        candidate={mockCandidate}
        candidates={mockCandidates}
        setCandidates={mockSetCandidates}
      />,
    );

    expect(screen.getByText('Name y Surname: John Doe')).toBeInTheDocument();
    expect(screen.getByText('Rejected')).toBeInTheDocument();
  });

  it('handle form submit', () => {
    const mockCandidate = {
      id: '1',
      name: 'John Doe',
      reason: 'Rejected',
    };

    const mockCandidates = [mockCandidate];

    const mockSetCandidates = jest.fn();

    render(
      <CandidateForm
        open={true}
        onClose={() => {}}
        candidate={mockCandidate}
        candidates={mockCandidates}
        setCandidates={mockSetCandidates}
      />,
    );

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(mockSetCandidates).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          id: '1',
          reason: 'Rejected',
        }),
      ]),
    );
  });
});
