import { Box, Button } from '@mui/material';
import * as React from 'react';

import { TextBox } from '@/types/TextBox';

interface TextControllerProps {
  activeTextBox: TextBox;
}

const TextController: React.FC<TextControllerProps> = ({ activeTextBox }) => {
  console.log('activeTextBox', activeTextBox);
  return (
    <Box>
      In here we render the text options
      <Button> Cancel</Button>
      <Button> Apply Changes</Button>
    </Box>
  );
};

export default TextController;
