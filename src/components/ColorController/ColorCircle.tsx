import { styled } from '@mui/material';
import * as React from 'react';

import SwatchColor from '@/types/SwatchColor';

interface ColorCircleProps {
  color: SwatchColor;
}

const StyledButton = styled('button')(
  ({ theme }) => `
  border-radius: 999px;
  box-shadow: none;
  border: none;
  background: white;
  color: #5471A8;
  width: 40px;
  height: 40px;
`
);

const ColorCircle: React.FC<ColorCircleProps> = ({ color }) => {
  const { redValue, blueValue, greenValue } = color;
  return (
    <StyledButton
      sx={{
        backgroundColor: `rgb(${redValue}, ${greenValue}, ${blueValue})`,
      }}
    ></StyledButton>
  );
};

export default ColorCircle;
