import { Box } from '@mui/material';
import * as React from 'react';

interface SampleProps {
  children: React.ReactNode;
}

const Sample: React.FC<SampleProps> = ({ children }) => {
  //TODO ALWAYS ADD Id to the new componet
  return <Box id='name-of-component'>{children}</Box>;
};

export default Sample;
