import { Box, Button, Stack } from '@mui/material';
import * as React from 'react';

import TextColor from '@/components/TextController/TextColor';
import TextFormat from '@/components/TextController/TextFormat';
import TextSize from '@/components/TextController/TextSize';

import { TextBox } from '@/types/TextBox';

interface TextControllerProps {
  activeTextBox: TextBox;
  handleSave: () => void;
  handleBack: () => void;
  handleUpdate: (updated: TextBox) => void;
}

const TextController: React.FC<TextControllerProps> = ({
  activeTextBox,
  handleSave,
  handleBack,
  handleUpdate,
}) => {
  console.log('activeTextBox', activeTextBox);

  return (
    <Box>
      <Stack>
        <TextSize activeTextBox={activeTextBox} handleUpdate={handleUpdate} />
        <TextColor activeTextBox={activeTextBox} />
        <TextFormat activeTextBox={activeTextBox} />
      </Stack>
      <Button onClick={handleBack}> Cancel</Button>
      <Button onClick={handleSave}> Apply Changes</Button>
    </Box>
  );
};

export default TextController;
