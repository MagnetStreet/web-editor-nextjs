import { styled } from '@mui/material';
import * as React from 'react';

import SwatchColor from '@/types/SwatchColor';
import sassVars from '@/styles/_colorVariables.module.scss';
import toRem from '@/utils/shared/toRem';

interface ColorCircleProps {
  color: SwatchColor;
  onSelected?: (color: SwatchColor) => void;
}

const StyledButton = styled('button')(
  ({ theme }) => `
  border-radius: ${toRem('100px')};
  box-shadow: none;
  background: white;
  color: ${theme.palette.primary.main};
  width: ${toRem('40px')};
  height: ${toRem('40px')};
  cursor: pointer;
  border: 1px solid ${sassVars.teLightGrey};
  &:hover {
    width: ${toRem('39px')};
    height: ${toRem('39px')};
    border: 2px solid ${sassVars.teLightGrey};
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
      id={`color-circle ${color.swatchName}`}
      onClick={() => onSelected(color)}
      sx={{
        backgroundColor: `rgb(${redValue}, ${greenValue}, ${blueValue})`,
      }}
    ></StyledButton>
  );
};

export default ColorCircle;
