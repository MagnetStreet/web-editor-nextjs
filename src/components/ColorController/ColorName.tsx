import { Stack, Typography } from '@mui/material';
import * as React from 'react';

import useColorName from '@/hooks/useColorName';

import SwatchColor from '@/types/SwatchColor';

interface ColorNameProps {
  color: SwatchColor;
}

const ColorName: React.FC<ColorNameProps> = ({ color }) => {
  const colorName = useColorName(color);
  const { createdFromTextBox, swatchName } = color;
  return (
    <Stack id='color-name'>
      <Typography>{createdFromTextBox ? 'Text' : swatchName}</Typography>
      <Typography>{colorName}</Typography>
      {createdFromTextBox &&
        swatchName
          .split('\\')
          .sort((a, b) => b.length - a.length)
          .map((content, index) => (
            <Typography
              variant='subtitle2'
              key={`text-tag-${index}`}
              className={`ellipsis ${index > 2 ? 'hidden' : ''}`}
            >
              {index > 1 ? '...etc' : content}
            </Typography>
          ))}
    </Stack>
  );
};

export default ColorName;
