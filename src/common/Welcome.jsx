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
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
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
      <Lottie
        loop
        play
        speed={2}
        animationData={coming}
        style={{ width: 800, height: 600 }}
      />
    </Box>
  );
};

export default Welcome;
