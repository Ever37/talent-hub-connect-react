import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Checkbox, Grid, ListItemText, OutlinedInput,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react';

const CandidateForm = ({
  open,
  onClose,
  candidate,
  candidates,
  setCandidates,
  setOpenSnackbar,
}) => {
  const [reasons, setReasons] = useState([]);
  const [availableReasons, setAvailableReasons] = useState([]);
  const hasReasons = candidate?.reason !== null && candidate?.reason !== '';

  const fetchRejectReasons = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/candidates/reject-reasons`);
      setAvailableReasons(response.data);
    } catch (error) {
      console.error('Error getting reject reasons:', error);
    }
  };

  useEffect(() => {
    fetchRejectReasons();
  }, []);

  useEffect(() => {
    const candidateReasons = candidate.reason
      .split(',')
      .map((reason) => reason.trim())
      .filter((reason) => reason !== '');
    setReasons(candidateReasons);
  }, [candidate]);

  const handleClose = () => onClose();

  const handleReasonsChange = (event) => setReasons(event.target.value);

  const handleSubmit = () => {
    try {
      const candidateIndex = candidates.findIndex((cand) => cand.id === candidate.id);
      if (candidateIndex !== -1) {
        const updatedCandidates = [...candidates];
        updatedCandidates[candidateIndex] = {
          ...candidate,
          reason: reasons.length > 0 ? reasons.join(',') : '',
        };
        setCandidates(updatedCandidates);
        handleClose();
        setOpenSnackbar(true);
      } else {
        console.error('Candidate not found in the array.');
      }
    } catch (error) {
      console.error('Error changing reasons:', error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          borderRadius: 1,
          p: 4,
          minWidth: 300,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div>
              <p>
                Name y Surname: {candidate.name}
              </p>
            </div>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {hasReasons ? (
              <Chip
                label="Rejected"
                icon={<CancelIcon color="error" />}
                color="error"
              />
            ) : (
              <Chip
                label="Approved"
                icon={<CheckCircleIcon color="success" />}
                color="success"
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ width: 800 }}>
              <InputLabel id="reasons-label">Reasons</InputLabel>
              <Select
                labelId="reasons-label"
                id="reasons"
                multiple
                value={reasons}
                onChange={handleReasonsChange}
                input={<OutlinedInput label="Reasons" />}
                renderValue={(selected) => selected.join(', ')}
              >
                {availableReasons.map((reason) => (
                  <MenuItem key={reason} value={reason}>
                    <Checkbox checked={reasons.indexOf(reason) > -1} />
                    <ListItemText primary={reason} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ mt: 2 }}
            >
              Save
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ mt: 2 }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

CandidateForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  candidate: PropTypes.object.isRequired,
  candidates: PropTypes.array.isRequired,
  setCandidates: PropTypes.func.isRequired,
  setOpenSnackbar: PropTypes.func,
};

export default CandidateForm;
