import { Box } from '@mui/material';
import * as React from 'react';

interface SampleProps {
  children: React.ReactNode;
}

const Sample: React.FC<SampleProps> = ({ children }) => {
  return <Box>{children}</Box>;
};

export default Sample;
