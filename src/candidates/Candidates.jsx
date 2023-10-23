// App.js
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { columns } from '../testData';
import ColumnChips from './ColumnChips';
import TableCandidates from './TableCandidates';

const Candidates = () => {
  const [visibleColumns, setVisibleColumns] = useState({ ...columns });

  const handleColumnToggle = (column, updatedColumns) => setVisibleColumns(updatedColumns);

  return (
    <Box
      sx={{
        pl: 2, pt: 2, pr: 2, pb: 2,
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ color: '#2196F3', fontWeight: 'bold' }}
      >
        Candidates
      </Typography>
      <ColumnChips columns={visibleColumns} onColumnToggle={handleColumnToggle} />
      <TableCandidates visibleColumns={visibleColumns} />
    </Box>
  );
};

export default Candidates;
