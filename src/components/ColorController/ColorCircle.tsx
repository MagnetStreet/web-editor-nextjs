import { styled } from '@mui/material';
import * as React from 'react';

import SwatchColor from '@/types/SwatchColor';

interface ColorCircleProps {
  color: SwatchColor;
  onSelected?: (color: SwatchColor) => void;
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
  cursor: pointer;
  &:hover {
    border: '1px solid #000',
    padding: '2px'
  }
`
);

const ColorCircle: React.FC<ColorCircleProps> = ({
  color,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onSelected = (color: SwatchColor) => {},
}) => {
  const { redValue, blueValue, greenValue } = color;
  return (
    <StyledButton
      id={`${color.swatchName}`}
      onClick={() => onSelected(color)}
      sx={{
        backgroundColor: `rgb(${redValue}, ${greenValue}, ${blueValue})`,
      }}
    ></StyledButton>
  );
};

export default ColorCircle;
