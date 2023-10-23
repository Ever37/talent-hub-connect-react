import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';
import React, { useState } from 'react';
import { columnNameToLabel } from '../utils/tools';

const ColumnChips = ({
  columns,
  onColumnToggle,
}) => {
  const [selectedColumns, setSelectedColumns] = useState({ ...columns });

  const handleColumnClick = (column) => {
    setSelectedColumns((prevState) => ({
      ...prevState,
      [column]: !prevState[column],
    }));
    onColumnToggle(column, { ...selectedColumns, [column]: !selectedColumns[column] });
  };

  const columnKeys = Object.keys(columns);
  const middleIndex = Math.ceil(columnKeys.length / 2);
  const firstColumnSet = columnKeys.slice(0, middleIndex);
  const secondColumnSet = columnKeys.slice(middleIndex);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 2,
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        Columns
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {firstColumnSet.map((column) => (
          <Box key={column} display="flex" flexDirection="row" alignItems="center">
            <Chip
              label={columnNameToLabel(column)}
              clickable
              sx={{
                m: 0.5,
                backgroundColor: selectedColumns[column] ? '#2196F3' : '#ccc',
                color: selectedColumns[column] ? '#fff' : '#000',
                cursor: 'pointer',
              }}
              color={selectedColumns[column] ? 'primary' : 'default'}
              onClick={() => handleColumnClick(column)}
            />
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {secondColumnSet.map((column) => (
          <Box key={column} display="flex" flexDirection="row" alignItems="center">
            <Chip
              label={columnNameToLabel(column)}
              clickable
              sx={{
                m: 0.5,
                backgroundColor: selectedColumns[column] ? '#2196F3' : '#ccc',
                color: selectedColumns[column] ? '#fff' : '#000',
                cursor: 'pointer',
              }}
              color={selectedColumns[column] ? 'primary' : 'default'}
              onClick={() => handleColumnClick(column)}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

ColumnChips.propTypes = {
  columns: PropTypes.object.isRequired,
  onColumnToggle: PropTypes.func.isRequired,
};

export default ColumnChips;
