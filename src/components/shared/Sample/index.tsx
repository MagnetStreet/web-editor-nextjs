import { Box } from '@mui/material';
import * as React from 'react';

interface SmpleProps {
  children: React.ReactNode;
}

const PositionedMenu: React.FC<SmpleProps> = ({ children }) => {
  return <Box>{children}</Box>;
};

export default SmpleProps;
