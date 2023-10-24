/* eslint-disable react/prop-types */
import { Alert, AlertTitle } from '@mui/material';
import React, { useEffect, useState } from 'react';

function ErrorBoundary(props) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleErrors = (error, errorInfo) => {
      console.error('Error:', error, errorInfo);
      setHasError(true);
    };

    window.addEventListener('error', handleErrors);

    return () => {
      window.removeEventListener('error', handleErrors);
    };
  }, []);

  if (hasError) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        There was an unexpected error — <strong>try reloading!</strong>
      </Alert>
    );
  }

  return props.children;
}

export default ErrorBoundary;
