import { Box } from '@mui/material';
import * as React from 'react';

import { TextBox } from '@/types/TextBox';

interface TextColorProps {
  activeTextBox: TextBox;
}

const TextColor: React.FC<TextColorProps> = ({ activeTextBox }) => {
  return <Box>Text Color Controller</Box>;
};

export default TextColor;
