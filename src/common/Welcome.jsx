import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import Lottie from 'react-lottie-player';
import { useNavigate } from 'react-router-dom';
import coming from '../assets/coming.json';

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/candidates');
    }, 4000);
    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <>
      <Box
        data-testid="welcome"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '30vh',
          mt: 10,
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ color: '#2196F3', fontWeight: 'bold' }}
        >
          Talent Hub Connect
        </Typography>
      </Box>
      <Box
        data-testid="welcome"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '30vh',
        }}
      >
        <Lottie
          loop
          play
          speed={2}
          animationData={coming}
          style={{ width: 800, height: 600 }}
        />
      </Box>
    </>
  );
};

export default Welcome;
