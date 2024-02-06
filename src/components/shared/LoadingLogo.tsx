import { Box } from '@mui/material';
import * as React from 'react';

const LoadingLogo = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <img
      src='/images/TE_Logo_Animation-just-the-mark-loading_100.gif'
      alt='Loading...'
      style={{ width: '100px', height: '100px' }}
    />
  </Box>
);

export default LoadingLogo;
