/* eslint-disable react/prop-types */
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {
  Alert, Button, Chip, Snackbar,
} from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { TooltipLabel } from '../common/TooltipLabel';
import { convertColumnsToHeaders, createData } from '../utils/tools';
import CandidateForm from './CandidateForm';

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const TableCandidatesHead = (props) => {
  const [headers, setHeaders] = useState([]);
  const {
    visibleColumns,
    onSelectAllClick,
    order, orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const createSortHandler = (property) => (event) => onRequestSort(event, property);

  const fetchCandidateColumns = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/candidates/columns`,
      );
      setHeaders(convertColumnsToHeaders(response.data));
    } catch (error) {
      console.error('Error fetching columns candidates:', error);
    }
  };

  useEffect(() => {
    fetchCandidateColumns();
  }, []);

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all',
            }}
          />
        </TableCell>
        {headers.map((headCell) => (
          visibleColumns[headCell.id] ? (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ) : null
        ))}
        <TableCell>
          Edit
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

TableCandidatesHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const TableCandidatesToolbar = ({
  candidates,
  setSelected,
  setCandidates,
  selectedCandidates,
  setOpenSnackbar,
}) => {
  const numSelected = selectedCandidates?.length;

  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedCandidates.map(
          candidateId => axios.delete(`
          ${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/candidates/${candidateId}`),
        ),
      );
      const candidatesUpdated = candidates.filter(candidate => !selectedCandidates.includes(candidate.id));
      setCandidates(candidatesUpdated);
      setSelected([]);
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error deleting candidates:', error);
    }
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 && (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      )}
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

TableCandidatesToolbar.propTypes = {
  candidates: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
  setCandidates: PropTypes.func.isRequired,
  selectedCandidates: PropTypes.array.isRequired,
  setOpenSnackbar: PropTypes.func.isRequired,
};

const TableCandidates = ({ visibleColumns }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [rows, setRows] = useState([]);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get(`
        ${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/candidates`);
      const candidates = response.data.map(candidate => createData(candidate)) ?? [];
      setRows(candidates);
    } catch (error) {
      console.error('Error fetching data from NestJS:', error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () => stableSort(rows, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    ),
    [order, orderBy, page, rowsPerPage, rows],
  );

  const handleOpenModal = (candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const renderColumnContent = (column, row) => {
    const columnRenderers = {
      graduated: <TooltipLabel label={row[column]} proportion={30} />,
      career: <TooltipLabel label={row[column]} proportion={30} />,
      cv_bumeran: <TooltipLabel label={row[column]} proportion={70} />,
      cv_zonajobs: <TooltipLabel label={row[column]} proportion={70} />,
      reason: row[column] ? (
        <>
          <Chip
            label="Rejected"
            size="small"
            sx={{ mr: 1, mb: 0.5 }}
            icon={<CancelIcon color="error" />}
            color="error"
          />
          {row[column]}
        </>
      ) : (
        <>
          <Chip
            label="Approved"
            size="small"
            sx={{ mr: 1, mb: 0.5 }}
            icon={<CheckCircleIcon color="success" />}
            color="success"
          /><br />
          {row[column]}
        </>
      ),
    };
    return columnRenderers[column] || row[column];
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <Box>
      <Paper sx={{ mt: 1 }}>
        <TableCandidatesToolbar
          candidates={rows}
          setSelected={setSelected}
          setCandidates={setRows}
          selectedCandidates={selected}
          setOpenSnackbar={setOpenSnackbar}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
            <TableCandidatesHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              visibleColumns={visibleColumns}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    {Object.keys(visibleColumns).map((column) => (visibleColumns[column] ? (
                      <TableCell key={column}>
                        {renderColumnContent(column, row)}
                      </TableCell>
                    ) : null))}
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleOpenModal(row);
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {
          isModalOpen && (
            <CandidateForm
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              candidates={rows}
              setCandidates={setRows}
              candidate={selectedCandidate}
              setOpenSnackbar={setOpenSnackbar}
            />
          )
        }
      </Paper>
      <Snackbar open={openSnackbar} autoHideDuration={1500} onClose={handleCloseSnackbar}>
        <Alert severity="success">
          Successful operation
        </Alert>
      </Snackbar>
    </Box>
  );
};

TableCandidates.propTypes = {
  visibleColumns: PropTypes.object.isRequired,
};

export default TableCandidates;
