import { Box, Button } from '@mui/material';
import * as React from 'react';

import { TextBox } from '@/types/TextBox';

interface TextControllerProps {
  activeTextBox: TextBox;
  handleSave: () => void;
  handleBack: () => void;
}

const TextController: React.FC<TextControllerProps> = ({
  activeTextBox,
  handleSave,
  handleBack,
}) => {
  console.log('activeTextBox', activeTextBox);

  return (
    <Box>
      In here we render the text options
      <Button onClick={handleBack}> Cancel</Button>
      <Button onClick={handleSave}> Apply Changes</Button>
    </Box>
  );
};

export default TextController;
