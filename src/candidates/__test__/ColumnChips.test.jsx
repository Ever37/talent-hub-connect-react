import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import ColumnChips from '../ColumnChips';

const mockOnColumnToggle = jest.fn();

const columns = {
  id: true,
  name: true,
  document: false,
  // ...
};

const renderColumnChips = (customColumns) => {
  return render(
    <ColumnChips
      columns={customColumns || columns}
      onColumnToggle={mockOnColumnToggle}
    />,
  );
};

describe('ColumnChips', () => {
  it('check render chips', () => {
    const { getByText } = renderColumnChips();
    // label columns
    expect(getByText('Columns')).toBeInTheDocument();
    // some chips
    expect(getByText('ID')).toBeInTheDocument();
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Document')).toBeInTheDocument();
  });

  it('Handle click on chip', () => {
    const { getByText } = renderColumnChips();
    fireEvent.click(getByText('Name'));
    expect(mockOnColumnToggle).toHaveBeenCalledWith('name', expect.objectContaining({ name: false }));
  });
});
