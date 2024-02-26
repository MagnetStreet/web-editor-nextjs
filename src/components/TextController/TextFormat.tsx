import { Box } from '@mui/material';
import * as React from 'react';

import { TextBox } from '@/types/TextBox';

interface TextFormatProps {
  activeTextBox: TextBox;
}

const TextFormat: React.FC<TextFormatProps> = ({ activeTextBox }) => {
  return <Box>Text Format Controller</Box>;
};

export default TextFormat;
